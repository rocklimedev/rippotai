const Query = require("../models/queries");
const {
  emailer,
  queryConfirmationEmail,
  adminQueryNotificationEmail,
} = require("../middleware/sendEmail");

exports.createQuery = async (req, res, next) => {
  try {
    console.log("Received req.body:", req.body); // Log incoming request body
    const { name, email, subject, message } = req.body;

    // Basic input validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message:
          "All required fields (name, email, subject, message) must be provided",
      });
    }

    const query = new Query({ name, email, subject, message });
    await query.save();

    // Prepare email middleware for user confirmation
    req.email = {
      to: email,
      params: [name, subject, message],
    };
    await emailer(queryConfirmationEmail, "query")(req, res, async () => {
      // Send admin notification
      req.email = {
        to: "rippotaiarchitecture@gmail.com",
        params: [name, email, subject, message],
      };
      await emailer(adminQueryNotificationEmail, "query")(req, res, () => {
        res.status(201).json({ message: "Query submitted successfully" });
      });
    });
  } catch (error) {
    console.error("Error in createQuery:", error); // Log error for debugging
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    next(error);
  }
};
exports.getQueries = async (req, res, next) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    console.error("Error in getQueries:", error); // Log error for debugging
    next(error);
  }
};

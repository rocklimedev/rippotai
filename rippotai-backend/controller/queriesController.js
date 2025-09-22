// --- FILE: controllers/queryController.js
const Query = require("../models/queries");
const {
  emailer,
  queryConfirmationEmail,
  adminQueryNotificationEmail,
} = require("../middleware/sendEmail");

exports.createQuery = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const query = new Query({ name, email, subject, message });
    await query.save();

    req.email = { to: email, params: [name, subject, message] };
    await emailer(queryConfirmationEmail, "query")(req, res, async () => {
      req.email = {
        to: "rippotaiarchitecture@gmail.com",
        params: [name, email, subject, message],
      };
      await emailer(adminQueryNotificationEmail, "query")(req, res, () => {
        res.status(201).json(query);
      });
    });
  } catch (err) {
    console.error("Error in createQuery:", err);
    next(err);
  }
};

exports.getQueries = async (req, res, next) => {
  try {
    const queries = await Query.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error("Error in getQueries:", err);
    next(err);
  }
};

exports.getQuery = async (req, res, next) => {
  try {
    const query = await Query.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!query) return res.status(404).json({ message: "Query not found" });
    res.json(query);
  } catch (err) {
    next(err);
  }
};

exports.updateQuery = async (req, res, next) => {
  try {
    const updates = req.body;
    const query = await Query.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).populate("assignedTo", "name email");
    if (!query) return res.status(404).json({ message: "Query not found" });
    res.json(query);
  } catch (err) {
    next(err);
  }
};

exports.deleteQuery = async (req, res, next) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: "Query deleted" });
  } catch (err) {
    next(err);
  }
};

exports.addNote = async (req, res, next) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ message: "Query not found" });
    query.notes.push({ text: req.body.text, author: req.user._id });
    await query.save();
    await query.populate("notes.author", "name email");
    res.json(query);
  } catch (err) {
    next(err);
  }
};

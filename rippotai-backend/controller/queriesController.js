const Query = require("../models/queries");
const {
  emailer,
  queryConfirmationEmail,
  adminQueryNotificationEmail,
} = require("../middleware/sendEmail");

/**
 * CREATE QUERY
 */
exports.createQuery = async (req, res, next) => {
  try {
    const { name, email, subject, message, branch } = req.body;

    if (!name || !email || !subject || !message || !branch) {
      return res.status(400).json({
        message: "All required fields including branch must be provided",
      });
    }

    const query = new Query({
      name,
      email,
      subject,
      message,
      branch, // ✅ branch added
    });

    await query.save();

    return res.status(201).json({
      message: "Query created successfully",
      id: query._id,
    });
  } catch (err) {
    console.error("Error in createQuery:", err);
    return res.status(500).json({
      message: "Failed to create query",
    });
  }
};

/**
 * GET ALL QUERIES (FILTER BY BRANCH)
 */
exports.getQueries = async (req, res, next) => {
  try {
    const { branch } = req.query;

    const filter = {};
    if (branch) filter.branch = branch; // ✅ filter applied

    const queries = await Query.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(queries);
  } catch (err) {
    console.error("Error in getQueries:", err);
    next(err);
  }
};

/**
 * GET SINGLE QUERY (BRANCH SAFE)
 */
exports.getQuery = async (req, res, next) => {
  try {
    const { branch } = req.query;

    const filter = { _id: req.params.id };
    if (branch) filter.branch = branch;

    const query = await Query.findOne(filter).populate(
      "assignedTo",
      "name email",
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json(query);
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE QUERY (BRANCH SAFE)
 */
exports.updateQuery = async (req, res, next) => {
  try {
    const { branch } = req.body;

    if (!branch) {
      return res.status(400).json({ message: "Branch is required" });
    }

    const query = await Query.findOneAndUpdate(
      { _id: req.params.id, branch },
      req.body,
      { new: true },
    ).populate("assignedTo", "name email");

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json(query);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE QUERY (BRANCH SAFE)
 */
exports.deleteQuery = async (req, res, next) => {
  try {
    const { branch } = req.query;

    if (!branch) {
      return res.status(400).json({ message: "Branch is required" });
    }

    const deleted = await Query.findOneAndDelete({
      _id: req.params.id,
      branch,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json({ message: "Query deleted" });
  } catch (err) {
    next(err);
  }
};

/**
 * ADD NOTE TO QUERY (BRANCH SAFE)
 */
exports.addNote = async (req, res, next) => {
  try {
    const { branch, text } = req.body;

    if (!branch || !text) {
      return res.status(400).json({
        message: "Branch and note text are required",
      });
    }

    const query = await Query.findOne({
      _id: req.params.id,
      branch,
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    query.notes.push({
      text,
      author: req.user?._id, // safe optional chaining
    });

    await query.save();
    await query.populate("notes.author", "name email");

    res.json(query);
  } catch (err) {
    next(err);
  }
};

const { Query, User, Sequelize } = require("../models");
const { Op } = Sequelize;

const {
  emailer,
  queryConfirmationEmail,
  adminQueryNotificationEmail,
} = require("../middleware/sendEmail");

// ------------------- CREATE QUERY -------------------
exports.createQuery = async (req, res) => {
  try {
    const { name, email, subject, message, branch } = req.body;

    if (!name || !email || !subject || !message || !branch) {
      return res.status(400).json({
        message: "All required fields including branch must be provided",
      });
    }

    const query = await Query.create({
      name,
      email,
      subject,
      message,
      branch,
    });

    return res.status(201).json({
      message: "Query created successfully",
      id: query.id,
    });
  } catch (err) {
    console.error("Error in createQuery:", err);
    return res.status(500).json({
      message: "Failed to create query",
    });
  }
};

// ------------------- GET ALL QUERIES -------------------
exports.getQueries = async (req, res, next) => {
  try {
    const { branch } = req.query;

    const where = {};
    if (branch) where.branch = branch;

    const queries = await Query.findAll({
      where,
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(queries);
  } catch (err) {
    console.error("Error in getQueries:", err);
    next(err);
  }
};

// ------------------- GET SINGLE QUERY -------------------
exports.getQuery = async (req, res, next) => {
  try {
    const { branch } = req.query;

    const where = { id: req.params.id };
    if (branch) where.branch = branch;

    const query = await Query.findOne({
      where,
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json(query);
  } catch (err) {
    next(err);
  }
};

// ------------------- UPDATE QUERY -------------------
exports.updateQuery = async (req, res, next) => {
  try {
    const { branch } = req.body;

    if (!branch) {
      return res.status(400).json({ message: "Branch is required" });
    }

    const query = await Query.findOne({
      where: {
        id: req.params.id,
        branch,
      },
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    await query.update(req.body);

    res.json(query);
  } catch (err) {
    next(err);
  }
};

// ------------------- DELETE QUERY -------------------
exports.deleteQuery = async (req, res, next) => {
  try {
    const { branch } = req.query;

    if (!branch) {
      return res.status(400).json({ message: "Branch is required" });
    }

    const query = await Query.findOne({
      where: {
        id: req.params.id,
        branch,
      },
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    await query.destroy();

    res.json({ message: "Query deleted" });
  } catch (err) {
    next(err);
  }
};

// ------------------- ADD NOTE -------------------
exports.addNote = async (req, res, next) => {
  try {
    const { branch, text } = req.body;

    if (!branch || !text) {
      return res.status(400).json({
        message: "Branch and note text are required",
      });
    }

    const query = await Query.findOne({
      where: {
        id: req.params.id,
        branch,
      },
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    // ✅ JSON-based notes (same as your model)
    const notes = query.notes || [];

    notes.push({
      text,
      author: req.user?.id || null,
      createdAt: new Date(),
    });

    await query.update({ notes });

    res.json(query);
  } catch (err) {
    next(err);
  }
};

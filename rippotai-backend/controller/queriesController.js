const Query = require("../models/queries");

exports.createQuery = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const query = new Query({ name, email, subject, message });
    await query.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getQueries = async (req, res, next) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    next(error);
  }
};

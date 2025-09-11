const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "Server error", error: error.message });
};

module.exports = errorHandler;

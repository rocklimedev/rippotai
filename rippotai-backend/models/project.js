const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  image: { type: String, required: true }, // Main image URL
  images: [{ type: String }], // Additional images for gallery
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);

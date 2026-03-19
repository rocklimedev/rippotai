const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // optional
  designation: { type: String }, // optional
  interestedIn: {
    type: String,
    required: true,
    enum: [
      "Architecture",
      "Interior Design",
      "Furniture Design",
      "Project Management",
      "3D Visualization",
      "Other",
    ],
  },
  resume: { type: String, required: true }, // corresponds to portfolio
  coverLetter: { type: String }, // optional
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"],
    default: "Pending", // default status for new applications
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);

// --- FILE: models/Query.js
const { Schema, model } = require("mongoose");

const QuerySchema = new Schema(
  {
    branch: {
      type: String,
      enum: ["chhabra_marble", "rippotai"],
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },

    notes: [
      {
        text: String,
        author: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
module.exports = model("Query", QuerySchema);

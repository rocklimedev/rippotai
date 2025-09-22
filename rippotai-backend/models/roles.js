const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      enum: ["Admin", "HR", "Architect", "Employee"], // extend as needed
    },
    description: {
      type: String,
      default: "",
    },
    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_roles",
          "manage_projects",
          "manage_queries",
          "manage_jobs",
          "view_dashboard",
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);

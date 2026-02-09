const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../config/db"); // adjust path if needed
const Project = require("../models/project");

const runMigration = async () => {
  try {
    await connectDB();

    const projects = await Project.find({
      projectId: { $exists: false },
    });

    console.log(`Found ${projects.length} projects without projectId`);

    for (const project of projects) {
      project.projectId = uuidv4();
      await project.save();
      console.log(`✔ Updated ${project._id} → ${project.projectId}`);
    }

    console.log("✅ projectId backfill completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

runMigration();

const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import the connectDB function
const connectDB = require("../config/db"); // Update with the correct path to your connectDB file

// Import the Project model
const Project = require("../models/project"); // Update with the correct path to your Project model

// Backup file path
const backupFilePath = path.join(__dirname, "project-backup.json");

// Function to backup project data
async function backupProjects() {
  try {
    // Fetch all projects
    const projects = await Project.find({}).lean(); // .lean() for plain JavaScript objects
    if (projects.length === 0) {
      console.log("No projects found to backup");
      return;
    }

    // Save projects to a JSON file
    await fs.writeFile(backupFilePath, JSON.stringify(projects, null, 2));
    console.log(`Backup successful! Data saved to ${backupFilePath}`);
  } catch (error) {
    console.error("Backup error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

// Function to restore project data
async function restoreProjects() {
  try {
    // Read backup file
    const data = await fs.readFile(backupFilePath, "utf-8");
    const projects = JSON.parse(data);

    if (!Array.isArray(projects) || projects.length === 0) {
      console.log("No valid data found in backup file");
      return;
    }

    // Clear existing projects (optional, remove if you want to append)
    await Project.deleteMany({});

    // Insert projects
    await Project.insertMany(projects);
    console.log("Data restored successfully!");
  } catch (error) {
    console.error("Restore error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

// Main function to handle backup or restore
async function main() {
  await connectDB(); // Use the provided connectDB function

  // Run backup or restore based on command-line argument
  const command = process.argv[2];
  if (command === "backup") {
    await backupProjects();
  } else if (command === "restore") {
    await restoreProjects();
  } else {
    console.log('Please specify a command: "backup" or "restore"');
    console.log("Example: node seeder.js backup");
    await mongoose.disconnect();
  }
}

// Execute the main function
main().catch((err) => {
  console.error("Main error:", err);
  process.exit(1);
});

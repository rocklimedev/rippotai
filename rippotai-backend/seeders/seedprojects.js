const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Adjust the path to your connectDB.js file
const Project = require("../models/project"); // Adjust the path to your Project model
const projectsData = require("./project-backup.json"); // Adjust the path to your updated projects.json file

// Seeder function
const seedProjects = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to MongoDB via connectDB");

    // Validate projectsData
    if (!Array.isArray(projectsData) || projectsData.length === 0) {
      throw new Error("projects.json is empty or not an array");
    }

    // Upsert projects from JSON
    let successCount = 0;
    let skipCount = 0;

    for (const projectData of projectsData) {
      // Validate required fields
      if (!projectData.slug || !projectData.title) {
        console.warn(
          `Skipping project with missing slug or title: ${JSON.stringify(
            projectData
          )}`
        );
        skipCount++;
        continue;
      }

      const { slug, ...updateData } = projectData;

      try {
        const updatedProject = await Project.findOneAndUpdate(
          { slug }, // Find project by slug
          { $set: updateData }, // Update fields (title, category, description, etc.)
          {
            upsert: true, // Insert if not found
            new: true, // Return the updated document
            runValidators: true, // Ensure schema validation
          }
        );
        console.log(`Processed project: ${projectData.title} (slug: ${slug})`);
        successCount++;
      } catch (err) {
        console.warn(
          `Failed to process project: ${projectData.title || slug} - ${
            err.message
          }`
        );
        skipCount++;
      }
    }

    console.log(
      `Seeding complete: ${successCount} projects processed successfully, ${skipCount} skipped due to errors or missing data`
    );

    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding projects:", error.message);
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to error");
    process.exit(1);
  }
};

// Run the seeder
seedProjects();

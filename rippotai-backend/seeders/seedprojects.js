const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Adjust the path to your connectDB.js file
const Project = require("../models/project"); // Adjust the path to your Project model
const projectsData = require("../utils/projects.json"); // Adjust the path to your JSON file

// Seeder function
const seedProjects = async () => {
  try {
    // Connect to MongoDB using connectDB
    await connectDB();
    console.log("Connected to MongoDB via connectDB");

    // Upsert projects from JSON
    for (const projectData of projectsData) {
      const { slug, ...updateData } = projectData;
      await Project.findOneAndUpdate(
        { slug }, // Find project by slug
        { $set: updateData }, // Update fields (title, category, description, etc.)
        {
          upsert: true, // Insert if not found
          new: true, // Return the updated document
          runValidators: true, // Ensure schema validation
        }
      );
      console.log(`Processed project: ${projectData.title} (slug: ${slug})`);
    }

    console.log("Projects seeded successfully");

    // Close the connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding projects:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeder
seedProjects();

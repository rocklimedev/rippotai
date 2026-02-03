const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Adjust path if needed
const Project = require("../models/project"); // Adjust path if needed
const projectsData = require("../utils/projects.json"); // Adjust path if needed

// Seeder function
const seedProjects = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to MongoDB via connectDB");

    // Basic validation
    if (!Array.isArray(projectsData) || projectsData.length === 0) {
      throw new Error("projects.json is empty or not an array");
    }

    console.log(`Found ${projectsData.length} projects in JSON to process`);

    let successCount = 0;
    let skipCount = 0;
    let createdCount = 0;
    let updatedCount = 0;

    for (const projectData of projectsData) {
      // Required fields check
      if (!projectData.slug || !projectData.title) {
        console.warn(
          `Skipping project - missing slug or title: ${JSON.stringify(projectData, null, 2)}`,
        );
        skipCount++;
        continue;
      }

      // Clean the data: remove _id so we never try to overwrite MongoDB's _id
      const { _id, slug, ...updateFields } = projectData;

      // We will match ONLY by slug
      const filter = { slug };

      try {
        const result = await Project.findOneAndUpdate(
          filter,
          { $set: updateFields },
          {
            upsert: true, // create if not found
            new: true, // return the document after update
            runValidators: true, // enforce schema rules
            setDefaultsOnInsert: true, // apply default values on insert
          },
        );

        // Check if it was newly created or updated
        const wasCreated =
          result.createdAt && result.updatedAt
            ? result.createdAt.getTime() === result.updatedAt.getTime()
            : false;

        if (wasCreated) {
          createdCount++;
          console.log(
            `CREATED → ${projectData.title} (slug: ${slug})  _id: ${result._id}`,
          );
        } else {
          updatedCount++;
          console.log(
            `UPDATED → ${projectData.title} (slug: ${slug})  _id: ${result._id}`,
          );
        }

        successCount++;
      } catch (err) {
        console.warn(
          `Failed to process "${projectData.title || slug}": ${err.message}`,
        );
        if (err.code === 11000) {
          console.warn(" → Duplicate key error (likely slug conflict)");
        }
        skipCount++;
      }
    }

    console.log("\n───────────────────────────────────────────────");
    console.log(`Seeding finished:`);
    console.log(`  • Total processed successfully: ${successCount}`);
    console.log(`  • Created new: ${createdCount}`);
    console.log(`  • Updated existing: ${updatedCount}`);
    console.log(`  • Skipped / failed: ${skipCount}`);
    console.log("───────────────────────────────────────────────");

    // Graceful close
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Fatal error during seeding:", error.message);
    console.error(error.stack);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close().catch(() => {});
      console.log("MongoDB connection closed after error");
    }

    process.exit(1);
  }
};

// Execute
seedProjects();

const { sequelize, Project } = require("../models"); // Sequelize index
const projectsData = require("./project-backup.json");

const seedProjects = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");

    if (!Array.isArray(projectsData) || projectsData.length === 0) {
      throw new Error("projects.json is empty or invalid");
    }

    console.log(`Found ${projectsData.length} projects`);

    let successCount = 0;
    let createdCount = 0;
    let updatedCount = 0;
    let skipCount = 0;

    for (const projectData of projectsData) {
      try {
        if (!projectData.title) {
          console.warn("Skipping → missing title");
          skipCount++;
          continue;
        }

        // Remove Mongo-specific fields
        const { _id, __v, ...data } = projectData;

        // Check if exists by slug
        let existing = null;

        if (data.slug) {
          existing = await Project.findOne({
            where: { slug: data.slug },
          });
        }

        if (existing) {
          // UPDATE
          await existing.update(data);
          updatedCount++;

          console.log(`UPDATED → ${data.title}`);
        } else {
          // CREATE
          const created = await Project.create(data);
          createdCount++;

          console.log(`CREATED → ${created.title}`);
        }

        successCount++;
      } catch (err) {
        console.warn(
          `Failed → ${projectData.title || "Unknown"}: ${err.message}`,
        );
        skipCount++;
      }
    }

    console.log("\n──────────── RESULT ────────────");
    console.log(`Success: ${successCount}`);
    console.log(`Created: ${createdCount}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Skipped: ${skipCount}`);
    console.log("────────────────────────────────");

    await sequelize.close();
    console.log("🔌 MySQL connection closed");
  } catch (error) {
    console.error("❌ Fatal error:", error.message);

    try {
      await sequelize.close();
    } catch {}

    process.exit(1);
  }
};

seedProjects();

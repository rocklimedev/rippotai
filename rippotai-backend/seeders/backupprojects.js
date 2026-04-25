const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const { sequelize, Project } = require("../models");

const backupFilePath = path.join(__dirname, "project-backup.json");

// 🔹 BACKUP
async function backupProjects() {
  try {
    const projects = await Project.findAll({
      raw: true, // plain JS objects (like .lean())
    });

    if (!projects.length) {
      console.log("No projects found to backup");
      return;
    }

    await fs.writeFile(backupFilePath, JSON.stringify(projects, null, 2));

    console.log(`✅ Backup saved to ${backupFilePath}`);
  } catch (error) {
    console.error("❌ Backup error:", error.message);
  }
}

// 🔹 RESTORE
async function restoreProjects() {
  try {
    const data = await fs.readFile(backupFilePath, "utf-8");
    const projects = JSON.parse(data);

    if (!Array.isArray(projects) || !projects.length) {
      console.log("No valid data in backup file");
      return;
    }

    // ⚠️ Remove Sequelize auto fields
    const cleanedProjects = projects.map((p) => {
      const { id, createdAt, updatedAt, ...rest } = p;
      return rest;
    });

    // OPTION 1: Clear table (like deleteMany)
    await Project.destroy({ where: {} });

    // OPTION 2: Bulk insert (fast)
    await Project.bulkCreate(cleanedProjects, {
      validate: true,
    });

    console.log("✅ Data restored successfully!");
  } catch (error) {
    console.error("❌ Restore error:", error.message);
  }
}

// 🔹 MAIN
async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");

    const command = process.argv[2];

    if (command === "backup") {
      await backupProjects();
    } else if (command === "restore") {
      await restoreProjects();
    } else {
      console.log('Use: "backup" or "restore"');
      console.log("Example: node seeder.js backup");
    }

    await sequelize.close();
    console.log("🔌 Connection closed");
  } catch (err) {
    console.error("❌ Main error:", err.message);
    process.exit(1);
  }
}

main();

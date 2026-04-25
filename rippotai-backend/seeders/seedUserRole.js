const { sequelize, User, Role } = require("../models");

const usersData = require("./mongo-backup/users.json"); // your JSON
const rolesData = require("./mongo-backup/roles.json"); // your JSON

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");

    // -------------------------
    // 🔹 SEED ROLES
    // -------------------------
    for (const role of rolesData) {
      try {
        const { _id, __v, createdAt, updatedAt, ...data } = role;

        const [roleInstance, created] = await Role.findOrCreate({
          where: { name: data.name },
          defaults: data,
        });

        if (created) {
          console.log(`CREATED ROLE → ${data.name}`);
        } else {
          console.log(`EXISTS ROLE → ${data.name}`);
        }
      } catch (err) {
        console.warn(`Role failed → ${role.name}: ${err.message}`);
      }
    }

    // -------------------------
    // 🔹 SEED USERS
    // -------------------------
    for (const user of usersData) {
      try {
        const { _id, __v, createdAt, updatedAt, ...data } = user;

        // Check if user exists
        const existing = await User.findOne({
          where: { email: data.email },
        });

        if (existing) {
          await existing.update(data);
          console.log(`UPDATED USER → ${data.email}`);
        } else {
          await User.create(data);
          console.log(`CREATED USER → ${data.email}`);
        }
      } catch (err) {
        console.warn(`User failed → ${user.email}: ${err.message}`);
      }
    }

    console.log("\n✅ Seeding completed");

    await sequelize.close();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
  }
};

seed();

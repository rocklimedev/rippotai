const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const backupDir = path.join(__dirname, "mongo-backup");

// ensure backup folder exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// get all collections dynamically
const getCollections = async () => {
  const collections = await mongoose.connection.db.collections();
  return collections;
};

const backupDatabase = async () => {
  try {
    await connectDB();

    const collections = await getCollections();

    console.log(`Found ${collections.length} collections`);

    for (const collection of collections) {
      const name = collection.collectionName;

      const data = await collection.find({}).toArray();

      const filePath = path.join(backupDir, `${name}.json`);

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      console.log(`Backed up: ${name} -> ${filePath}`);
    }

    console.log("Backup completed successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Backup failed:", err);
    process.exit(1);
  }
};

backupDatabase();

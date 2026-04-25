// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config"); // ✅ NEW
const errorHandler = require("./middleware/errorHandler");

// Load env
dotenv.config();

const app = express();

// ----------------------
// DATABASE CONNECTION (Sequelize)
// ----------------------
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    await sequelize.sync(); // ⚠️ use { alter: true } in dev only
    console.log("✅ Models Synced");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ----------------------
// Middleware
// ----------------------

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "https://dashboard-rocklime.vercel.app",
  "https://cmtradingco.vercel.app",
  "https://dashboard-cmtradingco.vercel.app",
  "https://rippotaiarchitecture.com",
  "https://rippotai.vercel.app",
  "https://cmtradingco.com",
  "https://www.cmtradingco.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests. Try again later.",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// ----------------------
// Routes
// ----------------------
app.use("/api/queries", require("./routes/queries"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/careers", require("./routes/application"));
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", authLimiter, require("./routes/auth"));
app.use("/api/roles", require("./routes/roles"));

// ----------------------
// Error Handler
// ----------------------
app.use(errorHandler);

// ----------------------
// Server Start
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// ----------------------
// Middleware
// ----------------------

// Helmet for security headers
app.use(helmet());

// CORS configuration
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

// Use CORS globally
app.use(cors(corsOptions));


// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20, // max 20 requests per IP
  message: "Too many requests. Try again later.",
});

// Parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// ----------------------
// Routes
// ----------------------
app.use("/api/queries", require("./routes/queries"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/careers", require("./routes/application"));
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", authLimiter, require("./routes/auth")); // rate limiter applied
app.use("/api/roles", require("./routes/roles"));

// ----------------------
// Error Handling
// ----------------------
app.use(errorHandler);

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
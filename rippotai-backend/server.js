const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://dashboard-rocklime.vercel.app",
    "https://cmtradingco.vercel.app",
    "https://dashboard-cmtradingco.vercel.app",
    "https://rippotaiarchitecture.com",
    "https://rippotai.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Conditionally apply JSON parsing middleware
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    return next(); // Skip JSON parsing for multipart/form-data requests
  }
  express.json()(req, res, next); // Apply JSON parsing for other requests
});

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Routes
app.use("/api/queries", require("./routes/queries"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/careers", require("./routes/application"));

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

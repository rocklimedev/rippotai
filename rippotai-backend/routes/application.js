const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  getDashboardStats,
} = require("../controller/applicationController"); // Path to job/application controller

// Multer configuration for resume uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }
  },
});

// Job Routes
router.get("/jobs", getAllJobs); // GET /api/jobs - Get all jobs (with filters, search, pagination)
router.post("/jobs", createJob); // POST /api/jobs - Create new job
router.get("/jobs/:id", getJobById); // GET /api/jobs/:id - Get single job by ID
router.put("/jobs/:id", updateJob); // PUT /api/jobs/:id - Update job by ID
router.delete("/jobs/:id", deleteJob); // DELETE /api/jobs/:id - Delete job by ID

// Application Routes
router.post("/apply", upload.single("resume"), createApplication); // POST /api/apply - Create job application with resume upload
router.get("/applications", getApplications); // GET /api/applications - Get all applications (with filters)
router.put("/applications/:id", updateApplicationStatus); // PUT /api/applications/:id - Update application status
router.delete("/applications/:id", deleteApplication); // DELETE /api/applications/:id - Delete application
router.get("/dashboard-stats", getDashboardStats); // GET /api/dashboard-stats - Get dashboard analytics

module.exports = router;

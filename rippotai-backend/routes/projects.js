const express = require("express");
const router = express.Router();
const ProjectsController = require("../controller/projectController");
const multer = require("multer");
const path = require("path");

// ────────────────────────────────────────────────
// Multer setup – MEMORY STORAGE
// ────────────────────────────────────────────────
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("Only images allowed: jpg, jpeg, png, webp"));
  },
});

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 }, // Main image
  { name: "banner", maxCount: 1 }, // Banner image
  { name: "images", maxCount: 20 }, // Gallery images
]);

// ────────────────────────────────────────────────
// PUBLIC ROUTES
// ────────────────────────────────────────────────
router.get("/public", ProjectsController.getPublicProjects);
router.get("/featured", ProjectsController.getFeaturedProjects);
router.get("/completed", ProjectsController.getCompletedProjects);
router.get("/drafts", ProjectsController.getDraftProjects);
router.get("/location/:location", ProjectsController.getProjectsByLocation);
router.get("/:slug", ProjectsController.getProjectBySlug);

// ────────────────────────────────────────────────
// ADMIN ROUTES
// ────────────────────────────────────────────────
router.get("/", ProjectsController.getAllProjects); // Get all projects (with pagination & search)
router.get("/admin/:projectId", ProjectsController.getProjectById); // Get single project by projectId

// Create & Update with file uploads
router.post("/admin/", uploadFields, ProjectsController.createProject);
router.put("/admin/:projectId", uploadFields, ProjectsController.updateProject);

// Status Management
router.patch(
  "/admin/:projectId/status",
  ProjectsController.updateProjectStatus,
);

// ✅ NEW: Priority Management
router.patch(
  "/admin/:projectId/priority",
  ProjectsController.updateProjectPriority,
);

// ✅ NEW: Featured Management
router.patch("/admin/:projectId/featured", ProjectsController.setFeatured); // Set featured true/false
router.patch(
  "/admin/:projectId/toggle-featured",
  ProjectsController.toggleFeatured,
); // Toggle featured

// Delete Project
router.delete("/admin/:projectId", ProjectsController.deleteProject);

module.exports = router;

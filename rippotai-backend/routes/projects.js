const express = require("express");
const router = express.Router();
const ProjectsController = require("../controller/projectController");
const multer = require("multer");
const path = require("path");

// Multer setup for project image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * PUBLIC ROUTES
 */
router.get("/", ProjectsController.getAllProjects); // ?category=&status=
router.get("/public", ProjectsController.getPublicProjects); // public / client-facing
router.get("/completed", ProjectsController.getCompletedProjects);
router.get("/drafts", ProjectsController.getDraftProjects);
router.get("/location/:location", ProjectsController.getProjectsByLocation);
router.get("/:slug", ProjectsController.getProjectBySlug);
router.get("/admin/:id", ProjectsController.getProjectById);
/**
 * ADMIN / PROTECTED ROUTES
 */
router.post(
  "/admin/",
  upload.single("image"),
  ProjectsController.createProject,
);

router.put(
  "/admin/:id",
  upload.single("image"),
  ProjectsController.updateProject,
);

router.patch("/admin/:id/status", ProjectsController.updateProjectStatus);

router.delete("/admin/:id", ProjectsController.deleteProject);

module.exports = router;

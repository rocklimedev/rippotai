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
router.get("/completed", ProjectsController.getCompletedProjects);
router.get("/drafts", ProjectsController.getDraftProjects);
router.get("/location/:location", ProjectsController.getProjectsByLocation);
router.get("/:slug", ProjectsController.getProjectBySlug);

/**
 * ADMIN / PROTECTED ROUTES
 */
router.post("/", upload.single("image"), ProjectsController.createProject);

router.put("/:id", upload.single("image"), ProjectsController.updateProject);

router.patch("/:id/status", ProjectsController.updateProjectStatus);

router.delete("/:id", ProjectsController.deleteProject);

module.exports = router;

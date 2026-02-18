const express = require("express");
const router = express.Router();
const ProjectsController = require("../controller/projectController");
const multer = require("multer");
const path = require("path");

// ────────────────────────────────────────────────
// Multer setup – main image + gallery support
// ────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB – adjust as needed
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

const uploadMainImage = upload.single("image");
const uploadGallery = upload.array("images", 12);
const uploadBoth = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 12 },
]);

/**
 * PUBLIC / CLIENT-FACING ROUTES
 */
router.get("/", ProjectsController.getAllProjects); // ?category=&status=
router.get("/public", ProjectsController.getPublicProjects); // paginated frontend
router.get("/completed", ProjectsController.getCompletedProjects);
router.get("/drafts", ProjectsController.getDraftProjects); // mostly admin
router.get("/location/:location", ProjectsController.getProjectsByLocation);
router.get("/:slug", ProjectsController.getProjectBySlug);

/**
 * ADMIN / PROTECTED ROUTES
 * Using :projectId everywhere (not :id) to match projectId field
 */
router.get("/admin/:projectId", ProjectsController.getProjectById);

router.post("/admin/", uploadBoth, ProjectsController.createProject);

router.put("/admin/:projectId", uploadBoth, ProjectsController.updateProject);

router.patch(
  "/admin/:projectId/status",
  ProjectsController.updateProjectStatus,
);

router.delete("/admin/:projectId", ProjectsController.deleteProject);

module.exports = router;

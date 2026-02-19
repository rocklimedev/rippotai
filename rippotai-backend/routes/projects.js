const express = require("express");
const router = express.Router();
const ProjectsController = require("../controller/projectController");
const multer = require("multer");
const path = require("path");

// ────────────────────────────────────────────────
// Multer setup – MEMORY STORAGE (no disk writes)
// ────────────────────────────────────────────────
const storage = multer.memoryStorage(); // ← crucial change

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

// No need for separate single/array/fields — we use one instance
const uploadBoth = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 12 },
]);

/* ────────────────────────────────────────────────
   ROUTES (unchanged)
───────────────────────────────────────────────── */
router.get("/", ProjectsController.getAllProjects);
router.get("/public", ProjectsController.getPublicProjects);
router.get("/completed", ProjectsController.getCompletedProjects);
router.get("/drafts", ProjectsController.getDraftProjects);
router.get("/location/:location", ProjectsController.getProjectsByLocation);
router.get("/:slug", ProjectsController.getProjectBySlug);

router.get("/admin/:projectId", ProjectsController.getProjectById);

router.post("/admin/", uploadBoth, ProjectsController.createProject);

router.put("/admin/:projectId", uploadBoth, ProjectsController.updateProject);

router.patch(
  "/admin/:projectId/status",
  ProjectsController.updateProjectStatus,
);

router.delete("/admin/:projectId", ProjectsController.deleteProject);

module.exports = router;

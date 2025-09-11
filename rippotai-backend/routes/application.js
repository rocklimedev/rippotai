const express = require("express");
const router = express.Router();
const ApplicationsController = require("../controller/applicationController");
const multer = require("multer");
const path = require("path");

// Multer setup for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/jobs", ApplicationsController.getAllJobs);
router.post("/jobs", ApplicationsController.createJob);
router.get("/jobs/:id", ApplicationsController.getJobById);
router.put("/jobs/:id", ApplicationsController.updateJob);
router.delete("/jobs/:id", ApplicationsController.deleteJob);
router.post(
  "/apply",
  upload.single("resume"),
  ApplicationsController.createApplication
);
router.get("/applications", ApplicationsController.getApplications);

module.exports = router;

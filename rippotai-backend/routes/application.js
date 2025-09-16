const express = require("express");
const router = express.Router();
const ApplicationsController = require("../controller/applicationController");
const multer = require("multer");
const path = require("path");

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

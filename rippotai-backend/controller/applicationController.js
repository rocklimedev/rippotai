const Application = require("../models/application");
const { v4: uuidv4 } = require("uuid");
const ftp = require("basic-ftp");
const path = require("path");
const { bufferToStream } = require("../utils/buferToStream");
const {
  emailer,
  jobApplicationConfirmationEmail,
  adminJobApplicationNotificationEmail,
} = require("../middleware/sendEmail");

// ------------------- APPLICATION CONTROLLERS -------------------

// Create application (with FTP resume upload)
exports.createApplication = async (req, res, next) => {
  try {
    const { name, email, interestedIn, designation, phone, coverLetter } =
      req.body;
    console.log(name, email, interestedIn, designation, phone, coverLetter);
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Check for duplicate application by email + interestedIn
    const existingApplication = await Application.findOne({
      email,
      interestedIn,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this department.",
      });
    }

    const ext = path.extname(req.file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;

    const client = new ftp.Client();
    client.ftp.verbose = process.env.NODE_ENV === "development";

    try {
      await client.access({
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT || 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: process.env.FTP_SECURE === "true" || false,
      });

      const uploadDir = "/rippotai_applications";
      await client.ensureDir(uploadDir);
      await client.cd(uploadDir);

      const stream = bufferToStream(req.file.buffer);
      await client.uploadFrom(stream, uniqueName);

      const fileUrl = `${process.env.FTP_BASE_URL}/rippotai_applications/${uniqueName}`;

      const application = new Application({
        name,
        email,
        phone,
        designation,
        interestedIn,
        resume: fileUrl,
        coverLetter,
      });

      await application.save();

      return res.status(201).json({
        message: "Application submitted successfully",
        applicationId: application._id,
      });
    } catch (ftpErr) {
      console.error("FTP upload error:", ftpErr);
      return res.status(500).json({
        message: "FTP upload failed",
        error: ftpErr.message,
      });
    } finally {
      client.close();
    }
  } catch (error) {
    console.error("Create application error:", error);
    return res.status(500).json({
      message: "Failed to process application",
      error: error.message,
    });
  }
};

// Get all applications (with filters and pagination)
exports.getApplications = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { interestedIn: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Application.countDocuments(filter);
    res
      .status(200)
      .json({ applications, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

// Update application status (Pending, Reviewed, Shortlisted, Rejected)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res
      .status(200)
      .json({ message: "Application status updated", application });
  } catch (error) {
    next(error);
  }
};

// Delete application
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Dashboard analytics
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalApplications, pendingApplications, shortlistedApplications] =
      await Promise.all([
        Application.countDocuments(),
        Application.countDocuments({ status: "Pending" }),
        Application.countDocuments({ status: "Shortlisted" }),
      ]);

    res.status(200).json({
      totalApplications,
      pendingApplications,
      shortlistedApplications,
    });
  } catch (error) {
    next(error);
  }
};

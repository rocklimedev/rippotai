const Job = require("../models/job");
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

// ------------------- JOB CONTROLLERS -------------------

// Get all jobs (with optional filters, search, pagination)
exports.getAllJobs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(filter);

    res
      .status(200)
      .json({ jobs, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const { title, category, location, description, details } = req.body;
    const job = new Job({ title, category, location, description, details });
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { title, category, location, description, details } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { title, category, location, description, details },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ------------------- APPLICATION CONTROLLERS -------------------

// Create application (with FTP resume upload)
exports.createApplication = async (req, res, next) => {
  try {
    const { name, email, position, coverLetter } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Resume is required" });

    const existingApplication = await Application.findOne({ email, position });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
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
        position,
        resume: fileUrl,
        coverLetter,
      });
      await application.save();

      // Send confirmation + admin notification
      req.email = { to: email, params: [name, position] };
      await emailer(jobApplicationConfirmationEmail, "application")(
        req,
        res,
        async () => {
          req.email = {
            to: process.env.ADMIN_EMAIL || "admin@example.com",
            params: [name, email, position, coverLetter, fileUrl],
          };
          await emailer(adminJobApplicationNotificationEmail, "application")(
            req,
            res,
            () => {
              res.status(201).json({
                message: "Application submitted successfully",
                fileUrl,
                filename: uniqueName,
              });
            }
          );
        }
      );
    } catch (ftpErr) {
      console.error("FTP upload error:", ftpErr);
      return res
        .status(500)
        .json({ message: "FTP upload failed", error: ftpErr.message });
    } finally {
      client.close();
    }
  } catch (error) {
    console.error("Create application error:", error);
    next(error);
  }
};

// Get all applications (with filters)
exports.getApplications = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
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

// Update application status (for dashboard)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // Pending, Reviewed, Shortlisted, Rejected
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
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

// Dashboard analytics (jobs & applications overview)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalJobs,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
    ] = await Promise.all([
      Job.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: "Pending" }),
      Application.countDocuments({ status: "Shortlisted" }),
    ]);

    res.status(200).json({
      totalJobs,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
    });
  } catch (error) {
    next(error);
  }
};

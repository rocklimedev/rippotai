const Job = require("../models/job");
const Application = require("../models/application");
const { v4: uuidv4 } = require("uuid");
const ftp = require("basic-ftp");
const path = require("path");
const { bufferToStream } = require("../utils/buferToStream"); // Utility to convert buffer to stream

exports.getAllJobs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
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
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
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
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.createApplication = async (req, res, next) => {
  try {
    const { name, email, position, coverLetter } = req.body;

    // Check if resume file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({ email, position });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already submitted an application for this position.",
      });
    }

    // Generate unique filename
    const ext = path.extname(req.file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;

    // FTP upload
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

      // Ensure folder exists for resumes
      const uploadDir = "/rippotai_applications";
      await client.ensureDir(uploadDir);
      await client.cd(uploadDir);

      // Convert buffer to stream and upload
      const stream = bufferToStream(req.file.buffer);
      await client.uploadFrom(stream, uniqueName);

      // Construct public URL
      const fileUrl = `${process.env.FTP_BASE_URL}/rippotai_applications/${uniqueName}`;

      // Save application to database
      const application = new Application({
        name,
        email,
        position,
        resume: fileUrl, // Store the public URL
        coverLetter,
      });
      await application.save();

      return res.status(201).json({
        message: "Application submitted successfully",
        fileUrl,
        filename: uniqueName,
      });
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

exports.getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

const Job = require("../models/job");
const Application = require("../models/application");

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
    const resume = req.file ? req.file.path : null;
    if (!resume) {
      return res.status(400).json({ message: "Resume is required" });
    }
    const application = new Application({
      name,
      email,
      position,
      resume,
      coverLetter,
    });
    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
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

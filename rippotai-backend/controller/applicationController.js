const { Application, Sequelize } = require("../models");
const { Op } = Sequelize;

const { v4: uuidv4 } = require("uuid");
const ftp = require("basic-ftp");
const path = require("path");

const { bufferToStream } = require("../utils/buferToStream");

const {
  emailer,
  jobApplicationConfirmationEmail,
  adminJobApplicationNotificationEmail,
} = require("../middleware/sendEmail");

// ------------------- CREATE APPLICATION -------------------
exports.createApplication = async (req, res) => {
  const client = new ftp.Client();

  try {
    const { name, email, interestedIn, designation, phone, coverLetter } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // ✅ Duplicate check (email + interestedIn)
    const existingApplication = await Application.findOne({
      where: { email, interestedIn },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this department.",
      });
    }

    // ✅ Generate unique file name
    const ext = path.extname(req.file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;

    // ✅ FTP Upload
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
    // ✅ Set file permissions to 775
    await client.send(`SITE CHMOD 775 ${uniqueName}`);
    const fileUrl = `${process.env.FTP_BASE_URL}/rippotai_applications/${uniqueName}`;

    // ✅ Create record
    const application = await Application.create({
      name,
      email,
      phone,
      designation,
      interestedIn,
      resume: fileUrl,
      coverLetter,
    });

    // ✅ Optional Email Notifications (uncomment if needed)
    /*
    await emailer({
      to: email,
      subject: "Application Received",
      html: jobApplicationConfirmationEmail(name),
    });

    await emailer({
      to: process.env.ADMIN_EMAIL,
      subject: "New Job Application",
      html: adminJobApplicationNotificationEmail(name, email),
    });
    */

    return res.status(201).json({
      message: "Application submitted successfully",
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      message: "Failed to process application",
      error: error.message,
    });
  } finally {
    client.close();
  }
};

// ------------------- GET APPLICATIONS -------------------
exports.getApplications = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { interestedIn: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows: applications, count: total } =
      await Application.findAndCountAll({
        where,
        order: [["createdAt", "DESC"]],
        offset: (page - 1) * limit,
        limit: Number(limit),
      });

    res.status(200).json({
      applications,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- GET SINGLE APPLICATION -------------------
exports.getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

// ------------------- UPDATE STATUS -------------------
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.update({ status });

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- DELETE APPLICATION -------------------
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.destroy();

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- DASHBOARD STATS -------------------
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalApplications, pendingApplications, shortlistedApplications] =
      await Promise.all([
        Application.count(),
        Application.count({ where: { status: "Pending" } }),
        Application.count({ where: { status: "Shortlisted" } }),
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

const mongoose = require("mongoose");
const Project = require("../models/project");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const { uploadToFtp } = require("../utils/ftpUpload");

// ────────────────────────────────────────────────
// Helper for consistent responses
// ────────────────────────────────────────────────
const sendResponse = (
  res,
  statusCode,
  success,
  data = null,
  message = null,
  extra = {},
) => {
  res.status(statusCode).json({
    success,
    ...(data !== null && { data }),
    ...(message && { message }),
    ...extra,
  });
};

// ────────────────────────────────────────────────
// TRANSFORMER - Handles banner logic
// ────────────────────────────────────────────────
const transformProject = (project) => {
  if (!project) return project;

  // Backward compatibility: Extract banner from images if banner field is empty
  if (!project.banner && Array.isArray(project.images)) {
    const filteredImages = [];
    let banner = null;

    for (const img of project.images) {
      if (typeof img === "string") {
        const fileName = img.split("/").pop().toLowerCase();
        const nameWithoutExt = fileName.replace(/\.(png|jpe?g|webp)$/i, "");

        if (nameWithoutExt === "banner" || nameWithoutExt.includes("banner")) {
          banner = img;
          continue;
        }
      }
      filteredImages.push(img);
    }

    if (banner) {
      project.banner = banner;
      project.images = filteredImages;
    }
  }

  return project;
};

// ────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ────────────────────────────────────────────────

exports.getPublicProjects = async (req, res) => {
  try {
    const { category, page = "1", limit = "6" } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

    const filter = {
      status: { $in: ["working", "completed"] },
    };

    if (category?.trim()) {
      filter.category = category.trim();
    }

    const skip = (pageNum - 1) * limitNum;

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .select(
          "title slug category location scope image banner images status createdAt projectId featured",
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter),
    ]);

    const transformed = projects.map(transformProject);

    sendResponse(res, 200, true, transformed, null, {
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: total > 0 ? Math.ceil(total / limitNum) : 0,
      },
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to fetch public projects");
  }
};

exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
      .select("-__v")
      .lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, transformProject(project));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// ADMIN ENDPOINTS
// ────────────────────────────────────────────────

exports.getAllProjects = async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10, search } = req.query;

    const pageNumber = Math.max(parseInt(page), 1);
    const pageSize = Math.max(parseInt(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    const filter = {};

    if (category?.trim()) filter.category = category.trim();
    if (status?.trim()) filter.status = status.trim();

    if (search?.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { category: regex },
        { location: regex },
        { projectId: regex },
      ];
    }

    const total = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .select("-__v")
      .lean();

    sendResponse(res, 200, true, {
      data: projects.map(transformProject),
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to fetch projects");
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId })
      .select("-__v")
      .lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, transformProject(project));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// CREATE PROJECT
// ────────────────────────────────────────────────
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      details,
      status,
      location,
      scope,
      featured,
    } = req.body;

    // Validation
    if (!title?.trim())
      return sendResponse(res, 400, false, null, "Title is required");
    if (!category?.trim())
      return sendResponse(res, 400, false, null, "Category is required");
    if (!description?.trim())
      return sendResponse(res, 400, false, null, "Description is required");
    if (!details?.trim())
      return sendResponse(res, 400, false, null, "Details are required");
    if (!req.files?.image?.[0])
      return sendResponse(res, 400, false, null, "Main image is required");
    if (!req.files?.banner?.[0])
      return sendResponse(res, 400, false, null, "Banner image is required");

    const projectFolder = `rippotai_projects/${slugify(title.trim(), { lower: true, strict: true })}`;

    // Upload Main Image
    const mainUpload = await uploadToFtp(
      req.files.image[0].buffer,
      req.files.image[0].originalname,
      projectFolder,
    );

    // Upload Banner Image
    const bannerUpload = await uploadToFtp(
      req.files.banner[0].buffer,
      req.files.banner[0].originalname,
      projectFolder,
    );

    // Upload Gallery Images
    const galleryUrls = [];
    if (req.files?.images?.length) {
      for (const file of req.files.images) {
        try {
          const upload = await uploadToFtp(
            file.buffer,
            file.originalname,
            projectFolder,
          );
          galleryUrls.push(upload.url);
        } catch (err) {
          console.error("Gallery upload failed:", err.message);
        }
      }
    }

    const project = new Project({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      details: details.trim(),
      image: mainUpload.url,
      banner: bannerUpload.url,
      images: galleryUrls,
      status: status || "draft",
      location: location?.trim(),
      scope: scope?.trim(),
      featured: featured === "true" || featured === true,
    });

    await project.save();

    sendResponse(
      res,
      201,
      true,
      transformProject(project.toObject()),
      "Project created successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

// ────────────────────────────────────────────────
// UPDATE PROJECT
// ────────────────────────────────────────────────
exports.updateProject = async (req, res) => {
  try {
    const existing = await Project.findOne({ projectId: req.params.projectId });

    if (!existing) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    const updateData = {};

    const fields = [
      "title",
      "category",
      "description",
      "details",
      "status",
      "location",
      "scope",
      "featured",
    ];

    fields.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    });

    // 🔥 ALWAYS USE EXISTING SLUG (NO NEW FOLDER)
    let projectFolder = `rippotai_projects/${existing.slug}`;
    // Update Main Image
    if (req.files?.image?.[0]) {
      const upload = await uploadToFtp(
        req.files.image[0].buffer,
        req.files.image[0].originalname,
        projectFolder,
      );
      updateData.image = upload.url;
    }

    // Update Banner Image
    if (req.files?.banner?.[0]) {
      const upload = await uploadToFtp(
        req.files.banner[0].buffer,
        req.files.banner[0].originalname,
        projectFolder,
      );
      updateData.banner = upload.url;
    }

    // Handle Gallery Images
    let finalImages = [];
    if (req.body.existingImages) {
      try {
        finalImages = JSON.parse(req.body.existingImages);
      } catch (e) {
        finalImages = [];
      }
    }

    if (req.files?.images?.length) {
      for (const file of req.files.images) {
        try {
          const upload = await uploadToFtp(
            file.buffer,
            file.originalname,
            projectFolder,
          );
          finalImages.push(upload.url);
        } catch (err) {
          console.error("Gallery upload failed:", err.message);
        }
      }
    }

    updateData.images = finalImages;

    const updated = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      updateData,
      { new: true, runValidators: true },
    ).lean();

    sendResponse(
      res,
      200,
      true,
      transformProject(updated),
      "Project updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

// ────────────────────────────────────────────────
// OTHER ENDPOINTS
// ────────────────────────────────────────────────

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      projectId: req.params.projectId,
    });

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, null, "Project deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["draft", "prunned", "working", "completed"].includes(status)) {
      return sendResponse(res, 400, false, null, "Invalid status value");
    }

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { status },
      { new: true },
    ).lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(
      res,
      200,
      true,
      transformProject(project),
      "Status updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.getFeaturedProjects = async (req, res) => {
  try {
    const { limit = "6" } = req.query;
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .select(
        "title slug category location scope image banner images status createdAt projectId featured",
      )
      .lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to fetch featured projects");
  }
};

exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching completed projects");
  }
};

exports.getProjectsByLocation = async (req, res) => {
  try {
    const projects = await Project.find({
      location: req.params.location?.trim(),
    }).lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching projects by location");
  }
};

exports.getDraftProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "draft" })
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching draft projects");
  }
};

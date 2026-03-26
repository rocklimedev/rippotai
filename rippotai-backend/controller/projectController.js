const mongoose = require("mongoose");
const Project = require("../models/project");
const { uploadToFtp } = require("../utils/ftpUpload");
const slugify = require("slugify");

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
// TRANSFORMER (🔥 CORE LOGIC)
// ────────────────────────────────────────────────
const transformProject = (project) => {
  if (!project) return project;

  let banner = null;

  if (Array.isArray(project.images)) {
    const filteredImages = [];

    for (const img of project.images) {
      if (
        typeof img === "string" &&
        img.split("/").pop().toLowerCase() === "banner.png"
      ) {
        banner = img;
      } else {
        filteredImages.push(img);
      }
    }

    project.images = filteredImages;
  }

  if (banner) {
    project.banner = banner;
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
          "title slug category location scope image images status createdAt projectId",
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
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// ADMIN
// ────────────────────────────────────────────────

exports.getAllProjects = async (req, res) => {
  try {
    const { category, status } = req.query;

    const filter = {};
    if (category?.trim()) filter.category = category.trim();
    if (status?.trim()) filter.status = status.trim();

    const projects = await Project.find(filter)
      .sort({ title: 1 })
      .select("-__v")
      .lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
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
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// CREATE
// ────────────────────────────────────────────────

exports.createProject = async (req, res) => {
  try {
    const { title, category, description, details, status, location, scope } =
      req.body;

    if (!title?.trim()) {
      return sendResponse(res, 400, false, null, "Title is required");
    }

    const cleanedTitle = title.trim();
    const slug = slugify(cleanedTitle, { lower: true, strict: true });
    const projectFolder = `rippotai_projects/${slug}`;

    if (!req.files?.image?.[0]) {
      return sendResponse(res, 400, false, null, "Main image is required");
    }

    const mainFile = req.files.image[0];

    const mainImageUrl = await uploadToFtp(
      mainFile.buffer,
      mainFile.originalname || mainFile.filename,
      projectFolder,
    );

    const galleryUrls = [];

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        try {
          const url = await uploadToFtp(
            file.buffer,
            file.originalname || file.filename,
            projectFolder,
          );
          galleryUrls.push(url);
        } catch (err) {
          console.error("Gallery upload failed:", err.message);
        }
      }
    }

    const project = new Project({
      title: cleanedTitle,
      slug,
      category: category?.trim() || undefined,
      description: description?.trim(),
      details: details?.trim(),
      image: mainImageUrl,
      images: galleryUrls,
      status: status || "draft",
      location: location?.trim(),
      scope: scope?.trim(),
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
    sendResponse(res, 500, false, null, error.message);
  }
};

// ────────────────────────────────────────────────
// UPDATE
// ────────────────────────────────────────────────

exports.updateProject = async (req, res) => {
  try {
    const updateData = {};

    const fields = [
      "title",
      "category",
      "description",
      "details",
      "status",
      "location",
      "scope",
    ];

    fields.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    });

    const existing = await Project.findOne({
      projectId: req.params.projectId,
    });

    if (!existing) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    let projectFolder = `rippotai_projects/${existing.slug}`;

    if (updateData.title) {
      const newSlug = slugify(updateData.title, {
        lower: true,
        strict: true,
      });

      if (newSlug !== existing.slug) {
        projectFolder = `rippotai_projects/${newSlug}`;
        updateData.slug = newSlug;
      }
    }

    if (req.files?.image?.[0]) {
      const file = req.files.image[0];

      const newMainUrl = await uploadToFtp(
        file.buffer,
        file.originalname || file.filename,
        projectFolder,
      );

      updateData.image = newMainUrl;
    }

    let finalImages = [];

    if (req.body.existingImages) {
      try {
        finalImages = JSON.parse(req.body.existingImages);
      } catch {}
    }

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        try {
          const url = await uploadToFtp(
            file.buffer,
            file.originalname || file.filename,
            projectFolder,
          );
          finalImages.push(url);
        } catch {}
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
    sendResponse(res, 500, false, null, error.message);
  }
};

// ────────────────────────────────────────────────
// DELETE + OTHERS
// ────────────────────────────────────────────────

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      projectId: req.params.projectId,
    });

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, null, "Deleted");
  } catch {
    sendResponse(res, 500, false, null, "Server error");
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { status },
      { new: true },
    ).lean();

    sendResponse(res, 200, true, transformProject(project));
  } catch (error) {
    sendResponse(res, 400, false, null, error.message);
  }
};

exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "completed" }).lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch {
    sendResponse(res, 500, false, null, "Error");
  }
};

exports.getProjectsByLocation = async (req, res) => {
  try {
    const projects = await Project.find({
      location: req.params.location?.trim(),
    }).lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch {
    sendResponse(res, 500, false, null, "Error");
  }
};

exports.getDraftProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "draft" }).lean();

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch {
    sendResponse(res, 500, false, null, "Error");
  }
};

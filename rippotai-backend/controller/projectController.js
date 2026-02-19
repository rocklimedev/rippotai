const mongoose = require("mongoose");
const Project = require("../models/project");
const { uploadToFtp } = require("../utils/ftpUpload");
const slugify = require("slugify");
const fs = require("fs");

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
// PUBLIC ENDPOINTS
// ────────────────────────────────────────────────

/**
 * GET /projects/public
 * FAST listing API (frontend)
 */
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
          "title slug category location scope image status createdAt projectId",
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter),
    ]);

    sendResponse(res, 200, true, projects, null, {
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

/**
 * GET /projects/:slug
 * (PUBLIC – slug based)
 */
exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
      .select("-__v") // projectId is not needed publicly
      .lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, project);
  } catch (error) {
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// ADMIN / FULL ENDPOINTS
// ────────────────────────────────────────────────

/**
 * GET /projects
 * Query params: category, status
 * Returns all projects (admin view)
 */
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

    sendResponse(res, 200, true, projects);
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch projects");
  }
};

/**
 * GET /projects/admin/:projectId
 * :projectId is the custom UUID string, NOT MongoDB _id
 */
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId })
      .select("-__v")
      .lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, project);
  } catch (error) {
    sendResponse(res, 500, false, null, "Server error");
  }
};

/**
 * POST /projects/admin/ — CREATE
 */
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

    // ─── MAIN IMAGE (required) ──────────────────────────────────────
    if (!req.files?.image?.[0]) {
      return sendResponse(res, 400, false, null, "Main image is required");
    }

    const mainFile = req.files.image[0];

    const mainImageUrl = await uploadToFtp(
      mainFile.buffer,
      mainFile.originalname || mainFile.filename,
      projectFolder, // ← remoteDir = rippotai_projects/{slug}
    );

    // ─── GALLERY IMAGES (optional) ──────────────────────────────────
    const galleryUrls = [];

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        try {
          const url = await uploadToFtp(
            file.buffer,
            file.originalname || file.filename,
            projectFolder, // ← same remoteDir for all gallery images
          );
          galleryUrls.push(url);
        } catch (uploadErr) {
          console.error(
            `Gallery upload failed: ${file.originalname}`,
            uploadErr.message,
          );
          // continue — don't fail whole request
        }
      }
    }

    // ─── SAVE PROJECT ───────────────────────────────────────────────
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

    sendResponse(res, 201, true, project, "Project created successfully");
  } catch (error) {
    console.error("Create project failed:", error);
    sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Failed to create project",
    );
  }
};

/**
 * PUT /projects/admin/:projectId — UPDATE
 */
exports.updateProject = async (req, res) => {
  try {
    const updateData = {};

    const scalarFields = [
      "title",
      "category",
      "description",
      "details",
      "status",
      "location",
      "scope",
    ];
    scalarFields.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    });

    // Fetch existing project to determine base folder
    const existing = await Project.findOne({ projectId: req.params.projectId });
    if (!existing) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    // Decide folder — use new slug if title changed, otherwise keep existing
    let projectFolder = `rippotai_projects/${existing.slug}`;
    if (updateData.title) {
      const newSlug = slugify(updateData.title, { lower: true, strict: true });
      if (newSlug !== existing.slug) {
        projectFolder = `rippotai_projects/${newSlug}`;
        updateData.slug = newSlug; // keep slug in sync with folder
      }
    }

    // ─── MAIN IMAGE REPLACEMENT (optional) ───────────────
    if (req.files?.image?.[0]) {
      const file = req.files.image[0];

      const newMainUrl = await uploadToFtp(
        file.buffer,
        file.originalname || file.filename,
        projectFolder, // ← remoteDir = rippotai_projects/{slug or new-slug}
      );

      updateData.image = newMainUrl;
    }

    // ─── GALLERY ─────────────────────────────────────────
    let finalImages = [];

    if (req.body.existingImages !== undefined) {
      try {
        const kept = JSON.parse(req.body.existingImages);
        if (Array.isArray(kept)) {
          finalImages = kept.filter(
            (u) => typeof u === "string" && u.startsWith("http"),
          );
        }
      } catch (e) {
        console.warn("Invalid existingImages:", e.message);
      }
    }

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        try {
          const url = await uploadToFtp(
            file.buffer,
            file.originalname || file.filename,
            projectFolder, // ← same remoteDir for all new gallery images
          );
          finalImages.push(url);
        } catch (err) {
          console.error(
            `Gallery upload failed: ${file.originalname}`,
            err.message,
          );
        }
      }
    }

    if (
      req.body.existingImages !== undefined ||
      req.files?.images?.length > 0
    ) {
      updateData.images = finalImages;
    }

    const updated = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      updateData,
      { new: true, runValidators: true, select: "-__v" },
    );

    sendResponse(res, 200, true, updated, "Project updated successfully");
  } catch (error) {
    console.error("Update project error:", error);
    sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Failed to update project",
    );
  }
};
/**
 * DELETE /projects/admin/:projectId
 * :projectId is the custom UUID
 * (ADMIN)
 */
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
    sendResponse(res, 500, false, null, "Server error");
  }
};

/**
 * PATCH /projects/admin/:projectId/status
 * :projectId is the custom UUID
 * (ADMIN – quick status change)
 */
exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["draft", "prunned", "working", "completed"].includes(status)) {
      return sendResponse(res, 400, false, null, "Invalid status value");
    }

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { status },
      { new: true, runValidators: true, select: "-__v" },
    );

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, project, "Project status updated");
  } catch (error) {
    sendResponse(
      res,
      400,
      false,
      null,
      error.message || "Failed to update status",
    );
  }
};

/**
 * GET /projects/completed
 * (PUBLIC / ADMIN – completed projects)
 */
exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .select(
        "title slug category location scope image status createdAt projectId",
      )
      .lean();

    sendResponse(res, 200, true, projects);
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch completed projects");
  }
};

/**
 * GET /projects/location/:location
 */
exports.getProjectsByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const projects = await Project.find({ location: location?.trim() })
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, true, projects);
  } catch (error) {
    sendResponse(res, 500, false, null, "Server error");
  }
};

/**
 * GET /projects/drafts
 * (ADMIN – draft projects)
 */
exports.getDraftProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "draft" })
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, true, projects);
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch draft projects");
  }
};

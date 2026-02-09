// controllers/projectController.js
const mongoose = require("mongoose");
const Project = require("../models/project");

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
        .select("title slug category location scope image status createdAt")
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
      .select("-__v -projectId") // optional: hide internal uuid if not needed publicly
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
 * GET /projects/:id
 */
exports.getProjectById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, null, "Invalid project ID");
    }

    const project = await Project.findById(req.params.id).select("-__v").lean();

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, project);
  } catch (error) {
    sendResponse(res, 500, false, null, "Server error");
  }
};

/**
 * POST /projects
 */
exports.createProject = async (req, res) => {
  try {
    const { title, category, description, details, status, location, scope } =
      req.body;

    const mainImage = req.file?.path || req.body.image;

    if (!mainImage) {
      return sendResponse(res, 400, false, null, "Main image is required");
    }

    const galleryImages = req.files?.images
      ? req.files.images.map((file) => file.path)
      : [];

    const project = new Project({
      title: title?.trim(),
      category: category?.trim(),
      description,
      details,
      image: mainImage,
      images: galleryImages,
      status: status || "draft",
      location: location?.trim(),
      scope: scope?.trim(),
    });

    await project.save();

    sendResponse(res, 201, true, project, "Project created successfully");
  } catch (error) {
    sendResponse(
      res,
      400,
      false,
      null,
      error.message || "Failed to create project",
    );
  }
};

/**
 * PUT /projects/:id
 * (ADMIN – ID based)
 */
exports.updateProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, null, "Invalid project ID");
    }

    const updateData = {};

    // Scalar fields
    [
      "title",
      "category",
      "description",
      "details",
      "status",
      "location",
      "scope",
    ].forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
      }
    });

    // Main image
    if (req.file?.path) {
      updateData.image = req.file.path;
    }

    // Gallery images logic
    let finalImages = null;

    // Parse existing images the client wants to keep
    if (req.body.existingImages !== undefined) {
      try {
        const kept = JSON.parse(req.body.existingImages);
        if (Array.isArray(kept)) {
          finalImages = kept.filter(Boolean);
        }
      } catch {
        // invalid JSON → treat as no kept images
      }
    }

    // Append newly uploaded gallery images
    if (req.files?.images?.length > 0) {
      const newPaths = req.files.images.map((f) => f.path);
      finalImages = finalImages ? [...finalImages, ...newPaths] : newPaths;
    }

    // Only update gallery if there was explicit input about it
    if (
      req.body.existingImages !== undefined ||
      req.files?.images?.length > 0
    ) {
      updateData.images = finalImages || [];
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, select: "-__v" },
    );

    if (!updatedProject) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(
      res,
      200,
      true,
      updatedProject,
      "Project updated successfully",
    );
  } catch (error) {
    sendResponse(
      res,
      400,
      false,
      null,
      error.message || "Failed to update project",
    );
  }
};

/**
 * DELETE /projects/:id
 * (ADMIN – ID based)
 */
exports.deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, null, "Invalid project ID");
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, null, "Project deleted successfully");
  } catch (error) {
    sendResponse(res, 500, false, null, "Server error");
  }
};

/**
 * GET /projects/completed
 */
exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .select("title slug category location scope image status createdAt")
      .lean();

    sendResponse(res, 200, true, projects);
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch completed projects");
  }
};

/**
 * PATCH /projects/:id/status
 * (ADMIN – ID based)
 */
exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["draft", "prunned", "working", "completed"].includes(status)) {
      return sendResponse(res, 400, false, null, "Invalid status value");
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, null, "Invalid project ID");
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
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

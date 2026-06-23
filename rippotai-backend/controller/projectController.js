const db = require("../models"); // ← This loads models/index.js
const Project = db.Project;
const slugify = require("slugify");
const { uploadToFtp } = require("../utils/ftpUpload");
const { Op, literal } = require("sequelize"); // Import Op and literal

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
// TRANSFORMER - Handles banner logic (unchanged)
// ────────────────────────────────────────────────
// ────────────────────────────────────────────────
// TRANSFORMER - Handles banner logic + snake_case → camelCase
// ────────────────────────────────────────────────
const transformProject = (project) => {
  if (!project) return project;

  const transformed =
    typeof project.toJSON === "function" ? project.toJSON() : { ...project };

  transformed.moreDetails = transformed.more_details || "";
  delete transformed.more_details;

  if (!transformed.banner && Array.isArray(transformed.images)) {
    const filteredImages = [];
    let banner = null;

    for (const img of transformed.images) {
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
      transformed.banner = banner;
      transformed.images = filteredImages;
    }
  }

  return transformed;
};
// ────────────────────────────────────────────────
// COMMON PRIORITY SORT (Priority 0 = lowest → goes to bottom)
// ────────────────────────────────────────────────
const getPriorityOrder = (order = "asc") => {
  const direction = order === "desc" ? "DESC" : "ASC";

  return [
    [
      literal(`
        CASE 
          WHEN priority = 0 THEN 999999 
          ELSE priority 
        END
      `),
      direction,
    ],
    ["createdAt", "DESC"], // Newest first as secondary sort
  ];
};

// ────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ────────────────────────────────────────────────

exports.getPublicProjects = async (req, res) => {
  try {
    const { category, page = "1", limit = "6" } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const offset = (pageNum - 1) * limitNum;

    const where = {
      status: { [Op.in]: ["working", "completed"] },
    };

    if (category?.trim()) {
      where.category = category.trim();
    }

    const { count: total, rows: projects } = await Project.findAndCountAll({
      where,
      order: getPriorityOrder("asc"),
      limit: limitNum,
      offset,
      attributes: [
        "title",
        "slug",
        "category",
        "location",
        "scope",
        "description",
        "image",
        "banner",
        "images",
        "status",
        "createdAt",
        "projectId",
        "featured",
        "priority",
      ],
    });

    sendResponse(res, 200, true, projects.map(transformProject), null, {
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
    const project = await Project.findOne({
      where: { slug: req.params.slug },
      attributes: { exclude: ["__v"] }, // __v not present in Sequelize, but safe
    });

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, transformProject(project.toJSON()));
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
    const {
      category,
      status,
      page = 1,
      limit = 10,
      search,
      sort = "priority",
      order = "asc",
    } = req.query;

    const pageNumber = Math.max(parseInt(page), 1);
    const pageSize = Math.max(parseInt(limit), 1);
    const offset = (pageNumber - 1) * pageSize;

    const where = {};

    if (category?.trim()) where.category = category.trim();

    if (status?.trim()) {
      if (status.includes(",")) {
        where.status = { [Op.in]: status.split(",").map((s) => s.trim()) };
      } else {
        where.status = status.trim();
      }
    }

    if (search?.trim()) {
      const regex = `%${search.trim()}%`; // For LIKE
      where[Op.or] = [
        { title: { [Op.like]: regex } },
        { category: { [Op.like]: regex } },
        { location: { [Op.like]: regex } },
        { projectId: { [Op.like]: regex } },
      ];
    }

    const { count: total, rows: projects } = await Project.findAndCountAll({
      where,
      order: getPriorityOrder(order), // Uses our CASE logic
      limit: pageSize,
      offset,
      attributes: { exclude: ["createdAt", "updatedAt"] }, // adjust as needed
    });

    sendResponse(res, 200, true, {
      data: projects.map((p) => transformProject(p.toJSON())),
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
    const project = await Project.findOne({
      where: { projectId: req.params.projectId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, transformProject(project.toJSON()));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// CREATE & UPDATE
// ────────────────────────────────────────────────

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      details,
      moreDetails, // ← from frontend (FormData)
      status,
      location,
      scope,
      featured,
      priority,
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

    // Upload Banner
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

    // Create Project
    const project = await Project.create({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      details: details.trim(),
      more_details: moreDetails?.trim() || null, // ← Proper mapping
      image: mainUpload.url,
      banner: bannerUpload.url,
      images: galleryUrls,
      status: status || "draft",
      location: location?.trim() || null,
      scope: scope?.trim() || null,
      featured: featured === "true" || featured === true,
      priority: parseInt(priority) || 0,
    });

    sendResponse(
      res,
      201,
      true,
      transformProject(project.toJSON()),
      "Project created successfully",
    );
  } catch (error) {
    console.error("Create Project Error:", error);
    sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Failed to create project",
    );
  }
};
exports.updateProject = async (req, res) => {
  try {
    const existing = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    if (!existing) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    const updateData = {};

    const fields = [
      "title",
      "category",
      "description",
      "details",
      "moreDetails",
      "status",
      "location",
      "scope",
      "featured",
      "priority",
    ];

    fields.forEach((key) => {
      if (req.body[key] !== undefined) {
        if (key === "priority") {
          updateData.priority = parseInt(req.body[key]) || 0;
        } else if (key === "featured") {
          updateData.featured =
            req.body[key] === "true" || req.body[key] === true;
        } else if (key === "moreDetails") {
          updateData.more_details = req.body.moreDetails?.trim() || null;
        } else {
          updateData[key] =
            typeof req.body[key] === "string"
              ? req.body[key].trim()
              : req.body[key];
        }
      }
    });

    const projectFolder = `rippotai_projects/${existing.slug}`;

    // Main Image
    if (req.files?.image?.[0]) {
      const upload = await uploadToFtp(
        req.files.image[0].buffer,
        req.files.image[0].originalname,
        projectFolder,
      );
      updateData.image = upload.url;
    }

    // Banner Image
    if (req.files?.banner?.[0]) {
      const upload = await uploadToFtp(
        req.files.banner[0].buffer,
        req.files.banner[0].originalname,
        projectFolder,
      );
      updateData.banner = upload.url;
    }

    // Gallery Images
    let finalImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : existing.images || [];

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

    const [updatedCount] = await Project.update(updateData, {
      where: { projectId: req.params.projectId },
    });

    if (updatedCount === 0) {
      return sendResponse(res, 400, false, null, "No changes were made");
    }

    const updated = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    sendResponse(
      res,
      200,
      true,
      transformProject(updated.toJSON()),
      "Project updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};
// ────────────────────────────────────────────────
// SPECIAL FUNCTIONS
// ────────────────────────────────────────────────

exports.updateProjectPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    if (priority === undefined || isNaN(parseInt(priority))) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Valid priority number is required",
      );
    }

    const [updatedCount] = await Project.update(
      { priority: parseInt(priority) || 0 },
      { where: { projectId: req.params.projectId } },
    );

    if (updatedCount === 0) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    const project = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    sendResponse(
      res,
      200,
      true,
      transformProject(project.toJSON()),
      "Priority updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    if (!project) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    project.featured = !project.featured;
    await project.save();

    sendResponse(
      res,
      200,
      true,
      transformProject(project.toJSON()),
      `Project ${project.featured ? "featured" : "unfeatured"} successfully`,
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.setFeatured = async (req, res) => {
  try {
    const { featured } = req.body;

    const [updatedCount] = await Project.update(
      { featured: !!featured },
      { where: { projectId: req.params.projectId } },
    );

    if (updatedCount === 0) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    const project = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    sendResponse(
      res,
      200,
      true,
      transformProject(project.toJSON()),
      `Project ${featured ? "marked as featured" : "removed from featured"} successfully`,
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["draft", "prunned", "working", "completed"].includes(status)) {
      return sendResponse(res, 400, false, null, "Invalid status value");
    }

    const [updatedCount] = await Project.update(
      { status },
      { where: { projectId: req.params.projectId } },
    );

    if (updatedCount === 0) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    const project = await Project.findOne({
      where: { projectId: req.params.projectId },
    });

    sendResponse(
      res,
      200,
      true,
      transformProject(project.toJSON()),
      "Status updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedCount = await Project.destroy({
      where: { projectId: req.params.projectId },
    });

    if (deletedCount === 0) {
      return sendResponse(res, 404, false, null, "Project not found");
    }

    sendResponse(res, 200, true, null, "Project deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// OTHER LIST ENDPOINTS
// ────────────────────────────────────────────────

exports.getFeaturedProjects = async (req, res) => {
  try {
    const { limit = "6" } = req.query;
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

    const projects = await Project.findAll({
      where: { featured: true },
      order: getPriorityOrder("asc"),
      limit: limitNum,
      attributes: [
        "title",
        "slug",
        "category",
        "location",
        "scope",
        "image",
        "banner",
        "images",
        "status",
        "createdAt",
        "projectId",
        "featured",
        "priority",
      ],
    });

    sendResponse(
      res,
      200,
      true,
      projects.map((p) => transformProject(p.toJSON())),
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to fetch featured projects");
  }
};

exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { status: "completed" },
      order: getPriorityOrder("asc"),
    });

    sendResponse(
      res,
      200,
      true,
      projects.map((p) => transformProject(p.toJSON())),
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching completed projects");
  }
};

exports.getProjectsByLocation = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        location: req.params.location?.trim(),
        status: { [Op.in]: ["working", "completed"] },
      },
      order: getPriorityOrder("asc"),
    });

    sendResponse(
      res,
      200,
      true,
      projects.map((p) => transformProject(p.toJSON())),
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching projects by location");
  }
};

exports.getDraftProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { status: "draft" },
      order: getPriorityOrder("asc"),
    });

    sendResponse(
      res,
      200,
      true,
      projects.map((p) => transformProject(p.toJSON())),
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching draft projects");
  }
};

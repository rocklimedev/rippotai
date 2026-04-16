const Project = require("../models/project");
const slugify = require("slugify");
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
// COMMON SORTING PIPELINE (Priority 0 = lowest)
// ────────────────────────────────────────────────
const getPrioritySort = (order = "asc") => {
  return [
    {
      $addFields: {
        effectivePriority: {
          $cond: {
            if: { $eq: ["$priority", 0] },
            then: 999999, // 0 priority goes to the bottom
            else: "$priority",
          },
        },
      },
    },
    {
      $sort: {
        effectivePriority: order === "desc" ? -1 : 1,
        createdAt: -1, // Newest first as secondary sort
      },
    },
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

    const filter = {
      status: { $in: ["working", "completed"] },
    };

    if (category?.trim()) {
      filter.category = category.trim();
    }

    const skip = (pageNum - 1) * limitNum;

    const [projects, total] = await Promise.all([
      Project.aggregate([
        { $match: filter },
        ...getPrioritySort("asc"), // Priority 1 = highest, 0 = lowest
        { $skip: skip },
        { $limit: limitNum },
        {
          $project: {
            title: 1,
            slug: 1,
            category: 1,
            location: 1,
            scope: 1,
            image: 1,
            banner: 1,
            images: 1,
            status: 1,
            createdAt: 1,
            projectId: 1,
            featured: 1,
            priority: 1,
          },
        },
      ]),
      Project.countDocuments(filter),
    ]);

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
    const skip = (pageNumber - 1) * pageSize;

    const filter = {};

    if (category?.trim()) filter.category = category.trim();

    if (status?.trim()) {
      if (status.includes(",")) {
        filter.status = { $in: status.split(",").map((s) => s.trim()) };
      } else {
        filter.status = status.trim();
      }
    }

    if (search?.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { category: regex },
        { location: regex },
        { projectId: regex },
      ];
    }

    const projects = await Project.aggregate([
      { $match: filter },
      ...getPrioritySort(order), // Uses effectivePriority (0 → bottom)
      { $skip: skip },
      { $limit: pageSize },
      { $project: { __v: 0 } },
    ]);

    const total = await Project.countDocuments(filter);

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
// CREATE & UPDATE (No change needed here)
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
      priority,
    } = req.body;

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

    const mainUpload = await uploadToFtp(
      req.files.image[0].buffer,
      req.files.image[0].originalname,
      projectFolder,
    );
    const bannerUpload = await uploadToFtp(
      req.files.banner[0].buffer,
      req.files.banner[0].originalname,
      projectFolder,
    );

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
      priority: parseInt(priority) || 0, // 0 = no priority
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

exports.updateProject = async (req, res) => {
  try {
    const existing = await Project.findOne({ projectId: req.params.projectId });
    if (!existing)
      return sendResponse(res, 404, false, null, "Project not found");

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
      "priority",
    ];

    fields.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] =
          key === "priority"
            ? parseInt(req.body[key]) || 0
            : typeof req.body[key] === "string"
              ? req.body[key].trim()
              : req.body[key];
      }
    });

    const projectFolder = `rippotai_projects/${existing.slug}`;

    if (req.files?.image?.[0]) {
      const upload = await uploadToFtp(
        req.files.image[0].buffer,
        req.files.image[0].originalname,
        projectFolder,
      );
      updateData.image = upload.url;
    }

    if (req.files?.banner?.[0]) {
      const upload = await uploadToFtp(
        req.files.banner[0].buffer,
        req.files.banner[0].originalname,
        projectFolder,
      );
      updateData.banner = upload.url;
    }

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

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { priority: parseInt(priority) || 0 },
      { new: true, runValidators: true },
    ).lean();

    if (!project)
      return sendResponse(res, 404, false, null, "Project not found");

    sendResponse(
      res,
      200,
      true,
      transformProject(project),
      "Priority updated successfully",
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, error.message);
  }
};

exports.toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project)
      return sendResponse(res, 404, false, null, "Project not found");

    project.featured = !project.featured;
    await project.save();

    sendResponse(
      res,
      200,
      true,
      transformProject(project.toObject()),
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
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { featured: !!featured },
      { new: true, runValidators: true },
    ).lean();

    if (!project)
      return sendResponse(res, 404, false, null, "Project not found");

    sendResponse(
      res,
      200,
      true,
      transformProject(project),
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

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { status },
      { new: true, runValidators: true },
    ).lean();

    if (!project)
      return sendResponse(res, 404, false, null, "Project not found");

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

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      projectId: req.params.projectId,
    });
    if (!project)
      return sendResponse(res, 404, false, null, "Project not found");

    sendResponse(res, 200, true, null, "Project deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Server error");
  }
};

// ────────────────────────────────────────────────
// OTHER LIST ENDPOINTS (Consistent priority sorting)
// ────────────────────────────────────────────────

exports.getFeaturedProjects = async (req, res) => {
  try {
    const { limit = "6" } = req.query;
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

    const projects = await Project.aggregate([
      { $match: { featured: true } },
      ...getPrioritySort("asc"),
      { $limit: limitNum },
      {
        $project: {
          title: 1,
          slug: 1,
          category: 1,
          location: 1,
          scope: 1,
          image: 1,
          banner: 1,
          images: 1,
          status: 1,
          createdAt: 1,
          projectId: 1,
          featured: 1,
          priority: 1,
        },
      },
    ]);

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Failed to fetch featured projects");
  }
};

exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      { $match: { status: "completed" } },
      ...getPrioritySort("asc"),
      {
        $project: { __v: 0 },
      },
    ]);

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching completed projects");
  }
};

exports.getProjectsByLocation = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $match: {
          location: req.params.location?.trim(),
          status: { $in: ["working", "completed"] },
        },
      },
      ...getPrioritySort("asc"),
      { $project: { __v: 0 } },
    ]);

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching projects by location");
  }
};

exports.getDraftProjects = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      { $match: { status: "draft" } },
      ...getPrioritySort("asc"),
      { $project: { __v: 0 } },
    ]);

    sendResponse(res, 200, true, projects.map(transformProject));
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, null, "Error fetching draft projects");
  }
};

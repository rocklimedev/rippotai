const Project = require("../models/project");

/**
 * GET /projects
 * Query params:
 *  - category
 *  - status
 */
exports.getAllProjects = async (req, res, next) => {
  try {
    const { category, status } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    // Sort alphabetically by title (A to Z)
    const projects = await Project.find(filter).sort({ title: 1 });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
/**
 * GET /projects/public
 * FAST listing API (frontend)
 */
exports.getPublicProjects = async (req, res, next) => {
  try {
    const {
      category,
      page = 1,
      limit = 6, // <= CRITICAL
    } = req.query;

    const filter = {
      status: { $in: ["working", "completed"] },
    };

    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select("title slug category location scope image status createdAt") // 🚀 NO details, NO images[]
      .lean(); // 🚀 BIG performance win

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      data: projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /projects/:slug
 * (PUBLIC – slug based)
 */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /projects
 */
exports.createProject = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      details,
      images,
      status,
      location,
      scope,
    } = req.body;

    const image = req.file ? req.file.path : req.body.image;

    const project = new Project({
      title,
      category,
      description,
      details,
      image,
      images,
      status,
      location,
      scope,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};
// In your controller
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
/**
 * PUT /projects/:id
 * (ADMIN – ID based)
 */
exports.updateProject = async (req, res, next) => {
  try {
    const updateData = {};

    if (req.body.title) updateData.title = req.body.title;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.details) updateData.details = req.body.details;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.location) updateData.location = req.body.location;
    if (req.body.scope) updateData.scope = req.body.scope;

    if (req.file) {
      updateData.image = req.file.path; // single main image
    }

    // Gallery logic
    let finalImages = [];

    // 1. Start with kept existing images
    if (req.body.existingImages) {
      try {
        const kept = JSON.parse(req.body.existingImages);
        if (Array.isArray(kept)) finalImages = [...kept];
      } catch (e) {
        console.error("Invalid existingImages JSON");
      }
    }

    // 2. Append any newly uploaded files
    if (req.files && req.files.images) {
      const newPaths = req.files.images.map((f) => f.path);
      finalImages = [...finalImages, ...newPaths];
    }

    if (finalImages.length > 0) {
      updateData.images = finalImages;
    } else if (req.body.existingImages === "[]") {
      updateData.images = []; // explicitly clear if user removed everything
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /projects/:id
 * (ADMIN – ID based)
 */
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /projects/completed
 */
exports.getCompletedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ status: "completed" }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /projects/:id/status
 * (ADMIN – ID based)
 */
exports.updateProjectStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project status updated",
      project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /projects/location/:location
 */
exports.getProjectsByLocation = async (req, res, next) => {
  try {
    const { location } = req.params;

    const projects = await Project.find({ location }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /projects/drafts
 */
exports.getDraftProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ status: "draft" }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

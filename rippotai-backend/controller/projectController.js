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

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
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
    const project = await Project.findOne({ slug: req.params.slug });

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

/**
 * PUT /projects/:id
 * (ADMIN – ID based)
 */
exports.updateProject = async (req, res, next) => {
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

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        details,
        image,
        images,
        status,
        location,
        scope,
      },
      { new: true, runValidators: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
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

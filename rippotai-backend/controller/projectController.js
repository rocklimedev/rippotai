const Project = require("../models/project");

exports.getAllProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

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

exports.createProject = async (req, res, next) => {
  try {
    const { title, category, description, details, images } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Handle single image upload
    const project = new Project({
      title,
      category,
      description,
      details,
      image,
      images,
    });
    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { title, category, description, details, images } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { title, category, description, details, image, images },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

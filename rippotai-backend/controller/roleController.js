// controllers/roleController.js
const Role = require("../models/roles");
const User = require("../models/user"); // for optional user count

/**
 * @desc Get all roles
 * @route GET /api/roles
 * @access Private (Admin)
 */
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ name: 1 });

    // Optional: add user count per role
    const rolesWithCount = await Promise.all(
      roles.map(async (role) => {
        const userCount = await User.countDocuments({ roles: role.name });
        return {
          ...role._doc,
          userCount,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: roles.length,
      data: rolesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Get single role by ID
 * @route GET /api/roles/:id
 * @access Private (Admin)
 */
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // Optional: user count
    const userCount = await User.countDocuments({ roles: role.name });

    res.status(200).json({
      success: true,
      data: { ...role._doc, userCount },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Create new role
 * @route POST /api/roles
 * @access Private (Admin)
 */
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Role name is required",
      });
    }

    // Validate name is unique (already handled by schema unique: true, but explicit check)
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: "Role name already exists",
      });
    }

    const role = await Role.create({
      name,
      description: description || "",
      permissions: permissions || [],
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Role name must be unique",
      });
    }
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Update role
 * @route PUT /api/roles/:id
 * @access Private (Admin)
 */
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // If name is changed → check uniqueness
    if (name && name !== role.name) {
      const existing = await Role.findOne({ name });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Role name already exists",
        });
      }
      role.name = name;
    }

    if (description !== undefined) role.description = description;
    if (permissions) role.permissions = permissions;

    await role.save();

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Delete role
 * @route DELETE /api/roles/:id
 * @access Private (Admin)
 */
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // Optional: Check if any users have this role
    const usersWithRole = await User.countDocuments({ roles: role.name });
    if (usersWithRole > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete role. ${usersWithRole} user(s) are assigned to it.`,
      });
    }

    await Role.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Get all available permissions (static list)
 * @route GET /api/roles/permissions
 * @access Private (Admin)
 */
exports.getAvailablePermissions = async (req, res) => {
  const permissions = [
    "manage_users",
    "manage_roles",
    "manage_projects",
    "manage_queries",
    "manage_jobs",
    "view_dashboard",
    // Add more as needed
  ];

  res.status(200).json({
    success: true,
    data: permissions,
  });
};

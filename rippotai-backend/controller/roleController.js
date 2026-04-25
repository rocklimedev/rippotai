const { Role, User, Sequelize } = require("../models");
const { Op } = Sequelize;

/**
 * @desc Get all roles
 * @route GET /api/roles
 */
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      order: [["name", "ASC"]],
    });

    // ✅ Add user count per role
    const rolesWithCount = await Promise.all(
      roles.map(async (role) => {
        const userCount = await User.count({
          where: {
            roles: {
              [Op.like]: `%${role.name}%`, // ⚠️ JSON workaround
            },
          },
        });

        return {
          ...role.toJSON(),
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
 */
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    const userCount = await User.count({
      where: {
        roles: {
          [Op.like]: `%${role.name}%`,
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        ...role.toJSON(),
        userCount,
      },
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

    // ✅ Check uniqueness
    const existingRole = await Role.findOne({
      where: { name },
    });

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
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Role name must be unique",
      });
    }

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
 */
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // ✅ Check unique name if changed
    if (name && name !== role.name) {
      const existing = await Role.findOne({
        where: { name },
      });

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
 */
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // ✅ Check if users assigned
    const usersWithRole = await User.count({
      where: {
        roles: {
          [Op.like]: `%${role.name}%`,
        },
      },
    });

    if (usersWithRole > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete role. ${usersWithRole} user(s) are assigned to it.`,
      });
    }

    await role.destroy();

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
 * @desc Get all available permissions
 * @route GET /api/roles/permissions
 */
exports.getAvailablePermissions = async (req, res) => {
  const permissions = [
    "manage_users",
    "manage_roles",
    "manage_projects",
    "manage_queries",
    "manage_jobs",
    "view_dashboard",
  ];

  res.status(200).json({
    success: true,
    data: permissions,
  });
};

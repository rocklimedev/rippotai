const { User, Role, Sequelize } = require("../models");
const { Op } = Sequelize;

/**
 * @desc Get all users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: users,
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
 * @desc Get single user
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
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
 * @desc Create user
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Find role
    let roleData;

    if (role) {
      roleData = await Role.findOne({
        where: { name: role },
      });
    }

    if (!roleData) {
      roleData = await Role.findOne({
        where: { name: "Employee" },
      });
    }

    if (!roleData) {
      return res.status(400).json({
        success: false,
        message: "Role not found",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      roleId: roleData.id,
    });

    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
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
 * @desc Update user
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof isActive === "boolean") user.isActive = isActive;

    // ✅ Update role
    if (role) {
      const roleData = await Role.findOne({
        where: { name: role },
      });

      if (!roleData) {
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
      }

      user.roleId = roleData.id;
    }

    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
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
 * @desc Delete user
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
 * @desc Assign role (single)
 */
exports.assignRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const roleData = await Role.findOne({
      where: { name: role },
    });

    if (!roleData) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.roleId = roleData.id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

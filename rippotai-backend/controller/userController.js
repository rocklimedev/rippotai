const User = require("../models/user");
const Role = require("../models/roles");

/**
 * @desc Get all users
 * @route GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * @desc Get single user by ID
 * @route GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * @desc Create new user
 * @route POST /api/users
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    // Ensure roles exist in Role collection
    if (roles && roles.length > 0) {
      const validRoles = await Role.find({ name: { $in: roles } });
      if (validRoles.length !== roles.length) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid roles provided" });
      }
    }

    const user = await User.create({ name, email, password, roles });
    res
      .status(201)
      .json({ success: true, data: { ...user._doc, password: undefined } });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * @desc Update user by ID
 * @route PUT /api/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, roles, isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (roles) user.roles = roles;
    if (typeof isActive === "boolean") user.isActive = isActive;

    await user.save();
    res
      .status(200)
      .json({ success: true, data: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * @desc Delete user
 * @route DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * @desc Assign roles to a user
 * @route PATCH /api/users/:id/roles
 */
exports.assignRoles = async (req, res) => {
  try {
    const { roles } = req.body;
    if (!roles || roles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No roles provided" });
    }

    const validRoles = await Role.find({ name: { $in: roles } });
    if (validRoles.length !== roles.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid roles provided" });
    }

    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.roles = roles;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Roles updated", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

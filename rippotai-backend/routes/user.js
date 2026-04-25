const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignRole,
} = require("../controller/userController"); // Path to your controller file

// @route   GET /api/users
// @desc    Get all users
router.get("/", getAllUsers);

// @route   GET /api/users/:id
// @desc    Get single user by ID
router.get("/:id", getUserById);

// @route   POST /api/users
// @desc    Create new user
router.post("/", createUser);

// @route   PUT /api/users/:id
// @desc    Update user by ID
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
router.delete("/:id", deleteUser);

// @route   PATCH /api/users/:id/roles
// @desc    Assign roles to a user
router.patch("/:id/roles", assignRole);

module.exports = router;

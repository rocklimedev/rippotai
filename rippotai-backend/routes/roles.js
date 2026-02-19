const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getAvailablePermissions,
} = require("../controller/roleController");

// Protect these routes with admin middleware if needed
router.get("/", getAllRoles);
router.get("/permissions", getAvailablePermissions);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;

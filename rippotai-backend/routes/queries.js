const express = require("express");
const router = express.Router();

const {
  createQuery,
  getQueries,
  getQuery,
  updateQuery,
  deleteQuery,
  addNote,
} = require("../controller/queriesController");

// Query Routes
router.post("/", createQuery);
router.get("/", getQueries);
router.get("/:id", getQuery);
router.put("/:id", updateQuery);
router.delete("/:id", deleteQuery);
router.post("/:id/notes", addNote);

module.exports = router;

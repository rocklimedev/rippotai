const express = require("express");
const router = express.Router();

const {
  createQuery,
  getQueries,
  getQuery,
  updateQuery,
  deleteQuery,
  addNote,
} = require("../controller/queriesController"); // Path to query controller

// Query Routes
router.post("/", createQuery); // POST /api/queries - Create new query
router.get("/", getQueries); // GET /api/queries - Get all queries
router.get("/:id", getQuery); // GET /api/queries/:id - Get single query by ID
router.put("/:id", updateQuery); // PUT /api/queries/:id - Update query by ID
router.delete("/:id", deleteQuery); // DELETE /api/queries/:id - Delete query by ID
router.post("/:id/notes", addNote); // POST /api/queries/:id/notes - Add note to a query

module.exports = router;

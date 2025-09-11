const express = require("express");
const router = express.Router();
const QueriesController = require("../controller/queriesController");

router.post("/", QueriesController.createQuery);
router.get("/", QueriesController.getQueries);

module.exports = router;

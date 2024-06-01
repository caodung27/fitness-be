const express = require("express");
const { recordPath, getAllPaths, getPathHistory, searchPathsByLocation, searchPathsBySpeed, searchPathsByDateTime } = require("../controllers/Path");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// Record a new path
router.post("/create", recordPath);

// Get path
router.get("/", getAllPaths);
router.get("/:userId/", getPathHistory);

// Search paths
router.get("/search/date-time", searchPathsByDateTime);
router.get("/search/location", searchPathsByLocation);
router.get("/search/speed", searchPathsBySpeed);

module.exports = router;

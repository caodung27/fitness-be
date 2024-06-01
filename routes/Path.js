const express = require("express");
const { recordPath, getPathHistory, searchPathsByLocation, searchPathsBySpeed, searchPathsByDateTime } = require("../controllers/Path");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// Record a new path
router.post("/create", recordPath);

// Get path history
router.get("/", getPathHistory);

// Search paths
router.get("/search/date-time", searchPathsByDateTime);
router.get("/search/location", searchPathsByLocation);
router.get("/search/speed", searchPathsBySpeed);

module.exports = router;

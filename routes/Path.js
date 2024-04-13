const express = require("express");
const { recordPath, getPathHistory, searchPathsByLocation, searchPathsBySpeed, searchPathsByDateTime } = require("../controllers/Path");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// Record a new path
router.post("/create", verifyToken, recordPath);

// Get path history
router.get("/", verifyToken, getPathHistory);

// Search paths
router.get("/search/date-time", verifyToken, searchPathsByDateTime);
router.get("/search/location", verifyToken, searchPathsByLocation);
router.get("/search/speed", verifyToken, searchPathsBySpeed);

module.exports = router;

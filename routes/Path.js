const express = require("express");
const { recordPath, getPathHistory, searchPathsByLocation, searchPathsBySpeed, searchPathsByDateTime } = require("../controllers/Path");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// Record a new path
router.post("/:userId/create", verifyToken, recordPath);

// Get path history
router.get("/:userId", verifyToken, getPathHistory);

// Search paths
router.get("/:userId/search/date-time", verifyToken, searchPathsByDateTime);
router.get("/:userId/search/location", verifyToken, searchPathsByLocation);
router.get("/:userId/search/speed", verifyToken, searchPathsBySpeed);

module.exports = router;

const express = require("express");
const {
  recordPath,
  getAllPaths,
  searchPathsByLocation,
  searchPathsBySpeed,
  searchPathsByDateTime,
  getPathById,
} = require("../controllers/Path");
const { updatePathById, deletePathById } = require("../controllers/Path");
const router = express.Router();

// Record a new path
router.post("/:userId/create", recordPath);

// Get path
router.get("/:userId/", getAllPaths);
router.get("/:userId/:id", getPathById);

// Search paths
router.get("/:userId/search/date-time", searchPathsByDateTime);
router.get("/:userId/search/location", searchPathsByLocation);
router.get("/:userId/search/speed", searchPathsBySpeed);

router.put("/:userId/:id", updatePathById);
router.delete("/:userId/:id", deletePathById);

module.exports = router;

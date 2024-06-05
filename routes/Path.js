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
router.get("/", getAllPaths);
router.get("/:id", getPathById);

// Search paths
router.get("/search/date-time", searchPathsByDateTime);
router.get("/search/location", searchPathsByLocation);
router.get("/search/speed", searchPathsBySpeed);

router.put("/:id", updatePathById);
router.delete("/:id", deletePathById);

module.exports = router;

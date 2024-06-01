const express = require("express");
const {
  recordPath,
  getAllPaths,
  getPathHistory,
  searchPathsByLocation,
  searchPathsBySpeed,
  searchPathsByDateTime,
  searchPathsByFilter,
} = require("../controllers/Path");
const { updatePathById, deletePathById } = require("../controllers/Path");

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
router.get("/search/filter", searchPathsByFilter);

router.put("/:id", updatePathById);
router.delete("/:id", deletePathById);

module.exports = router;

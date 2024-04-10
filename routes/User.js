const express = require("express");
const { getAllUsers, getUserById, updateUser, deleteUserById } = require("./../controllers/User.js");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);

module.exports = router;

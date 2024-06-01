const express = require("express");
const { getAllUsers, getUserById, updateUser, deleteUserById, searchUsers } = require("./../controllers/User.js");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);
router.get('/users/search', searchUsers);

module.exports = router;

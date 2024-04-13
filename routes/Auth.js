const express = require("express");
const { login, register } = require('./../controllers/Auth.js');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;

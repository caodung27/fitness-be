const express = require("express");
const { createComment, getCommentsByPostId, getCommentById, updateComment, deleteComment } = require("../controllers/commentController");

const router = express.Router();

router.post("/", createComment);
router.get("/post/:post_id", getCommentsByPostId);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;

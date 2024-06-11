const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
} = require("../controllers/Post");

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Route để tạo comment cho bài đăng
router.post("/:id/comments", createComment);

module.exports = router;

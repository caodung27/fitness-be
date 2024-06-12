const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUserId,
  createComment,
  getCommentsByPostId,
  updateCommentsForPost,
  createCommentProfile,
  getCommentsByProfile,
} = require("../controllers/Post");

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostsByUserId);

router.post("user/:userId/comments/create", createComment);
router.get("/user/:userId/comments", getCommentsByProfile);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:id/comments/create", createComment);
router.get("/:id/comments", getCommentsByPostId);
router.put("/:id/comments/update", updateCommentsForPost);

module.exports = router;

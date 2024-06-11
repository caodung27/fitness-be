const Comment = require("../models/Comment");

// Tạo bình luận mới
exports.createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment, reactions } = req.body;
    const newComment = new Comment({
      post_id,
      user_id,
      comment,
      reactions
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả các bình luận cho một bài đăng
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.post_id })
      .populate("user_id")
      .populate("post_id");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy bình luận theo ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user_id")
      .populate("post_id");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật bình luận
exports.updateComment = async (req, res) => {
  try {
    const { comment, reactions } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { comment, reactions },
      { new: true }
    )
      .populate("user_id")
      .populate("post_id");
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa bình luận
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

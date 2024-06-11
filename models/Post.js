const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reactionType: {
    type: String,
    required: true,
    enum: ["like", "dislike"], // Nếu chỉ có 2 loại reaction là like và dislike
  },
});

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Mảng các reactions cho comment
}, { timestamps: true });

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: [commentSchema], // Mảng các bình luận cho bài đăng
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

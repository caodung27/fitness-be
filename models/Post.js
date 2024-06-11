const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensure user is required
  },
  reactionType: {
    type: String,
    required: true,
    enum: ["like", "dislike"], // Example enum for reaction types
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
  reactions: [reactionSchema],
}, { timestamps: true });

const postSchema = new mongoose.Schema({
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
  comments: [commentSchema],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

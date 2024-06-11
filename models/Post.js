const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reactionType: { type: String, required: true }
});

const commentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  reactions: [reactionSchema],
  username: { type: String },
  avatarUrl: { type: String },
});

const postSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  mediaUrl: { type: String },
  likes: { type: Object, default: {} },
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

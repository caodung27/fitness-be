const Post = require("../models/Post");

// Tạo một bài đăng mới
exports.createPost = async (req, res) => {
  try {
    const { user_id, description, mediaUrl } = req.body;
    const newPost = new Post({
      user_id,
      description,
      mediaUrl,
      likes: {},
      comments: []  // Khởi tạo mảng comments rỗng
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả các bài đăng
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user_id");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user_id");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
  try {
    const { description, mediaUrl, likes } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { description, mediaUrl, likes },
      { new: true }
    ).populate("user_id");
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa bài đăng
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo comment cho một bài đăng
exports.createComment = async (req, res) => {
  const { userId, commentText, reactions } = req.body;
  const postId = req.params.id; // Lấy postId từ URL param

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Tìm thông tin của user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newComment = new Comment({
      user: user, // Sử dụng đối tượng user thay vì chỉ userId
      comment: commentText,
      reactions: reactions || [],
    });

    await newComment.save();

    post.comments.push(newComment);
    await post.save();

    // Populate lại thông tin người dùng và các phản ứng trong comment
    await newComment.populate("user reactions.user").execPopulate();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả các comment của một bài đăng
exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate("user reactions.user");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Cập nhật các comment của một bài đăng
exports.updateCommentsForPost = async (req, res) => {
  const { comments } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { comments },
      { new: true }
    ).populate("comments.user reactions.user");

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Populate lại thông tin người dùng và các phản ứng trong mỗi bình luận
    await updatedPost.populate("comments.user reactions.user").execPopulate();

    res.status(200).json(updatedPost.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const { user_id, comment, reactions } = req.body;
    const postId = req.params.id;
  
    if (!user_id || !comment) {
      return res.status(400).json({ error: "user_id and comment are required fields" });
    }
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const newComment = {
        user_id,
        comment,
        reactions: reactions || [], // reactions có thể không được cung cấp
      };
  
      post.comments.push(newComment);
      const updatedPost = await post.save();
  
      res.status(201).json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Lấy tất cả các comment của một bài đăng
exports.getCommentsByPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user_id");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comments = post.comments;
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
    ).populate("comments.user_id");
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

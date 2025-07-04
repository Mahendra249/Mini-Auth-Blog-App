const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Post = require("../models/post");
const User = require("../models/user");

// GET all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// GET single post

router.get("/getsinglepost:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({
      message: "Post fetched successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// CREATE post

router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE post

router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user.id &&
      !["admin", "superadmin"].includes(req.user.role)
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: Not allowed to edit this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE post

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user.id &&
      !["admin", "superadmin"].includes(req.user.role)
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: Not allowed to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;

import React, { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Plus,
  User,
  Calendar,
  Eye,
  Save,
  X,
} from "lucide-react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      content:
        "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.",
      author: "John Doe",
      date: "2024-01-15",
      status: "published",
      views: 1250,
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      content:
        "Modern CSS offers incredible capabilities for creating stunning layouts and animations. From Grid to Flexbox, these tools revolutionize web design.",
      author: "Jane Smith",
      date: "2024-01-10",
      status: "draft",
      views: 890,
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      content:
        "ES6 introduced many powerful features that make JavaScript more expressive and easier to work with. Arrow functions, destructuring, and modules are game-changers.",
      author: "Mike Johnson",
      date: "2024-01-05",
      status: "published",
      views: 2100,
    },
  ]);

  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    role: "admin", // Can be: "admin", "editor", "author", "viewer"
  });

  const [editingPost, setEditingPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Permission checks
  const canCreate = () =>
    ["admin", "editor", "author"].includes(currentUser.role);
  const canEdit = (post) => {
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "editor") return true;
    if (currentUser.role === "author" && post.author === currentUser.name)
      return true;
    return false;
  };
  const canDelete = (post) => {
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "editor") return true;
    if (currentUser.role === "author" && post.author === currentUser.name)
      return true;
    return false;
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) => {
      if (filter === "all") return true;
      if (filter === "published") return post.status === "published";
      if (filter === "draft") return post.status === "draft";
      if (filter === "my-posts") return post.author === currentUser.name;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "views") return b.views - a.views;
      return 0;
    });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: currentUser.name,
      date: new Date().toISOString().split("T")[0],
      status: newPost.status,
      views: 0,
    };

    setPosts([...posts, post]);
    setNewPost({ title: "", content: "", status: "draft" });
    setShowCreateForm(false);
  };

  const handleEditPost = (post) => {
    setEditingPost({ ...post });
  };

  const handleUpdatePost = () => {
    setPosts(
      posts.map((post) => (post.id === editingPost.id ? editingPost : post))
    );
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const switchUser = (role) => {
    setCurrentUser({ ...currentUser, role });
    setEditingPost(null);
    setShowCreateForm(false);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <Navbar/>

      <div className="main-content">
        {/* Controls */}
        <div className="controls">
          <div className="filters">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="my-posts">My Posts</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>

          {canCreate() && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="create-btn"
            >
              <Plus size={16} />
              Create Post
            </button>
          )}
        </div>

        {/* Create Post Form */}
        {showCreateForm && (
          <div className="create-form">
            <h3 className="form-title">Create New Post</h3>

            <div className="form-group">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Post Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows={6}
                className="form-textarea"
              />
            </div>

            <div className="form-actions">
              <select
                value={newPost.status}
                onChange={(e) =>
                  setNewPost({ ...newPost, status: e.target.value })
                }
                className="status-select"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <button onClick={handleCreatePost} className="btn btn-success">
                Create Post
              </button>

              <button
                onClick={() => setShowCreateForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              {editingPost && editingPost.id === post.id ? (
                // Edit Form
                <div className="edit-form">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    className="edit-title"
                  />

                  <textarea
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.target.value,
                      })
                    }
                    rows={4}
                    className="edit-content"
                  />

                  <div className="edit-status">
                    <select
                      value={editingPost.status}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          status: e.target.value,
                        })
                      }
                      className="edit-status-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="edit-actions">
                    <button
                      onClick={handleUpdatePost}
                      className="btn btn-success btn-sm"
                    >
                      <Save size={16} />
                      Save
                    </button>

                    <button
                      onClick={() => setEditingPost(null)}
                      className="btn btn-secondary btn-sm"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Post
                <>
                  <div className="post-content">
                    <div className="post-header">
                      <h3 className="post-title">{post.title}</h3>
                      <span className={`status-badge status-${post.status}`}>
                        {post.status}
                      </span>
                    </div>

                    <p className="post-excerpt">
                      {post.content.substring(0, 150)}...
                    </p>

                    <div className="post-meta">
                      <span className="meta-item">
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className="meta-item">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="meta-item">
                        <Eye size={14} />
                        {post.views}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {(canEdit(post) || canDelete(post)) && (
                    <div className="post-actions">
                      {canEdit(post) && (
                        <button
                          onClick={() => handleEditPost(post)}
                          className="btn btn-primary btn-sm"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                      )}

                      {canDelete(post) && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <h3>No posts found</h3>
            <p>Try adjusting your filters or create a new post.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

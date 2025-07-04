import { useEffect, useState } from "react";
import axios from "../utils/axios";
import PostCard from "../components/PostCard/PostCard";
import Navbar from "../components/Navbar/Navbar";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts/getallpost");
      setPosts(res.data.posts);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/posts/createpost", { title, content });
      setTitle("");
      setContent("");
      setMsg("Post created successfully!");
      fetchPosts(); // refresh list
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="w-full mb-3 p-2 border rounded"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Create Post
          </button>
        </form>
        {msg && <p className="mt-3 text-green-600">{msg}</p>}

        <h2 className="text-xl font-bold mt-10 mb-4">All Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

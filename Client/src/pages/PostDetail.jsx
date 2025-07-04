import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Navbar from "../components/Navbar/Navbar";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [msg, setMsg] = useState("");

  // for edit
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/getsinglepost${id}`);
      setPost(res.data.post);
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to load post");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/updatepost${id}`, { title, content });
      setMsg("Post updated successfully");
      setEditMode(false);
      fetchPost();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update post");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/deletepost${id}`);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete post");
    }
  };

  if (!post) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <Navbar/>
      <div className="max-w-2xl mx-auto p-4">
        {editMode ? (
          <>
            <input
              type="text"
              className="w-full mb-3 p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full mb-3 p-2 border rounded"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              onClick={handleUpdate}
              className="mr-2 p-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="p-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">
              By {post.author?.name} | {post.author?.email}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setEditMode(true)}
                className="p-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {msg && <p className="mt-3 text-green-600">{msg}</p>}
      </div>
    </div>
  );
}

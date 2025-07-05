import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../api/ClientFunction";
import Navbar from "../components/Navbar/Navbar";

const NewPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await postData("/posts", formData);
    if (response?.success) {
      toast.success(response.message || "Post created successfully");
      navigate("/posts"); // adjust route
    } else {
      toast.error(response?.message || "Failed to create post");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-8">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Create New Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Tagline</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows={1}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Select Category</option>
                <option value="React">React</option>
                <option value="Tech">Tech</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Movies">Movies</option>
                <option value="Knowledge">Knowledge</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Jobs">Jobs</option>
                <option value="Govt">Govt.</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPost;

import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard/PostCard";
import useSWR from "swr";
import { fetchData } from "../api/ClientFunction";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";


const BlogPostsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useSWR("/posts", fetchData);

  if (isLoading) return <p className="text-center py-10">Loading posts...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load posts.</p>
    );

  const posts = data?.posts || [];
  console.log(posts)

  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover insights, tutorials, and the latest trends in web
              development, design, and technology.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Latest Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest blog posts delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white outline-none"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostsPage;

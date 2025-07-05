import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  BookOpen,
  Eye,
  Tag,
  Coffee,
} from "lucide-react";
import "../styles/PostDetails.css";
import useSWR from "swr";
import { fetchData } from "../api/ClientFunction";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  const { id } = useParams();

  console.log("Post ID from URL:", id);

  const { data, isLoading } = useSWR(`/posts/getsinglepost/${id}`, fetchData);


  const error = null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data?.post?.content) {
      const wordsPerMinute = 200;
      const wordCount = data.post.content.split(" ").length;
      const readTime = Math.ceil(wordCount / wordsPerMinute);
      setEstimatedReadTime(readTime);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="error-container bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 mb-6">
            Failed to load the blog post. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const post = data?.post;

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="not-found-container bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
        <div className="floating-elements"></div>

        {/* Reading Progress Bar */}
        <div
          className="progress-bar"
          style={{ width: `${readingProgress}%` }}
        ></div>

        {/* Back Button */}
        <div className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.history.back()}
            className="glass-effect text-gray-700 p-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Blog</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="post-container">
            {/* Header Section */}
            <header className="text-center mb-12">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold hero-gradient mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">{post.author?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>{estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-indigo-600" />
                  <span>Easy read</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`action-btn like-btn flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                    isLiked
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 bg-white text-gray-600 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="hidden sm:inline">
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="action-btn flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button className="action-btn flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-gray-600 hover:border-green-500 hover:text-green-600 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Comment</span>
                </button>
              </div>
            </header>

            {/* Content Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <div className="content-section text-lg leading-relaxed text-gray-700">
                {post.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-justify">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">About the Author</h3>
                  <p className="text-lg font-medium mb-1">
                    {post.author?.name}
                  </p>
                  <p className="text-indigo-100">{post.author?.email}</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-gray-600 mb-6">
                Share it with your network and help others discover great
                content!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleShare}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Article
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Floating Reading Progress */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="floating-action-btn bg-indigo-600 text-white p-3 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {Math.round(readingProgress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

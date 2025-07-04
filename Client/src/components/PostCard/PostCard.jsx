import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
      <div className="mt-2 text-sm text-gray-500">
        By {post.author?.name} | {post.author?.email}
      </div>
      <Link
        to={`/posts/${post._id}`}
        className="inline-block mt-3 text-blue-500"
      >
        Read More
      </Link>
    </div>
  );
}

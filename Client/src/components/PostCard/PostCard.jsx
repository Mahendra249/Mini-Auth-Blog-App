import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const PostMeta = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-1 text-gray-500 text-sm">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const categoryImages = [
  {
    category: "React",
    image:
      "https://images.unsplash.com/photo-1581090700227-4c4e7c78f6f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1581091012184-4a6b8e26e31c?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1617814081092-2aeb2cd45e1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Movies",
    image:
      "https://images.unsplash.com/photo-1604081674697-99598a2b2d8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Knowledge",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1597764699510-679f2e54416e?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Jobs",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c443b59?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Govt",
    image:
      "https://images.unsplash.com/photo-1581092780085-5be9dcfa4d6a?auto=format&fit=crop&w=800&q=80",
  },
];

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  // get image based on category
  const categoryData = categoryImages.find(
    (item) => item.category.toLowerCase() === post.category?.toLowerCase()
  );
  const imageUrl =
    categoryData?.image ||
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop"; // fallback

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <PostMeta icon={User} text={post.author?.name} />
          <PostMeta
            icon={Calendar}
            text={new Date(post.date).toLocaleDateString()}
          />
        </div>
        <h3
          onClick={() => navigate(`/post/${post._id}`)}
          className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <button
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

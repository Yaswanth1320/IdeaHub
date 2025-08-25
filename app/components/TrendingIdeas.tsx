import { useState } from "react";
import {
  FiHeart,
  FiThumbsDown,
  FiMessageCircle,
  FiBookmark,
} from "react-icons/fi";

type Idea = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  likes: number;
  dislikes: number;
  comments: number;
};

const dummyIdeas: Idea[] = [
  {
    id: 1,
    user: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=47" },
    time: "2 hours ago",
    title: "AI-Powered Personal Shopping Assistant",
    description:
      "An app that learns your style preferences and budget, then recommends clothing items and creates outfits from various retailers. It could also alert you to sales on items similar to ones you’ve liked before.",
    category: "Technology",
    categoryColor: "bg-blue-100 text-blue-600",
    likes: 124,
    dislikes: 18,
    comments: 32,
  },
  {
    id: 2,
    user: { name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=12" },
    time: "Yesterday",
    title: "Community Composting Network",
    description:
      "A neighborhood-based composting system where residents can drop off food waste at local collection points. The resulting compost would be used in community gardens or distributed back to participants for home gardening.",
    category: "Environment",
    categoryColor: "bg-green-100 text-green-600",
    likes: 89,
    dislikes: 7,
    comments: 15,
  },
  {
    id: 3,
    user: { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=22" },
    time: "3 days ago",
    title: "Skill Exchange Platform for Seniors and Students",
    description:
      "A platform connecting retired professionals with students for mentorship and skill exchange. Seniors can teach career skills while learning new digital skills from younger generations.",
    category: "Education",
    categoryColor: "bg-purple-100 text-purple-600",
    likes: 76,
    dislikes: 5,
    comments: 12,
  },
];

export default function TrendingIdeas() {
  const [ideas] = useState(dummyIdeas);

  return (
    <div className="w-[95%] max-w-6xl mx-auto mt-5">
      <h2 className="text-3xl font-bold mb-2 text-center">Trending Ideas</h2>
      <p className="text-gray-600 mb-6 text-center">
        Discover and engage with the most popular ideas from our community
      </p>

      <div className="space-y-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-6 rounded-2xl shadow-md border border-gray-200 bg-base-100"
          >
            {/* Header: Avatar + Info + Category */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={idea.user.avatar}
                  alt={idea.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{idea.user.name}</h4>
                  <p className="text-sm text-gray-500">Posted {idea.time}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${idea.categoryColor}`}
              >
                {idea.category}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
            <p className="text-gray-600 mb-4">{idea.description}</p>

            {/* Footer: Stats + Save button */}
            <div className="flex items-center justify-between">
              <div className="flex gap-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <FiHeart className="text-red-500" /> {idea.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FiThumbsDown className="text-gray-500" /> {idea.dislikes}
                </span>
                <span className="flex items-center gap-1">
                  <FiMessageCircle className="text-blue-500" /> {idea.comments}
                </span>
              </div>
              <button className="flex items-center gap-1 px-4 py-2 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition">
                <FiBookmark /> Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getMostLikedIdeas } from "@/db/actions";
import { FaTrophy } from "react-icons/fa";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { Loader2 } from "lucide-react";

type Idea = {
  id: number;
  title: string;
  description: string;
  category: string | null; // ✅ allow null
  authorName: string;
  authorEmail: string;
  authorImage: string;
  createdAt: Date;
  likeCount: number;
  dislikeCount: number;
};

const LeaderBoard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const likedIdeas = await getMostLikedIdeas(3); // Only top 3
        setIdeas(likedIdeas);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchIdeas();
  }, []);

  if (loading)
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-2 mt-10">
          <Loader2 className="animate-spin" /> Loading
        </div>
      </div>
    );

  // Podium: middle is #1, left #2, right #3
  const podiumOrder = [1, 0, 2];
  const podiumHeights = [140, 200, 140]; // middle tallest
  const colors = ["bg-orange-400", "bg-yellow-400", "bg-gray-400"];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-[42px] font-bold mb-42 text-center text-gray-800">
        Leaderboard
      </h1>

      <div className="flex justify-center items-end gap-6 mb-16">
        {podiumOrder.map((pos, idx) => {
          const idea = ideas[pos];
          if (!idea) return null;

          // Rank number based on original array position
          const rankNumber = pos === 0 ? 1 : pos === 1 ? 2 : 3;

          return (
            <div
              key={idea.id}
              className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-32 rounded-t-xl ${colors[idx]} shadow-lg relative flex flex-col items-center justify-end`}
                style={{ height: `${podiumHeights[idx]}px` }}
              >
                <div className="absolute -top-8">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={idea.authorImage || "/default-avatar.png"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      alt={idea.authorName}
                    />
                  </div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-bold text-white flex items-center gap-1">
                  <FaTrophy /> #{rankNumber}
                </div>
              </div>

              <div className="text-center mt-4 max-w-xs">
                <h3 className="font-semibold text-lg">{idea.title}</h3>
                {idea.category && (
                  <span className="text-sm text-gray-500">{idea.category}</span>
                )}
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {idea.description}
                </p>
                {idea.createdAt && (
                  <div className="text-gray-400 text-xs mt-1">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </div>
                )}
                <div className="flex justify-center gap-4 mt-2 text-gray-700 text-sm">
                  <div className="flex items-center gap-1">
                    <FiThumbsUp className="text-green-600" />{" "}
                    {idea.likeCount ?? 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiThumbsDown className="text-red-600" />{" "}
                    {idea.dislikeCount ?? 0}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;

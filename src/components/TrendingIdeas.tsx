"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { FaHeart, FaBan, FaFire } from "react-icons/fa";
import { FiHeart, FiSlash, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import {
  getMostLikedIdeas,
  toggleVote,
  addComment,
  getComments,
  deleteComment,
} from "@/db/actions";

// ShadCN AlertDialog imports
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Idea = {
  id: number;
  title: string;
  description: string;
  category?: string;
  categoryColor?: string;
  authorName: string;
  authorEmail: string;
  authorImage?: string;
  likes: number;
  dislikes: number;
  userVote?: number;
};

type Comment = {
  id: number;
  content: string;
  userClerkId: string;
  authorName: string;
  authorEmail: string;
  authorImage?: string;
  createdAt: Date;
};

const categoryColors: Record<string, string> = {
  technology: "from-blue-200 to-blue-100 text-blue-800",
  education: "from-green-200 to-green-100 text-green-800",
  health: "from-red-200 to-red-100 text-red-800",
  environment: "from-teal-200 to-teal-100 text-teal-800",
  business: "from-yellow-200 to-yellow-100 text-yellow-800",
  other: "from-gray-200 to-gray-100 text-gray-800",
};

const sideColors: Record<string, string> = {
  technology: "border-blue-400",
  education: "border-green-400",
  health: "border-red-400",
  environment: "border-teal-400",
  business: "border-yellow-400",
  other: "border-gray-400",
};

const safeImageUrl = (url?: string) => {
  if (!url || url.trim() === "") return "/default-avatar.png";
  try {
    new URL(url);
    return url;
  } catch {
    return "/default-avatar.png";
  }
};

const formatTime = (createdAt: string) => {
  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} h ago`;
  return `${Math.floor(diff / 1440)} d ago`;
};

export default function TrendingIdeas() {
  const { user } = useUser();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchIdeas();
  }, [user]);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const data = await getMostLikedIdeas(10);
      setIdeas(
        data.map((idea: any) => ({
          ...idea,
          likes: idea.likeCount ?? 0,
          dislikes: idea.dislikeCount ?? 0,
          categoryColor: idea.category
            ? categoryColors[idea.category] ?? categoryColors.other
            : categoryColors.other,
          authorImage: safeImageUrl(idea.authorImage),
          userVote: idea.userVote ?? 0,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (ideaId: number, value: 1 | -1) => {
    if (!user) return alert("You must be logged in to vote!");
    await toggleVote(ideaId, user.id, value);
    await fetchIdeas();
  };

  const toggleComments = async (ideaId: number) => {
    if (openComments === ideaId) return setOpenComments(null);
    setOpenComments(ideaId);
    if (!comments[ideaId]) {
      const ideaComments = await getComments(ideaId);
      setComments((prev) => ({
        ...prev,
        [ideaId]: ideaComments.map((c) => ({
          ...c,
          authorImage: safeImageUrl(c.authorImage),
        })),
      }));
    }
  };

  const handleAddComment = async (ideaId: number) => {
    if (!user) return alert("You must be logged in to comment!");
    const content = newComment[ideaId];
    if (!content?.trim()) return;

    const comment = await addComment(
      ideaId,
      user.id,
      content,
      user.fullName || "Anonymous",
      user.primaryEmailAddress?.emailAddress || "hidden@email.com",
      safeImageUrl(user.imageUrl)
    );

    setComments((prev) => ({
      ...prev,
      [ideaId]: [...(prev[ideaId] || []), comment],
    }));
    setNewComment((prev) => ({ ...prev, [ideaId]: "" }));
  };

  const handleDeleteComment = async (ideaId: number, commentId: number) => {
    if (!user) return;
    try {
      await deleteComment(commentId, user.id);
      setComments((prev) => ({
        ...prev,
        [ideaId]: prev[ideaId].filter((c) => c.id !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="max-h-[90vh] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-2 mt-10">
          <Loader2 className="animate-spin" /> Loading
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-4">
        Most Trending Ideas
      </h2>
      <p className="text-gray-600 text-center mb-10">
        See what ideas are trending in our community
      </p>

      <div>
        {ideas.length === 0 && (
          <div className="text-center space-y-4 mt-10">
            <p className="text-gray-500 text-lg">
              No ideas found. Be the first to add one!
            </p>
            <Link
              href="/post"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Post Idea
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`bg-gradient-to-r from-white to-gray-50 p-6 rounded-3xl shadow-lg border-l-4 ${
              sideColors[idea.category || "other"]
            } hover:shadow-2xl hover:scale-[1.01] transition-transform duration-300 relative`}
          >
            {idea.likes >= 15 && (
              <div className="absolute top-2 right-2 flex items-center gap-1 text-red-600 text-sm font-bold">
                <FaFire /> Trending
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={idea.authorImage || "/default-avatar.png"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    alt={idea.authorName}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {idea.authorName}
                  </p>
                  <p className="text-xs text-gray-500">{idea.authorEmail}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${idea.categoryColor}`}
              >
                {idea.category || "No Category"}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
            <p className="text-gray-700 mb-4">{idea.description}</p>

            {/* Votes & Comments (Updated Logic) */}
            <div className="flex items-center gap-6 text-sm mb-3">
              <span
                onClick={() => handleVote(idea.id, 1)}
                className={`flex items-center gap-2 cursor-pointer ${
                  user ? "hover:text-red-500" : "opacity-50 cursor-not-allowed"
                }`}
              >
                {idea.userVote === 1 ? (
                  <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <FiHeart className="w-5 h-5 hover:text-red-500 transition-colors" />
                )}
                {idea.likes}
              </span>

              <span
                onClick={() => handleVote(idea.id, -1)}
                className={`flex items-center gap-2 cursor-pointer ${
                  user ? "hover:text-red-700" : "opacity-50 cursor-not-allowed"
                }`}
              >
                {idea.userVote === -1 ? (
                  <FaBan className="w-5 h-5 text-red-600" />
                ) : (
                  <FiSlash className="w-5 h-5 hover:text-red-600 transition-colors" />
                )}
                {idea.dislikes}
              </span>

              <span
                className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                onClick={() => toggleComments(idea.id)}
              >
                <FiMessageSquare /> Comments
              </span>
            </div>

            {/* Comments Section */}
            {openComments === idea.id && (
              <div className="mt-4 space-y-2">
                {comments[idea.id]?.length ? (
                  comments[idea.id].map((c) => (
                    <div
                      key={c.id}
                      className="flex items-start gap-2 bg-gray-50 p-2 rounded-md relative border border-gray-100"
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={idea.authorImage || "/default-avatar.png"}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          alt={idea.authorName}
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-xs font-semibold text-gray-800 truncate">
                            {c.authorName}
                          </p>
                          <p className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                              {formatTime(c.createdAt.toString())}
                            </span>
                          </p>
                        </div>
                        <p className="text-xs text-gray-700 mt-0.5 break-words">
                          {c.content}
                        </p>
                      </div>
                      {user?.id === c.userClerkId && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="ml-2 text-red-600 hover:text-red-800 transition flex-shrink-0">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Comment?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this comment?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleDeleteComment(idea.id, c.id)
                                }
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs">No comments yet</p>
                )}

                {user && (
                  <div className="flex gap-2 items-center mt-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[idea.id] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [idea.id]: e.target.value,
                        }))
                      }
                      className="flex-1 border px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button
                      onClick={() => handleAddComment(idea.id)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

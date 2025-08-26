"use client";

import React, { useEffect, useState } from "react";
import { FiSend, FiTag, FiEdit } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { createIdea } from "@/db/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const NewPost = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isSignedIn) {
      toast.error("Please log in to post an idea.");
      router.push("/");
    }
  }, [isSignedIn, router]);

  const tags = [
    { value: "technology", label: "Technology", color: "bg-blue-500" },
    { value: "education", label: "Education", color: "bg-green-500" },
    { value: "health", label: "Health", color: "bg-red-500" },
    { value: "environment", label: "Environment", color: "bg-teal-500" },
    { value: "business", label: "Business", color: "bg-yellow-500" },
    { value: "other", label: "Other", color: "bg-gray-500" },
  ];

  const addIdea = async () => {
    if (!title.trim() || !description.trim() || !selectedTag) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to post an idea.");
      return;
    }

    try {
      setLoading(true);
      await createIdea(
        user.id,
        user.fullName ?? "Anonymous",
        user.primaryEmailAddress?.emailAddress ?? "N/A",
        user.imageUrl,
        {
          title,
          description,
          category: selectedTag,
        }
      );
      toast.success("Idea posted successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedTag("");
    } catch (error) {
      console.error("❌ Failed to post idea:", error);
      toast.error("Something went wrong while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gray-50">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FaRegLightbulb className="text-yellow-500 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Share Your Idea
          </h1>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-gray-700">
            <FiEdit className="w-3 h-3 text-blue-500" /> Idea Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. An app that connects students"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-gray-700">
            <MdDescription className="w-3 h-3 text-green-500" /> Description
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your idea and how people can collaborate..."
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-gray-700">
            <FiTag className="w-3 h-3 text-purple-500" /> Select Tag
          </label>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem key={tag.value} value={tag.value}>
                  <span
                    className={`${tag.color} w-3 h-3 rounded-full inline-block mr-2`}
                  />
                  {tag.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={addIdea}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-black text-white font-semibold flex items-center gap-2 shadow-md hover:bg-gray-800 hover:scale-102 transition transform text-sm disabled:opacity-50"
          >
            <FiSend className="w-4 h-4" />
            {loading ? "Posting..." : "Post Idea"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

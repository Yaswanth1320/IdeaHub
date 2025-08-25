"use client";

import React, { useState } from "react";
import { FiSend, FiTag, FiEdit } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const NewPost = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const tags = [
    { value: "technology", label: "Technology", color: "bg-blue-500" },
    { value: "education", label: "Education", color: "bg-green-500" },
    { value: "health", label: "Health", color: "bg-red-500" },
    { value: "environment", label: "Environment", color: "bg-teal-500" },
    { value: "business", label: "Business", color: "bg-yellow-500" },
    { value: "other", label: "Other", color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl bg-white/90 dark:bg-base-100/90 backdrop-blur-md rounded-2xl shadow-lg border border-base-300 p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FaRegLightbulb className="text-primary w-6 h-6" />
          <h1 className="text-2xl font-bold text-base-content tracking-wide">
            Share Your Idea
          </h1>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-base-content/80">
            <FiEdit className="w-3 h-3 text-blue-500" /> Idea Title
          </label>
          <input
            type="text"
            placeholder="e.g. An app that connects students"
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-base-content/80">
            <MdDescription className="w-3 h-3 text-green-500" /> Description
          </label>
          <textarea
            rows={5}
            placeholder="Explain your idea and how people can collaborate..."
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 flex items-center gap-1 text-base-content/80">
            <FiTag className="w-3 h-3 text-purple-500" /> Select Tag
          </label>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem key={tag.value} value={tag.value}>
                  <span
                    className={`${tag.color} w-3 h-3 rounded-full inline-block mr-2`}
                  />{" "}
                  {tag.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition transform text-sm">
            <FiSend className="w-4 h-4" />
            Post Idea
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

"use client";

import React, { useState } from "react";
import { toast } from "sonner";
const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email API or backend

    toast.success("Message sent successfully!");

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Support
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Have questions or need help? Fill out the form below and our team will
        get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-16 text-center text-gray-600">
        <p>
          Or reach us directly at{" "}
          <a
            href="mailto:psybuilds@gmail.com"
            className="text-primary underline"
          >
            psybuilds@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Support;

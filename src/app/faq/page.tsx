"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is IdeaHub?",
      answer:
        "IdeaHub is a community-driven platform designed to help individuals and teams share their creative ideas, collaborate on projects, and support each other's innovations. It's a space where thinkers, builders, and dreamers can come together to spark discussions, get feedback, and bring ideas to life.",
    },
    {
      question: "How do I post an idea?",
      answer:
        "To post an idea, first make sure you are logged in. Navigate to the 'New Idea' page, fill out the required fields including title, description, and optionally a category. You can also attach images or links if needed. Once you submit, your idea will be visible to the community, and others can like, comment, and support it.",
    },
    {
      question: "Can I like or support ideas?",
      answer:
        "Yes! You can like ideas to show appreciation, leave thoughtful comments to provide feedback, and even collaborate directly with the creator. Supporting ideas encourages growth and engagement, and top-liked ideas may even appear on the leaderboard.",
    },
    {
      question: "Is there a limit to the number of ideas I can post?",
      answer:
        "No, there is no limit. You are encouraged to share as many ideas as you want. Quality and consistency are valued, so posting regularly can help you gain visibility in the community and attract collaborators for your projects.",
    },
    {
      question: "How do I collaborate with other users?",
      answer:
        "If an idea excites you, you can connect with its creator directly through the platform. Reach out via comments or direct messaging if available. Collaboration can include brainstorming, sharing resources, or working together to implement the idea. IdeaHub encourages teamwork and networking among members.",
    },
    {
      question: "Is my idea private or public?",
      answer:
        "By default, all ideas posted on IdeaHub are public and visible to the community. This allows for maximum feedback, support, and collaboration. However, you can manage who can interact with your idea and choose to share sensitive details privately with selected collaborators if needed.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 mt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;

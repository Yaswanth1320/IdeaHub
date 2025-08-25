import { FaRegLightbulb, FaRegThumbsUp, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-base-100 to-base-200 text-base-content py-20 px-6 mt-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h1
          className="text-5xl font-extrabold mb-6 tracking-wide"
          style={{ fontFamily: "'Comfortaa', cursive" }}
        >
          About <span className="text-primary">IdeaHub</span>
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed text-base-content/80 mb-12 max-w-3xl mx-auto">
          IdeaHub is a community-driven platform where creativity meets
          collaboration. Share your thoughts, spark discussions, and work
          together to bring ideas to life. Whether you’re a dreamer, a builder,
          or a collaborator, this is your space to express, connect, and grow.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Share Ideas */}
          <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300 border border-base-300">
            <div className="flex items-center gap-3 mb-4">
              <FaRegLightbulb className="text-yellow-500 w-7 h-7" />
              <h3 className="text-xl font-semibold">Share Your Ideas</h3>
            </div>
            <p className="text-base-content/70">
              Post your ideas freely — from quick sparks to big visions. Every
              thought matters and has the power to inspire others.
            </p>
          </div>

          {/* Like & Support */}
          <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300 border border-base-300">
            <div className="flex items-center gap-3 mb-4">
              <FaRegThumbsUp className="text-blue-500 w-7 h-7" />
              <h3 className="text-xl font-semibold">Like & Support</h3>
            </div>
            <p className="text-base-content/70">
              Show support by liking, commenting, or saving ideas. Help boost
              creativity and encourage others to keep building.
            </p>
          </div>

          {/* Collaborate */}
          <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300 border border-base-300">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-green-500 w-7 h-7" />
              <h3 className="text-xl font-semibold">Collaborate</h3>
            </div>
            <p className="text-base-content/70">
              If an idea excites you, connect with its creator. Work together
              and turn visions into real impact.
            </p>
          </div>
        </div>

        {/* Closing Quote */}
        <p className="mt-16 text-base-content/70 italic text-lg max-w-2xl mx-auto">
          “We believe that the best ideas don’t just stay in our minds — they
          grow when shared.”
        </p>
      </div>
    </section>
  );
}

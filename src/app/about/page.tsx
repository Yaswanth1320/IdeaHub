import { FaRegLightbulb, FaRegThumbsUp, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-8 tracking-wide"
          style={{ fontFamily: "'Comfortaa', cursive" }}
        >
          About <span className="text-primary">IdeaHub</span>
        </h1>

        {/* Intro */}
        <p className="text-lg md:text-xl leading-relaxed text-gray-700/80 mb-16 max-w-4xl mx-auto">
          IdeaHub is a community-driven platform where creativity meets
          collaboration. Share your thoughts, spark discussions, and work
          together to bring ideas to life. Whether you’re a dreamer, a builder,
          or a collaborator, this is your space to express, connect, and grow.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {/* Share Ideas */}
          <div className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 transition">
                <FaRegLightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Share Your Ideas</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Post your ideas freely — from quick sparks to big visions. Every
              thought matters and has the power to inspire others.
            </p>
          </div>

          {/* Like & Support */}
          <div className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition">
                <FaRegThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Like & Support</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Show support by liking, commenting, or saving ideas. Help boost
              creativity and encourage others to keep building.
            </p>
          </div>

          {/* Collaborate */}
          <div className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition">
                <FaUsers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Collaborate</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If an idea excites you, connect with its creator. Work together
              and turn visions into real impact.
            </p>
          </div>
        </div>

        {/* Closing Quote */}
        <p className="mt-20 text-gray-700/70 italic text-xl md:text-2xl max-w-3xl mx-auto">
          “We believe that the best ideas don’t just stay in our minds — they
          grow when shared.”
        </p>
      </div>
    </section>
  );
}

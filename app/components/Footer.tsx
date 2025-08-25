import { Link } from "react-router";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaRegLightbulb className="text-primary w-6 h-6" />
            <h2
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "'Nothing You Could Do', cursive" }}
            >
              IdeaHub
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            Where great ideas find their community. Share, discover, and
            collaborate on innovative concepts.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-500">
            <a href="#" className="hover:text-sky-500 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle: Explore */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-800">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link
                to="/trending"
                className="hover:text-primary transition-colors"
              >
                Trending Ideas
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="hover:text-primary transition-colors"
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-primary transition-colors"
              >
                Popular Users
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Resources */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-800">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-primary transition-colors"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} IdeaHub — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

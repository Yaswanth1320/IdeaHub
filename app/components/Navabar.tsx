import { NavLink } from "react-router";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiInfo,
  FiEdit,
  FiLogIn,
} from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl shadow-lg border border-base-300 bg-base-100/80 backdrop-blur-md">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center gap-2">
            <FaRegLightbulb className="text-primary w-7 h-7" />
            <NavLink
              to="/"
              className="text-2xl font-extrabold tracking-wide text-primary"
              style={{ fontFamily: "'Nothing You Could Do', cursive" }}
            >
              IdeaHub
            </NavLink>
          </div>

          {/* Center: Navigation (icons only) */}
          <div className="flex-none">
            <ul className="flex gap-4 items-center text-lg">
              {/* Home */}
              <li className="relative group">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive
                        ? "bg-blue-100 text-blue-600 shadow-md"
                        : "text-base-content hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <FiHome className="w-5 h-5" />
                </NavLink>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  Home
                </span>
              </li>

              {/* Discover */}
              <li className="relative group">
                <NavLink
                  to="/discover"
                  className={({ isActive }) =>
                    `p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive
                        ? "bg-purple-100 text-purple-600 shadow-md"
                        : "text-base-content hover:bg-purple-50 hover:text-purple-600"
                    }`
                  }
                >
                  <FiCompass className="w-5 h-5" />
                </NavLink>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  Discover
                </span>
              </li>

              {/* Post */}
              <li className="relative group">
                <NavLink
                  to="/post"
                  className={({ isActive }) =>
                    `p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive
                        ? "bg-green-100 text-green-600 shadow-md"
                        : "text-base-content hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  <FiEdit className="w-5 h-5" />
                </NavLink>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  Post
                </span>
              </li>

              {/* Trending */}
              <li className="relative group">
                <NavLink
                  to="/trending"
                  className={({ isActive }) =>
                    `p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive
                        ? "bg-orange-100 text-orange-600 shadow-md"
                        : "text-base-content hover:bg-orange-50 hover:text-orange-600"
                    }`
                  }
                >
                  <FiTrendingUp className="w-5 h-5" />
                </NavLink>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  Trending
                </span>
              </li>

              {/* About */}
              <li className="relative group">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive
                        ? "bg-pink-100 text-pink-600 shadow-md"
                        : "text-base-content hover:bg-pink-50 hover:text-pink-600"
                    }`
                  }
                >
                  <FiInfo className="w-5 h-5" />
                </NavLink>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  About
                </span>
              </li>

              {/* Auth Buttons */}
              <li className="relative group">
                <SignedOut>
                  <SignInButton>
                    <div className="p-3 rounded-full flex items-center justify-center transition-all duration-300 text-base-content hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                      <FiLogIn className="w-5 h-5" />
                    </div>
                  </SignInButton>
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    Sign In
                  </span>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't overlap navbar */}
      <div className="mt-24"></div>
    </>
  );
}

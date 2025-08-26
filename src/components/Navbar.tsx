"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiCompass,
  FiInfo,
  FiEdit,
  FiLogIn,
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navItems = [
    {
      href: "/",
      icon: <FiHome className="w-5 h-5" />,
      label: "Home",
      activeColor: "bg-blue-100 text-blue-600",
    },
    {
      href: "/discover",
      icon: <FiCompass className="w-5 h-5" />,
      label: "Discover",
      activeColor: "bg-purple-100 text-purple-600",
    },
    {
      href: "/post",
      icon: <FiEdit className="w-5 h-5" />,
      label: "Post",
      activeColor: "bg-green-100 text-green-600",
    },
    {
      href: "/leaderboard",
      icon: <FaTrophy className="w-5 h-5" />,
      label: "Leaderboard",
      activeColor: "bg-orange-100 text-orange-600",
    },
    {
      href: "/about",
      icon: <FiInfo className="w-5 h-5" />,
      label: "About",
      activeColor: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl shadow-lg border border-base-300 bg-base-100/80 backdrop-blur-md">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center gap-2">
            <FaRegLightbulb className="text-primary w-7 h-7" />
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-wide text-primary"
              style={{ fontFamily: "'Nothing You Could Do', cursive" }}
            >
              IdeaHub
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="flex-none">
            <ul className="flex gap-4 items-center text-lg">
              {navItems.map((item) => (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
                      isActive(item.href)
                        ? `${item.activeColor} shadow-md`
                        : "text-base-content hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {item.icon}
                  </Link>
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                </li>
              ))}

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

      {/* Spacer */}
      <div className="mt-24"></div>
    </>
  );
}

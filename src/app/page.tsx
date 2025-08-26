"use client"
import TrendingIdeas from "@/components/TrendingIdeas";
import { useSession } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <TrendingIdeas />
      </main>
    </div>
  );
}

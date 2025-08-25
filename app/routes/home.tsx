import type { Route } from "./+types/home";
import TrendingIdeas from "~/components/TrendingIdeas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Idea Hub" },
    {
      name: "description",
      content: "Discover new ideas and innovations, share your ideas.",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <TrendingIdeas />
      </main>
    </div>
  );
}

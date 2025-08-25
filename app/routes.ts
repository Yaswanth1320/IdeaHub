import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("discover", "routes/discover.tsx"),
  route("about", "routes/about.tsx"),
  route("trending", "routes/Trending.tsx"),
  route("post", "routes/post.tsx"),
  route("faq", "routes/faq.tsx"),
  route("support", "routes/support.tsx"),
  route("leaderboard", "routes/leaderboard.tsx"),
] satisfies RouteConfig;

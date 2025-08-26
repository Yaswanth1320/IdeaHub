# Top20

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logo=clerk&logoColor=white&color=3A0CA3" alt="clerk" />
    <img src="https://img.shields.io/badge/-Neon-black?style=for-the-badge&logo=postgresql&logoColor=white&color=336791" alt="neon" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=38BDF8" alt="tailwind" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logo=radixui&logoColor=white&color=7C3AED" alt="shadcn" />
    <img src="https://img.shields.io/badge/-DrizzleORM-black?style=for-the-badge&logo=drizzle&logoColor=white&color=0A9396" alt="drizzle" />
  </div>
</div>

---

## 📋 Table of Contents

1. 🧠 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🩺 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 📊 [Deployment](#deployment)
6. 🤝 [Contributing](#contributing)

---

## 🧠 Introduction

**Top20** is a modern idea-sharing and ranking platform built with **Next.js 15** and **React 19**.  
It allows users to **post ideas, like/dislike, comment, and view trending ideas or concepts**.  
With authentication powered by **Clerk**, serverless database via **Neon + Drizzle ORM**, and sleek UI using **TailwindCSS + ShadCN**,  
Top20 provides a smooth and interactive user experience for startups and innovators.

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15 (with React 19)
- **Database:** Neon (PostgreSQL) + Drizzle ORM
- **Authentication:** Clerk
- **Styling:** TailwindCSS + ShadCN
- **UI Components:** Radix UI + Lucide Icons
- **Toast Notifications:** Sonner
- **Language:** TypeScript

---

## 🩺 Key Features

👉 **User Authentication with Clerk** – Secure sign-in/sign-up with Clerk integration.  
👉 **Post & Discover Ideas** – Users can share ideas with title, description, and category.  
👉 **Voting System** – Like/dislike ideas to push the best ones to the top.  
👉 **Commenting System** – Add and manage comments on ideas.  
👉 **Trending Leaderboard** – Displays top 20 most liked ideas with a dynamic ranking UI.  
👉 **Responsive UI** – Optimized for both desktop & mobile using TailwindCSS.  
👉 **Database Integration** – Neon + Drizzle for scalable and efficient persistence.  
👉 **Notifications & Feedback** – Smooth toasts and alerts with Sonner.  

---

## 🚀 Quick Start

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (>=18.x recommended)
- npm or yarn
- Git

### 📁 Clone the Repo

```bash
git clone https://github.com/Yaswanth1320/top20.git
cd top20
```

### 📦 Install Dependencies

```bash
npm install
```

### 🛠️ Setup Environment Variables

Create a `.env.local` file in the root and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

DATABASE_URL=your_neon_database_url

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> 💡 Replace with your actual **Clerk API keys** and **Neon database URL**.

### ▶️ Run the App

```bash
npm run dev
```

Visit 👉 <http://localhost:3000>

---

## 📊 Deployment

This project is optimized for **Vercel Deployment**:

```bash
npm run build
npm start
```

> Ensure all environment variables are configured in the Vercel dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a branch, and submit a PR.

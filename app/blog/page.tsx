// app/blog/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Urban Racing: How Rapido is Revolutionizing Transportation",
      excerpt: "Discover how Rapido is bringing Formula 1 precision to everyday commuting with our latest innovations in urban mobility.",
      author: "Racing Team",
      date: "2024-01-15",
      category: "Innovation",
      readTime: "5 min read",
      image: "🏎️"
    },
    {
      id: 2,
      title: "Safety First: Our Championship-Level Safety Protocols",
      excerpt: "Learn about the rigorous safety measures we implement to ensure every ride meets Formula 1 safety standards.",
      author: "Safety Team",
      date: "2024-01-10",
      category: "Safety",
      readTime: "4 min read",
      image: "🛡️"
    },
    {
      id: 3,
      title: "MotoGP vs F1: Which Racing Style Suits Your Commute?",
      excerpt: "Explore the differences between our MotoGP bike rides and F1 car experiences to find your perfect racing match.",
      author: "Racing Experts",
      date: "2024-01-05",
      category: "Racing",
      readTime: "6 min read",
      image: "🏍️"
    },
    {
      id: 4,
      title: "Driver Spotlight: Meet Our Championship-Winning Team",
      excerpt: "Get to know the professional drivers who make every ride an unforgettable racing experience.",
      author: "HR Team",
      date: "2024-01-01",
      category: "Team",
      readTime: "3 min read",
      image: "🏆"
    },
    {
      id: 5,
      title: "Racing Through the City: Top Routes for Speed Enthusiasts",
      excerpt: "Discover the fastest and most scenic routes in your city, optimized for the ultimate racing experience.",
      author: "Route Team",
      date: "2023-12-28",
      category: "Routes",
      readTime: "7 min read",
      image: "🗺️"
    },
    {
      id: 6,
      title: "Green Racing: Our Commitment to Sustainable Transportation",
      excerpt: "Learn how Rapido is leading the way in eco-friendly racing with electric vehicles and sustainable practices.",
      author: "Green Team",
      date: "2023-12-25",
      category: "Sustainability",
      readTime: "5 min read",
      image: "🌱"
    }
  ];

  const categories = ["All", "Innovation", "Safety", "Racing", "Team", "Routes", "Sustainability"] as const;
  const [activeCategory, setActiveCategory] = React.useState<(typeof categories)[number]>("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filteredPosts[0] ?? blogPosts[0];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-racing mb-6 bg-gradient-to-r from-f1-red via-yellow-500 to-f1-red bg-clip-text text-transparent">
            RACING BLOG
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest racing news, safety tips, and innovations from the Rapido team
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-racing transition-all ${
                  category === activeCategory
                    ? "bg-gradient-to-r from-f1-red to-red-700 text-white racing-glow-red"
                    : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-sm text-f1-red font-racing mb-2">FEATURED POST</div>
                <h2 className="text-3xl font-racing text-white mb-4">
                  {featured.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{featured.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{featured.date}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{featured.readTime}</div>
                </div>
                <Link href={`/blog/${featured.id}`} className="btn-racing inline-flex items-center">
                  Read More <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto racing-glow-red">
                  <span className="text-6xl">{featured.image}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-racing text-white mb-8 text-center">LATEST POSTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="racing-card p-6 hover:scale-105 transition-transform">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">{post.image}</span>
                  </div>
                  <div className="text-sm text-f1-red font-racing mb-2">{post.category}</div>
                </div>
                
                <h3 className="font-racing text-xl text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{post.readTime}</span>
                  <Link href={`/blog/${post.id}`} className="text-f1-red hover:text-red-400 transition-colors">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-4">STAY IN THE RACE</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest racing updates and exclusive content
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
                />
                <button className="btn-racing px-6 py-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

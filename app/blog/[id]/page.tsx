// app/blog/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

type Params = { id: string };

interface PageProps {
  params: Params;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blogPosts = [
    {
      id: 1,
      title:
        "The Future of Urban Racing: How Rapido is Revolutionizing Transportation",
      excerpt:
        "Discover how Rapido is bringing Formula 1 precision to everyday commuting with our latest innovations in urban mobility.",
      content: `<p>In the fast-paced world of urban transportation...</p>`,
      author: "Racing Team",
      date: "2024-01-15",
      category: "Innovation",
      readTime: "5 min read",
      image: "🏎️",
    },
    {
      id: 2,
      title: "Safety First: Our Championship-Level Safety Protocols",
      excerpt: "Learn about the rigorous safety measures we implement...",
      content: `<p>Safety is not just a priority at Rapido...</p>`,
      author: "Safety Team",
      date: "2024-01-10",
      category: "Safety",
      readTime: "4 min read",
      image: "🛡️",
    },
    {
      id: 3,
      title: "MotoGP vs F1: Which Racing Style Suits Your Commute?",
      excerpt: "Explore the differences between our MotoGP bike rides...",
      content: `<p>Choosing between MotoGP and F1 experiences...</p>`,
      author: "Racing Experts",
      date: "2024-01-05",
      category: "Racing",
      readTime: "6 min read",
      image: "🏍️",
    },
  ];

  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white">Post Not Found</h1>
          <Link href="/blog" className="text-red-500 underline mt-4 block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="racing-card p-8">
          <div className="text-center mb-8">
            <div className="text-sm text-f1-red font-racing mb-4">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-racing text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="w-32 h-32 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto racing-glow-red">
              <span className="text-6xl">{post.image}</span>
            </div>
          </div>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-racing text-white mb-6 text-center">
            RELATED POSTS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="racing-card p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">{relatedPost.image}</span>
                      </div>
                      <div className="text-sm text-f1-red font-racing mb-2">
                        {relatedPost.category}
                      </div>
                    </div>
                    <h3 className="font-racing text-xl text-white mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{relatedPost.readTime}</span>
                      <span className="text-f1-red">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

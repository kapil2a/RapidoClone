// app/blog/[id]/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Urban Racing: How Rapido is Revolutionizing Transportation",
      excerpt: "Discover how Rapido is bringing Formula 1 precision to everyday commuting with our latest innovations in urban mobility.",
      content: `
        <p>In the fast-paced world of urban transportation, Rapido stands at the forefront of innovation, bringing Formula 1 precision and MotoGP speed to everyday commuting. Our revolutionary approach to ride-sharing has transformed how people move through cities.</p>
        
        <h3>Racing Technology Meets Urban Mobility</h3>
        <p>We've integrated cutting-edge racing technology into our platform, ensuring every ride is not just a journey, but an experience. From real-time GPS tracking with racing-grade precision to driver training programs inspired by professional racing schools, we're setting new standards in the industry.</p>
        
        <h3>Safety First, Speed Second</h3>
        <p>Just like Formula 1 drivers trust their safety systems, our passengers can rely on our comprehensive safety measures. Every driver undergoes rigorous background checks and racing safety training, ensuring championship-level safety standards.</p>
        
        <h3>The Racing Community</h3>
        <p>Our platform has created a unique community of racing enthusiasts who share a passion for speed, precision, and excellence. From casual riders to racing professionals, everyone finds their place in the Rapido ecosystem.</p>
        
        <h3>Looking Ahead</h3>
        <p>As we continue to innovate, we're exploring electric racing vehicles, autonomous driving technology, and even virtual reality experiences that bring the thrill of racing to every ride.</p>
      `,
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
      content: `
        <p>Safety is not just a priority at Rapido—it's our foundation. We've implemented championship-level safety protocols that ensure every ride meets the highest standards of security and reliability.</p>
        
        <h3>Driver Verification Process</h3>
        <p>Every driver in our network undergoes a comprehensive verification process that includes criminal background checks, driving record analysis, and specialized racing safety training. We maintain the same standards that professional racing teams use for their drivers.</p>
        
        <h3>Real-Time Monitoring</h3>
        <p>Our advanced GPS tracking system provides real-time monitoring of every ride, ensuring passengers are always connected and protected. In case of emergency, our support team can respond within minutes.</p>
        
        <h3>Vehicle Safety Standards</h3>
        <p>All vehicles in our fleet undergo regular safety inspections and maintenance checks. We ensure that every car, bike, and auto meets racing-grade safety standards before hitting the road.</p>
        
        <h3>Emergency Response</h3>
        <p>Our 24/7 emergency response team is trained to handle any situation with the same precision and speed as a Formula 1 pit crew. Quick response times and professional handling ensure passenger safety at all times.</p>
      `,
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
      content: `
        <p>Choosing between MotoGP and F1 experiences is like choosing between two different racing philosophies. Each offers a unique approach to speed, agility, and excitement.</p>
        
        <h3>Formula 1 Experience</h3>
        <p>Our F1 car rides offer the ultimate in precision and power. With advanced aerodynamics, powerful engines, and cutting-edge technology, F1 rides provide a smooth, fast, and luxurious experience perfect for longer distances and premium service.</p>
        
        <h3>MotoGP Experience</h3>
        <p>MotoGP bike rides bring the thrill of motorcycle racing to urban streets. These rides are perfect for shorter distances, offering agility, speed, and the excitement of weaving through traffic with professional precision.</p>
        
        <h3>Choosing Your Style</h3>
        <p>Consider your preferences: Do you prefer the smooth power of an F1 car or the agile excitement of a MotoGP bike? Your choice depends on distance, comfort preferences, and the type of racing experience you're seeking.</p>
        
        <h3>Professional Drivers</h3>
        <p>Both F1 and MotoGP drivers in our network are trained professionals who understand the nuances of their respective racing styles. They bring years of experience and passion to every ride.</p>
      `,
      author: "Racing Experts",
      date: "2024-01-05",
      category: "Racing",
      readTime: "6 min read",
      image: "🏍️"
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-racing text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-racing">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="racing-card p-8">
          <div className="text-center mb-8">
            <div className="text-sm text-f1-red font-racing mb-4">{post.category}</div>
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

          {/* Article Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-racing text-white mb-6 text-center">RELATED POSTS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <div className="racing-card p-6 hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">{relatedPost.image}</span>
                    </div>
                    <div className="text-sm text-f1-red font-racing mb-2">{relatedPost.category}</div>
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


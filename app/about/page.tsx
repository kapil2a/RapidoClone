// app/about/page.tsx
"use client";

import React from "react";
import { Trophy, Users, Target, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-racing mb-6 bg-gradient-to-r from-f1-red via-yellow-500 to-f1-red bg-clip-text text-transparent">
            ABOUT RAPIDO
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Racing towards excellence in urban mobility with Formula 1 precision and MotoGP speed
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-6 text-center">OUR MISSION</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  At Rapido, we're not just a ride-sharing platform – we're the Formula 1 of urban transportation. 
                  Our mission is to deliver lightning-fast, safe, and reliable rides with the precision and excitement 
                  of professional racing.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Every ride is a lap towards victory, every driver is a champion, and every passenger 
                  experiences the thrill of racing through the city streets.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 racing-glow-red">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-racing text-white mb-8 text-center">OUR RACING VALUES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="racing-card p-6 text-center">
              <Zap className="w-12 h-12 text-f1-red mx-auto mb-4" />
              <h3 className="font-racing text-xl text-white mb-3">SPEED</h3>
              <p className="text-gray-300">
                Lightning-fast response times and efficient routes that get you to your destination in record time.
              </p>
            </div>
            <div className="racing-card p-6 text-center">
              <Target className="w-12 h-12 text-motogp-neon mx-auto mb-4" />
              <h3 className="font-racing text-xl text-white mb-3">PRECISION</h3>
              <p className="text-gray-300">
                Every detail matters. From route optimization to driver selection, we deliver precision in every ride.
              </p>
            </div>
            <div className="racing-card p-6 text-center">
              <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-racing text-xl text-white mb-3">TEAMWORK</h3>
              <p className="text-gray-300">
                Our drivers and passengers work together as a championship team, creating the ultimate racing experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-8 text-center">RACING STATISTICS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-f1-red mb-2">50M+</div>
                <div className="text-gray-400">Rides Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-motogp-neon mb-2">2M+</div>
                <div className="text-gray-400">Happy Racers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-gray-400">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-racing text-white mb-8 text-center">OUR RACING TEAM</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="racing-card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏎️</span>
              </div>
              <h3 className="font-racing text-xl text-white mb-2">F1 Drivers</h3>
              <p className="text-gray-300 text-sm">
                Professional drivers trained in Formula 1 precision and safety standards.
              </p>
            </div>
            <div className="racing-card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-motogp-neon to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏍️</span>
              </div>
              <h3 className="font-racing text-xl text-white mb-2">MotoGP Riders</h3>
              <p className="text-gray-300 text-sm">
                Expert motorcycle riders with MotoGP-level skills and safety training.
              </p>
            </div>
            <div className="racing-card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-racing text-xl text-white mb-2">Support Team</h3>
              <p className="text-gray-300 text-sm">
                Championship-winning support staff ensuring every ride is perfect.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


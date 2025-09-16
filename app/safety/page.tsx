// app/safety/page.tsx
"use client";

import React from "react";
import { Shield, Users, Camera, Phone, AlertTriangle, CheckCircle } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-racing mb-6 bg-gradient-to-r from-f1-red via-yellow-500 to-f1-red bg-clip-text text-transparent">
            SAFETY FIRST
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your safety is our top priority. Every ride is protected with Formula 1-level safety standards.
          </p>
        </section>

        {/* Main Safety Section */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-racing text-white mb-6">CHAMPIONSHIP-LEVEL SAFETY</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Just like Formula 1 drivers trust their safety systems, you can trust Rapido's comprehensive 
                  safety measures. We've implemented racing-grade safety protocols to ensure every ride is 
                  secure and protected.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Verified drivers with racing licenses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Real-time GPS tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">24/7 emergency support</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 racing-glow-red">
                  <Shield className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-racing text-white mb-8 text-center">SAFETY FEATURES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Driver Verification</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                All drivers undergo rigorous background checks and racing safety training.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Criminal background check</li>
                <li>• Driving record verification</li>
                <li>• Racing safety certification</li>
                <li>• Regular re-verification</li>
              </ul>
            </div>

            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-motogp-neon to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Live Tracking</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Real-time GPS tracking ensures you're always connected and monitored.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Live route tracking</li>
                <li>• Driver location sharing</li>
                <li>• ETA updates</li>
                <li>• Emergency location sharing</li>
              </ul>
            </div>

            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Emergency Support</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                24/7 emergency support team ready to assist you at any time.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• 24/7 helpline</li>
                <li>• Emergency button in app</li>
                <li>• Quick response team</li>
                <li>• Police integration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-8 text-center">SAFETY TIPS FOR RACERS</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-racing text-xl text-white mb-4">Before Your Ride</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Verify driver details and vehicle information</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Share your ride details with family/friends</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Check driver rating and reviews</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Ensure your phone is charged</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-racing text-xl text-white mb-4">During Your Ride</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Always wear your seatbelt</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Keep emergency contacts handy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Trust your instincts - if something feels wrong, speak up</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Use the in-app emergency button if needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Section */}
        <section className="mb-16">
          <div className="racing-card p-8 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-3xl font-racing text-white mb-4">EMERGENCY CONTACTS</h2>
              <p className="text-gray-300 mb-6">
                In case of emergency, contact our support team immediately
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">100</div>
                  <div className="text-gray-400">Police</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">102</div>
                  <div className="text-gray-400">Ambulance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">101</div>
                  <div className="text-gray-400">Fire</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Stats */}
        <section className="text-center">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-8">SAFETY STATISTICS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-gray-400">Safe Rides</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-f1-red mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-motogp-neon mb-2">2min</div>
                <div className="text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-gray-400">Verified Drivers</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


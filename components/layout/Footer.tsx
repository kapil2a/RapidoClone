// components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-f1-red to-red-700 rounded-lg flex items-center justify-center racing-glow-red">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <span className="font-racing text-xl text-white">RACING RAPIDO</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The Formula 1 of urban transportation. Experience the thrill of racing through city streets with our premium ride-sharing service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-f1-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-f1-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-f1-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-racing text-white mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ads" className="text-gray-400 hover:text-white transition-colors">
                  Rapido Ads
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-400 hover:text-white transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Racing Services */}
          <div>
            <h3 className="font-racing text-white mb-4">RACING SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#vehicles" className="text-gray-400 hover:text-white transition-colors">
                  F1 Car Rides
                </Link>
              </li>
              <li>
                <Link href="/#vehicles" className="text-gray-400 hover:text-white transition-colors">
                  MotoGP Bike Rides
                </Link>
              </li>
              <li>
                <Link href="/#book" className="text-gray-400 hover:text-white transition-colors">
                  Auto Rides
                </Link>
              </li>
              <li>
                <Link href="/#vehicles" className="text-gray-400 hover:text-white transition-colors">
                  Mini Cab Rides
                </Link>
              </li>
              <li>
                <Link href="/ride" className="text-gray-400 hover:text-white transition-colors">
                  Corporate Rides
                </Link>
              </li>
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="font-racing text-white mb-4">OTHER</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/signin" className="text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Join Race
                </Link>
              </li>
              <li>
                <a href="#top" className="text-gray-400 hover:text-white transition-colors">
                  Back to Top
                </a>
              </li>
              <li>
                <a href="/README" className="text-gray-400 hover:text-white transition-colors">
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Racing Rapido. All rights reserved. | Racing towards excellence.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


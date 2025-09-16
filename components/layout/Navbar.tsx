"use client";

// components/layout/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Trophy,
  MapPin,
  Clock,
  LogOut,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏁" },
    { href: "/about", label: "About Us", icon: "🏎️" },
    { href: "/ads", label: "Rapido Ads", icon: "📢" },
    { href: "/safety", label: "Safety", icon: "🛡️" },
    { href: "/blog", label: "Blog", icon: "📝" },
    { href: "/contact", label: "Contact Us", icon: "📞" },
  ];

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-f1-red to-red-700 rounded-lg flex items-center justify-center racing-glow-red">
              <span className="text-xl font-bold text-white">R</span>
            </div>
            <span className="font-racing text-xl text-white hidden sm:block">
              RACING RAPIDO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-speed transition-all ${
                  isActivePage(item.href)
                    ? "bg-f1-red text-white racing-glow-red"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">🏎️</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user.racingLevel} • {user.totalRides} laps
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center">
                          <span className="text-lg">🏎️</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {user.displayName}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-f1-red/20 text-f1-red rounded racing-badge">
                              {user.racingLevel}
                            </span>
                            <span className="text-xs text-gray-400">
                              {user.totalRides} laps
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/history"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Race History</span>
                      </Link>
                      <Link
                        href="/leaderboard"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>Leaderboard</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-gray-300 hover:text-white font-speed"
                >
                  Sign In
                </Link>
                <Link
                  href="/join"
                  className="btn-racing px-4 py-2"
                >
                  Join Race
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 text-white"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-speed transition-all ${
                    isActivePage(item.href)
                      ? "bg-f1-red text-white racing-glow-red"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

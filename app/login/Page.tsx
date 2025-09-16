"use client";

// app/login/page.tsx
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Car, Bike } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<"F1" | "MotoGP">("F1");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });

  // Check URL params for signup mode
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await signUp(formData.email, formData.password, formData.displayName);
      } else {
        await signIn(formData.email, formData.password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const themeColors = {
    F1: {
      primary: "from-f1-red to-red-700",
      secondary: "from-gray-800 to-f1-black",
      accent: "text-f1-red",
      glow: "racing-glow-red",
    },
    MotoGP: {
      primary: "from-motogp-neon to-green-600",
      secondary: "from-blue-800 to-motogp-blue",
      accent: "text-motogp-neon",
      glow: "racing-glow-green",
    },
  };

  const currentTheme = themeColors[selectedTheme];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Racing Background */}
      <div className="absolute inset-0 racing-track-bg opacity-20"></div>
      <div className="absolute inset-0 speed-lines opacity-10"></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-block p-4 rounded-full bg-gradient-to-br ${currentTheme.secondary} ${currentTheme.glow} mb-4`}
          >
            <span className="text-4xl">
              {selectedTheme === "F1" ? "🏎️" : "🏍️"}
            </span>
          </div>
          <h1 className="text-3xl font-racing text-white mb-2">
            {isSignUp ? "JOIN THE RACE" : "WELCOME BACK"}
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? "Create your racing profile and start winning"
              : "Sign in to continue your racing journey"}
          </p>
        </div>

        {/* Theme Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-gray-800/50 rounded-lg border border-gray-700">
              <button
                onClick={() => setSelectedTheme("F1")}
                className={`px-4 py-2 rounded-md font-racing text-sm transition-all ${
                  selectedTheme === "F1"
                    ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Car className="inline w-4 h-4 mr-2" />
                F1
              </button>
              <button
                onClick={() => setSelectedTheme("MotoGP")}
                className={`px-4 py-2 rounded-md font-racing text-sm transition-all ${
                  selectedTheme === "MotoGP"
                    ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Bike className="inline w-4 h-4 mr-2" />
                MotoGP
              </button>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="racing-card p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Racing Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                    placeholder="Enter your racing name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                  placeholder="racer@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-racing py-3 text-lg bg-gradient-to-r ${
                currentTheme.primary
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <div className="racing-loader w-5 h-5 inline mr-2"></div>
                  {isSignUp ? "JOINING RACE..." : "SIGNING IN..."}
                </>
              ) : (
                <>{isSignUp ? "🏁 START RACING" : "🚀 ENTER RACE"}</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Toggle Sign In/Up */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setFormData({
                    email: "",
                    password: "",
                    displayName: "",
                    confirmPassword: "",
                  });
                }}
                className={`font-medium ${currentTheme.accent} hover:underline`}
              >
                {isSignUp ? "Sign In" : "Join the Race"}
              </button>
            </p>
          </div>
        </div>

        {/* Racing Stats */}
        <div className="mt-8 racing-card p-6">
          <h3 className="font-racing text-lg text-center mb-4 text-white">
            🏆 JOIN THE CHAMPIONS
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${currentTheme.accent}`}>
                15K+
              </div>
              <div className="text-xs text-gray-400">Active Racers</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${currentTheme.accent}`}>
                89K+
              </div>
              <div className="text-xs text-gray-400">Races Completed</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${currentTheme.accent}`}>
                4.9★
              </div>
              <div className="text-xs text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

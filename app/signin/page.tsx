"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Modal from "@/components/ui/Modal";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "info" | "warning">("info");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (type: typeof modalType, title: string, message: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      openModal("success", "Welcome Back", "You are signed in. Redirecting...");
      setTimeout(() => {
        setModalOpen(false);
        router.push("/");
      }, 2000);
    } catch (err: any) {
      if (err?.code === "auth/user-not-found") {
        openModal("error", "User not found", "No account exists for this email.");
      } else if (err?.code === "auth/wrong-password") {
        openModal("error", "Invalid credentials", "Email or password is incorrect.");
      } else {
        openModal("error", "Sign In Failed", "Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Racing Background */}
      <div className="absolute inset-0 racing-track-bg opacity-20"></div>
      <div className="absolute inset-0 speed-lines opacity-10"></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-f1-red to-red-700 racing-glow-red mb-4">
            <span className="text-4xl">🏎️</span>
          </div>
          <h1 className="text-3xl font-racing text-white mb-2">WELCOME BACK</h1>
          <p className="text-gray-400">Sign in to continue your racing journey</p>
        </div>

        {/* Sign In Form */}
        <div className="racing-card p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                  placeholder="racer@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-racing py-3 text-lg bg-gradient-to-r from-f1-red to-red-700 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {loading ? (
                <>
                  <div className="racing-loader w-5 h-5 inline mr-2"></div>
                  SIGNING IN...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 inline mr-2" />
                  ENTER RACE
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-f1-red hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        type={modalType}
      >
        {modalMessage}
      </Modal>
    </div>
  );
}

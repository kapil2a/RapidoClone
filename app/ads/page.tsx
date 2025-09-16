// app/ads/page.tsx
"use client";

import React, { useState } from "react";
import { Megaphone, Target, TrendingUp, Users, Zap } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [feedback, setFeedback] = useState<{title:string;message:string;type:"success"|"error"|"info"|"warning"}|null>(null);

  const openPackage = (pkg: string) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
    setFeedback(null);
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "adInquiries"), {
        ...form,
        package: selectedPackage,
        createdAt: new Date(),
      });
      setFeedback({title: "Inquiry Sent", message: "Our racing marketing team will contact you shortly.", type: "success"});
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      setFeedback({title: "Failed", message: "Please try again later.", type: "error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-racing mb-6 bg-gradient-to-r from-f1-red via-yellow-500 to-f1-red bg-clip-text text-transparent">
            RAPIDO ADS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accelerate your business with our high-speed advertising platform
          </p>
        </section>

        {/* Main Ad Section */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-racing text-white mb-6">REACH MILLIONS OF RACERS</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Get your brand in front of millions of active users who trust Rapido for their daily rides. 
                  Our racing-themed platform offers unique advertising opportunities that capture attention 
                  and drive results.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-f1-red rounded-full"></div>
                    <span className="text-gray-300">Targeted audience reach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-motogp-neon rounded-full"></div>
                    <span className="text-gray-300">High engagement rates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Real-time analytics</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 racing-glow-red">
                  <Megaphone className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-racing text-white mb-8 text-center">ADVERTISING OPTIONS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Banner Ads</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Eye-catching banner advertisements displayed throughout the app interface.
              </p>
              <ul className="text-gray-400 text-sm space-y-2 mb-6">
                <li>• App homepage placement</li>
                <li>• Ride booking screens</li>
                <li>• Post-ride confirmation</li>
              </ul>
              <button className="btn-racing w-full" onClick={() => openPackage("ROOKIE")}>I'm Interested</button>
            </div>

            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-motogp-neon to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Sponsored Rides</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Promote your business by sponsoring rides to specific destinations.
              </p>
              <ul className="text-gray-400 text-sm space-y-2 mb-6">
                <li>• Destination-based targeting</li>
                <li>• Branded vehicle options</li>
                <li>• Customer engagement</li>
              </ul>
              <button className="btn-racing w-full" onClick={() => openPackage("CHAMPION")}>I'm Interested</button>
            </div>

            <div className="racing-card p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-racing text-xl text-white">Driver Partnerships</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Partner with our professional drivers for brand visibility.
              </p>
              <ul className="text-gray-400 text-sm space-y-2 mb-6">
                <li>• Driver uniform branding</li>
                <li>• Vehicle customization</li>
                <li>• Direct customer interaction</li>
              </ul>
              <button className="btn-racing w-full" onClick={() => openPackage("LEGEND")}>I'm Interested</button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-8 text-center">RACING PACKAGES</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-700 rounded-lg">
                <h3 className="font-racing text-xl text-white mb-4">ROOKIE</h3>
                <div className="text-3xl font-bold text-f1-red mb-4">₹10K</div>
                <div className="text-gray-400 text-sm mb-6">per month</div>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>• 10K impressions</li>
                  <li>• Basic analytics</li>
                  <li>• Email support</li>
                </ul>
                <button className="btn-racing w-full">START RACING</button>
              </div>

              <div className="text-center p-6 border-2 border-f1-red rounded-lg racing-glow-red">
                <h3 className="font-racing text-xl text-white mb-4">CHAMPION</h3>
                <div className="text-3xl font-bold text-f1-red mb-4">₹50K</div>
                <div className="text-gray-400 text-sm mb-6">per month</div>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>• 100K impressions</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Custom targeting</li>
                </ul>
                <button className="btn-racing w-full">GO CHAMPION</button>
              </div>

              <div className="text-center p-6 border border-gray-700 rounded-lg">
                <h3 className="font-racing text-xl text-white mb-4">LEGEND</h3>
                <div className="text-3xl font-bold text-f1-red mb-4">₹100K</div>
                <div className="text-gray-400 text-sm mb-6">per month</div>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>• Unlimited impressions</li>
                  <li>• Real-time analytics</li>
                  <li>• Dedicated manager</li>
                  <li>• Custom campaigns</li>
                </ul>
                <button className="btn-racing w-full">BECOME LEGEND</button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="racing-card p-8">
            <h2 className="text-3xl font-racing text-white mb-4">READY TO START YOUR CAMPAIGN?</h2>
            <p className="text-gray-300 mb-6">
              Contact our racing marketing team to discuss your advertising needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-racing px-8 py-3" onClick={() => openPackage("CUSTOM")}>
                GET STARTED
              </button>
              <button className="btn-motogp px-8 py-3">
                VIEW SAMPLES
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Interested in ${selectedPackage || "Package"}`} type={feedback?.type || "info"}>
        {feedback ? (
          <div className="space-y-2">
            <p>{feedback.message}</p>
            <button className="btn-racing px-6 py-2 mt-2" onClick={() => setModalOpen(false)}>OK</button>
          </div>
        ) : (
          <form onSubmit={submitInquiry} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
            />
            <button type="submit" disabled={loading} className={`btn-racing w-full ${loading ? "opacity-50" : ""}`}>
              {loading ? (
                <>
                  <div className="racing-loader w-4 h-4 inline mr-2"></div>
                  SENDING...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 inline mr-2" />
                  SEND INQUIRY
                </>
              )}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}


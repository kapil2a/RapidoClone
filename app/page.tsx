"use client";

// app/page.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Car, Bike, Trophy, Zap, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import Modal from "@/components/ui/Modal";
import { collection, addDoc } from "firebase/firestore";
import ChennaiPlacesAutocomplete from "@/components/ui/ChennaiPlacesAutocomplete";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<"F1" | "MotoGP">("F1");
  const [animationClass, setAnimationClass] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [dropCoords, setDropCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<"Cab" | "Bike" | "Auto" | "Mini">("Cab");
  const [showModal, setShowModal] = useState(false);
  type ModalType = "success" | "error" | "info" | "warning";
  const [modalContent, setModalContent] = useState<{ title: string; message: string; type: ModalType }>({ title: "", message: "", type: "info" });
  const [isFindingRaces, setIsFindingRaces] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [loadingTimeoutOver, setLoadingTimeoutOver] = useState(false);

  const mockLocations = [
    "MG Road, Bengaluru",
    "Brigade Road, Bengaluru",
    "Indiranagar, Bengaluru",
    "Koramangala, Bengaluru",
    "Electronic City, Bengaluru",
    "HSR Layout, Bengaluru",
    "Marathahalli, Bengaluru",
    "Whitefield, Bengaluru",
    "BTM Layout, Bengaluru",
    "Majestic, Bengaluru",
  ];

  const filteredPickup = pickupLocation.length > 1
    ? mockLocations.filter((loc) => loc.toLowerCase().includes(pickupLocation.toLowerCase())).slice(0, 5)
    : [];
  const filteredDrop = dropLocation.length > 1
    ? mockLocations.filter((loc) => loc.toLowerCase().includes(dropLocation.toLowerCase())).slice(0, 5)
    : [];

  // Racing stats for homepage
  const racingStats = {
    totalRiders: 15420,
    activeDrivers: 1234,
    completedRaces: 89765,
    avgSpeed: 45,
  };

  // Haversine distance in km
  const calculateDistanceKm = (
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius km
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLng = Math.sin(dLng / 2);
    const c = 2 * Math.asin(
      Math.sqrt(
        sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng
      )
    );
    return R * c;
  };

  const ratePerKm: Record<"Cab" | "Bike" | "Auto" | "Mini", number> = {
    Cab: 15,
    Bike: 12,
    Auto: 10,
    Mini: 8,
  };

  useEffect(() => {
    // Add entrance animation
    setAnimationClass("animate-fade-in");
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoadingTimeoutOver(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleLocationSearch = () => {
    if (pickupLocation && dropLocation) {
      // Show 3s loading overlay, then show success modal and vehicle selection
      setIsFindingRaces(true);
      setTimeout(() => {
        setIsFindingRaces(false);
        setShowVehicleSelection(true);
        setModalContent({
          title: "Races Found!",
          message: `Route ready. Vehicle: ${selectedVehicle}\nPickup: ${pickupLocation}\nDrop: ${dropLocation}`,
          type: "success",
        });
        setShowModal(true);
      }, 3000);
    }
  };

  const handleVehicleSelect = async (vehicle: "Cab" | "Bike" | "Auto" | "Mini") => {
    setSelectedVehicle(vehicle);
    
    try {
      if (!pickupCoords || !dropCoords) {
        setModalContent({
          title: "Select from Suggestions",
          message:
            "Please choose pickup and drop from the suggestions to calculate precise distance and fare.",
          type: "warning",
        });
        setShowModal(true);
        return;
      }

      // Calculate precise distance via haversine
      const rawDistance = calculateDistanceKm(pickupCoords, dropCoords);
      const distanceKm = Math.max(0.5, Math.round(rawDistance * 10) / 10); // min 0.5 km, 0.1 precision

      // Pricing based on vehicle type
      const baseRate = ratePerKm[vehicle];
      const fareAmount = Math.max(20, Math.round(distanceKm * baseRate)); // min fare 20

      // Save ride request to Firebase
      const rideData = {
        pickupLocation,
        pickupCoords,
        dropLocation,
        dropCoords,
        vehicleType: vehicle,
        distanceKm,
        fareAmount,
        userId: user?.id || 'anonymous',
        timestamp: new Date(),
        status: 'requested'
      };
      
      await addDoc(collection(db, 'rides'), rideData);
      
      // Show success modal (bill)
      setModalContent({
        title: "Booking Successful",
        message: `Your ride is on the way!\nVehicle: ${vehicle}\nDistance: ${distanceKm} km\nFare: ₹${fareAmount}\nPickup: ${pickupLocation}\nDrop: ${dropLocation}`,
        type: "success"
      });
      setShowModal(true);
      
      setPickupLocation("");
      setDropLocation("");
      setPickupCoords(null);
      setDropCoords(null);
      setShowVehicleSelection(false);
    } catch (error) {
      console.error('Error booking ride:', error);
      
      setModalContent({
        title: "Booking Failed",
        message: "Sorry, there was an error booking your ride. Please try again.",
        type: "error"
      });
      setShowModal(true);
    }
  };

  const handleStartRacing = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/ride");
    }
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

  if (loading && !loadingTimeoutOver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="racing-loader"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${animationClass}`}>
      {/* Dynamic racing background */}
      <div className="racing-vehicles-bg">
        <div className="vehicle f1" />
        <div className="vehicle moto" />
      </div>
      <div className="tire-tracks-overlay"></div>

      {/* Racing Track Background */}
      <div className="absolute inset-0 racing-track-bg opacity-30"></div>

      {/* Speed Lines Effect */}
      <div className="absolute inset-0 speed-lines opacity-20"></div>

      {/* Hero Section with Search */}
      <section id="book" className="relative pt-20 pb-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-racing mb-6 sheen-text">
            RACE YOUR WAY
          </h1>

          {/* Subtitle with Racing Flag */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            <div className="w-8 h-6 checkered-bg rounded"></div>
            <p className="text-xl md:text-2xl font-speed text-gray-300">
              RIDE THE FAST LANE
            </p>
            <div className="w-8 h-6 checkered-bg rounded"></div>
          </div>

          {/* Search Section */}
          <div className="racing-card p-8 mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-racing text-white mb-6">BOOK YOUR RACE</h2>
            
            {/* Google Places Autocomplete for Chennai */}
            <div className="mb-6">
              <ChennaiPlacesAutocomplete
                apiKey="AIzaSyC-xzChxgk7oqPMq3RJUuYZNo559xEcz98"
                onPickupSelected={(p) => {
                  setPickupLocation(p.address);
                  setPickupCoords({ lat: p.lat, lng: p.lng });
                }}
                onDestinationSelected={(d) => {
                  setDropLocation(d.address);
                  setDropCoords({ lat: d.lat, lng: d.lng });
                }}
              />
            </div>

            <button
              onClick={handleLocationSearch}
              disabled={!pickupLocation || !dropLocation}
              className={`btn-racing btn-flame text-lg px-8 py-4 ${
                !pickupLocation || !dropLocation
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
            >
              <Zap className="inline w-5 h-5 mr-2" />
              FIND RIDES
            </button>
          </div>

          {/* Vehicle Selection */}
          {showVehicleSelection && (
            <div id="vehicles" className="racing-card p-8 mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-racing text-white mb-6">CHOOSE YOUR RACING MACHINE</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => handleVehicleSelect("Cab")}
                  className="p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 bg-gradient-to-br from-f1-red/20 to-red-900/20 border-f1-red racing-glow-red"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏎️</div>
                    <h3 className="font-racing text-lg text-white mb-2">FORMULA 1 CAR</h3>
                    <p className="text-gray-400 text-sm mb-3">Premium racing car experience</p>
                    <div className="text-sm font-bold text-f1-red">₹15/km</div>
                  </div>
                </div>

                <div
                  onClick={() => handleVehicleSelect("Bike")}
                  className="p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 bg-gradient-to-br from-motogp-neon/20 to-green-900/20 border-motogp-neon racing-glow-green"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏍️</div>
                    <h3 className="font-racing text-lg text-white mb-2">RACING MOTO</h3>
                    <p className="text-gray-400 text-sm mb-3">Fast and agile motorcycle ride</p>
                    <div className="text-sm font-bold text-motogp-neon">₹12/km</div>
                  </div>
                </div>

                <div
                  onClick={() => handleVehicleSelect("Auto")}
                  className="p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 bg-gradient-to-br from-yellow-500/20 to-orange-900/20 border-yellow-500"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏁</div>
                    <h3 className="font-racing text-lg text-white mb-2">DRIFT KART</h3>
                    <p className="text-gray-400 text-sm mb-3">Classic auto with sporty touch</p>
                    <div className="text-sm font-bold text-yellow-500">₹10/km</div>
                  </div>
                </div>

                <div
                  onClick={() => handleVehicleSelect("Mini")}
                  className="p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 bg-gradient-to-br from-blue-500/20 to-blue-900/20 border-blue-500"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🚗</div>
                    <h3 className="font-racing text-lg text-white mb-2">RALLY CAR</h3>
                    <p className="text-gray-400 text-sm mb-3">Small car, big racing spirit</p>
                    <div className="text-sm font-bold text-blue-400">₹8/km</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              {
                icon: "👥",
                label: "Total Riders",
                value: racingStats.totalRiders.toLocaleString(),
              },
              {
                icon: "🏁",
                label: "Active Drivers",
                value: racingStats.activeDrivers.toLocaleString(),
              },
              {
                icon: "🏆",
                label: "Races Completed",
                value: racingStats.completedRaces.toLocaleString(),
              },
              {
                icon: "⚡",
                label: "Avg Speed",
                value: `${racingStats.avgSpeed} km/h`,
              },
            ].map((stat, index) => (
              <div key={index} className="racing-card p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div
                  className={`text-2xl font-bold ${currentTheme.accent} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-speed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-racing text-center mb-12 text-white">
            WHY CHOOSE RACING RAPIDO?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "LIVE TRACKING",
                description:
                  "Watch your racing driver approach in real-time with our F1/MotoGP themed map interface.",
                color: "text-f1-red",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "LIGHTNING FAST",
                description:
                  "Our racing drivers are trained for speed. Get to your destination in record time.",
                color: "text-motogp-neon",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "EARN BADGES",
                description:
                  "Complete rides to unlock racing achievements and climb the leaderboard.",
                color: "text-yellow-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="racing-card p-8 text-center hover:scale-105 transition-transform"
              >
                <div className={`mb-4 ${feature.color} flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="font-racing text-xl mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Status Section */}
      {user && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="racing-card p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏎️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-racing text-white">
                      Welcome back, {user.displayName}!
                    </h3>
                    <p className="text-gray-400">
                      Racing Level:{" "}
                      <span className={currentTheme.accent}>
                        {user.racingLevel}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Total Laps:{" "}
                      <span className={currentTheme.accent}>
                        {user.totalRides}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Link href="/profile" className="btn-racing">
                    VIEW PROFILE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-racing mb-6 text-white">
            READY TO DOMINATE THE STREETS?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of racers and experience the fastest ride-hailing
            service in the city.
          </p>

          {!user && (
            <div className="space-x-4">
              <Link href="/signin" className="btn-racing btn-flame">
                SIGN IN
              </Link>
              <Link href="/signup" className="btn-motogp btn-flame">
                JOIN THE RACE
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Custom Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        type={modalContent.type}
      >
        {modalContent.message}
      </Modal>

      {/* Finding Races Overlay */}
      {isFindingRaces && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="racing-card p-8 text-center">
            <div className="racing-loader w-10 h-10 mx-auto mb-4"></div>
            <div className="text-white font-racing text-xl">Finding the fastest routes...</div>
            <div className="text-gray-400 text-sm mt-2">Optimizing like an F1 pit crew</div>
          </div>
        </div>
      )}
    </div>
  );
}

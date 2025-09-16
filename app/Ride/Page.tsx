"use client";

// app/ride/page.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Car,
  Bike,
  Zap,
} from "lucide-react";
import RacingStartLight from "@/components/ride/RacingStartLight";
import MapView from "@/components/ride/MapView";
import { RideBookingData, Location, Driver } from "@/types";

type RideStage = "booking" | "confirmation" | "tracking" | "completed";

export default function RidePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [rideStage, setRideStage] = useState<RideStage>("booking");
  const [selectedVehicle, setSelectedVehicle] = useState<"F1" | "MotoGP">("F1");
  const [bookingData, setBookingData] = useState<RideBookingData>({
    pickup: "",
    destination: "",
    vehicleType: "F1",
    estimatedFare: 0,
    estimatedTime: 0,
    estimatedDistance: 0,
  });
  const [assignedDriver, setAssignedDriver] = useState<Driver | null>(null);
  const [driverLocation, setDriverLocation] = useState({ x: 10, y: 80 });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Mock drivers data
  const mockDrivers: Driver[] = [
    {
      id: "drv1",
      name: "Lewis Hamilton",
      avatar: "👤",
      vehicle: {
        type: "F1",
        model: "Mercedes W14",
        plateNumber: "F1-44",
        color: "Silver",
        icon: "🏎️",
      },
      rating: 4.9,
      totalRaces: 2340,
      currentLocation: { address: "Downtown", lat: 12.9716, lng: 77.5946 },
      isAvailable: true,
      racingNumber: "#44",
    },
    {
      id: "drv2",
      name: "Valentino Rossi",
      avatar: "👤",
      vehicle: {
        type: "MotoGP",
        model: "Yamaha M1",
        plateNumber: "GP-46",
        color: "Yellow",
        icon: "🏍️",
      },
      rating: 4.8,
      totalRaces: 1890,
      currentLocation: { address: "City Center", lat: 12.9716, lng: 77.5946 },
      isAvailable: true,
      racingNumber: "#46",
    },
  ];

  // Calculate fare estimation
  const calculateFare = (
    pickup: string,
    destination: string,
    vehicleType: "F1" | "MotoGP"
  ) => {
    if (!pickup || !destination) return { fare: 0, time: 0, distance: 0 };

    // Mock calculation based on distance (assuming random 5-20km)
    const distance = Math.random() * 15 + 5; // 5-20 km
    const baseRate = vehicleType === "F1" ? 15 : 12; // ₹15/km for F1, ₹12/km for MotoGP
    const fare = Math.round(distance * baseRate);
    const time = Math.round(distance * 2.5); // Assume 2.5 min per km

    return { fare, time, distance: Math.round(distance * 10) / 10 };
  };

  const handleLocationChange = (
    field: "pickup" | "destination",
    value: string
  ) => {
    const newBookingData = { ...bookingData, [field]: value };

    if (newBookingData.pickup && newBookingData.destination) {
      const estimates = calculateFare(
        newBookingData.pickup,
        newBookingData.destination,
        selectedVehicle
      );
      newBookingData.estimatedFare = estimates.fare;
      newBookingData.estimatedTime = estimates.time;
      newBookingData.estimatedDistance = estimates.distance;
    }

    setBookingData(newBookingData);
  };

  const handleVehicleChange = (vehicleType: "F1" | "MotoGP") => {
    setSelectedVehicle(vehicleType);
    const estimates = calculateFare(
      bookingData.pickup,
      bookingData.destination,
      vehicleType
    );
    setBookingData((prev) => ({
      ...prev,
      vehicleType,
      estimatedFare: estimates.fare,
      estimatedTime: estimates.time,
      estimatedDistance: estimates.distance,
    }));
  };

  const handleBookRide = () => {
    if (!bookingData.pickup || !bookingData.destination) return;

    // Assign a driver based on vehicle type
    const availableDriver = mockDrivers.find(
      (d) => d.vehicle.type === selectedVehicle && d.isAvailable
    );

    if (availableDriver) {
      setAssignedDriver(availableDriver);
      setRideStage("confirmation");
    }
  };

  const handleRaceStart = () => {
    setRideStage("tracking");
    // Start driver location animation
    simulateDriverMovement();
  };

  const simulateDriverMovement = () => {
    let progress = 10;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 90) {
        setDriverLocation({ x: 85, y: 20 });
        setRideStage("completed");
        clearInterval(interval);
      } else {
        setDriverLocation({
          x: Math.min(10 + progress * 0.8, 85),
          y: Math.max(80 - progress * 0.6, 20),
        });
      }
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="racing-loader"></div>
      </div>
    );
  }

  const vehicleOptions = [
    {
      type: "F1" as const,
      icon: "🏎️",
      name: "Formula 1",
      description: "Premium racing car experience",
      baseRate: "₹15/km",
      color: "from-f1-red to-red-700",
    },
    {
      type: "MotoGP" as const,
      icon: "🏍️",
      name: "MotoGP Bike",
      description: "Fast and agile motorcycle ride",
      baseRate: "₹12/km",
      color: "from-motogp-neon to-green-600",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-racing text-white mb-2">
            BOOK YOUR RACE
          </h1>
          <p className="text-gray-400">
            Choose your racing experience and get ready for the ride of your
            life
          </p>
        </div>

        {/* Booking Stage */}
        {rideStage === "booking" && (
          <div className="space-y-8">
            {/* Location Inputs */}
            <div className="racing-card p-8">
              <h2 className="font-racing text-xl text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-f1-red" />
                SET YOUR RACING ROUTE
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                    <input
                      type="text"
                      value={bookingData.pickup}
                      onChange={(e) =>
                        handleLocationChange("pickup", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
                      placeholder="Enter pickup location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Destination
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-f1-red w-5 h-5" />
                    <input
                      type="text"
                      value={bookingData.destination}
                      onChange={(e) =>
                        handleLocationChange("destination", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
                      placeholder="Enter destination"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="racing-card p-8">
              <h2 className="font-racing text-xl text-white mb-6">
                CHOOSE YOUR RACING MACHINE
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {vehicleOptions.map((vehicle) => (
                  <div
                    key={vehicle.type}
                    onClick={() => handleVehicleChange(vehicle.type)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedVehicle === vehicle.type
                        ? `border-opacity-100 bg-gradient-to-br ${
                            vehicle.color
                          } bg-opacity-20 racing-glow-${
                            vehicle.type === "F1" ? "red" : "green"
                          }`
                        : "border-gray-700 border-opacity-50 hover:border-opacity-100"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3 vehicle-icon">
                        {vehicle.icon}
                      </div>
                      <h3 className="font-racing text-lg text-white mb-2">
                        {vehicle.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {vehicle.description}
                      </p>
                      <div
                        className={`text-sm font-bold ${
                          vehicle.type === "F1"
                            ? "text-f1-red"
                            : "text-motogp-neon"
                        }`}
                      >
                        {vehicle.baseRate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Estimate */}
            {bookingData.estimatedFare > 0 && (
              <div className="racing-card p-6">
                <h3 className="font-racing text-lg text-white mb-4">
                  RACE DETAILS
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <DollarSign className="w-6 h-6 mx-auto text-f1-red mb-2" />
                    <div className="text-xl font-bold text-white">
                      ₹{bookingData.estimatedFare}
                    </div>
                    <div className="text-xs text-gray-400">Estimated Fare</div>
                  </div>
                  <div>
                    <Clock className="w-6 h-6 mx-auto text-motogp-neon mb-2" />
                    <div className="text-xl font-bold text-white">
                      {bookingData.estimatedTime}m
                    </div>
                    <div className="text-xs text-gray-400">Est. Time</div>
                  </div>
                  <div>
                    <Navigation className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                    <div className="text-xl font-bold text-white">
                      {bookingData.estimatedDistance}km
                    </div>
                    <div className="text-xs text-gray-400">Distance</div>
                  </div>
                </div>
              </div>
            )}

            {/* Book Ride Button */}
            <div className="text-center">
              <button
                onClick={handleBookRide}
                disabled={!bookingData.pickup || !bookingData.destination}
                className={`btn-racing px-12 py-4 text-lg ${
                  !bookingData.pickup || !bookingData.destination
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                <Zap className="w-6 h-6 inline mr-2" />
                BOOK YOUR RACE
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Stage with Racing Start Light */}
        {rideStage === "confirmation" && assignedDriver && (
          <div className="space-y-8">
            {/* Driver Info */}
            <div className="racing-card p-8 text-center">
              <h2 className="font-racing text-2xl text-white mb-6">
                YOUR RACING DRIVER IS READY!
              </h2>

              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">
                      {assignedDriver.vehicle.icon}
                    </span>
                  </div>
                  <h3 className="font-racing text-lg text-white mb-1">
                    {assignedDriver.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {assignedDriver.racingNumber} • ⭐ {assignedDriver.rating}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {assignedDriver.totalRaces} races completed
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {assignedDriver.vehicle.icon}
                  </div>
                  <h4 className="font-racing text-white">
                    {assignedDriver.vehicle.model}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {assignedDriver.vehicle.plateNumber}
                  </p>
                </div>
              </div>

              {/* Trip Details */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{bookingData.pickup}</span>
                  </div>
                  <div className="text-gray-500">to</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-f1-red rounded-full"></div>
                    <span className="text-gray-300">
                      {bookingData.destination}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-8 text-center">
                  <div>
                    <div className="text-xl font-bold text-f1-red">
                      ₹{bookingData.estimatedFare}
                    </div>
                    <div className="text-xs text-gray-400">Total Fare</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {bookingData.estimatedTime}m
                    </div>
                    <div className="text-xs text-gray-400">Est. Time</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {bookingData.estimatedDistance}km
                    </div>
                    <div className="text-xs text-gray-400">Distance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Racing Start Light Component */}
            <RacingStartLight
              onRaceStart={handleRaceStart}
              isActive={true}
              disabled={false}
            />
          </div>
        )}

        {/* Tracking Stage */}
        {rideStage === "tracking" && assignedDriver && (
          <div className="space-y-8">
            <div className="racing-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-racing text-xl text-white">
                  RACE IN PROGRESS
                </h2>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-racing">LIVE TRACKING</span>
                </div>
              </div>

              {/* Live Map */}
              <MapView
                pickup={{
                  address: bookingData.pickup,
                  lat: 12.9716,
                  lng: 77.5946,
                }}
                destination={{
                  address: bookingData.destination,
                  lat: 12.9716,
                  lng: 77.5946,
                }}
                driverLocation={driverLocation}
                driverInfo={assignedDriver}
              />

              {/* Driver Status */}
              <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center">
                      <span className="text-lg">
                        {assignedDriver.vehicle.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-racing text-white">
                        {assignedDriver.name} is racing to you!
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {assignedDriver.vehicle.model} •{" "}
                        {assignedDriver.vehicle.plateNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-motogp-neon">
                      ~{Math.floor(Math.random() * 5 + 2)} min
                    </div>
                    <div className="text-xs text-gray-400">ETA</div>
                  </div>
                </div>
              </div>

              {/* Racing Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🏁</div>
                  <div className="text-sm text-gray-400">Current Lap</div>
                  <div className="font-racing text-white">
                    {user.totalRides + 1}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-gray-400">Avg Speed</div>
                  <div className="font-racing text-white">
                    {Math.floor(Math.random() * 20 + 25)} km/h
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm text-gray-400">Driver Rating</div>
                  <div className="font-racing text-white">
                    ⭐ {assignedDriver.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Stage */}
        {rideStage === "completed" && assignedDriver && (
          <div className="space-y-8 text-center">
            <div className="racing-card p-8">
              <div className="text-6xl mb-4">🏁</div>
              <h2 className="font-racing text-3xl text-white mb-4">
                RACE COMPLETED!
              </h2>
              <p className="text-gray-400 mb-8">
                Congratulations! You've successfully completed another lap in
                your racing journey.
              </p>

              {/* Race Summary */}
              <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                <h3 className="font-racing text-lg text-white mb-4">
                  RACE SUMMARY
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-f1-red">
                      ₹{bookingData.estimatedFare}
                    </div>
                    <div className="text-xs text-gray-400">Total Paid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {bookingData.estimatedDistance}km
                    </div>
                    <div className="text-xs text-gray-400">Distance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {bookingData.estimatedTime}m
                    </div>
                    <div className="text-xs text-gray-400">Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-motogp-neon">
                      +10
                    </div>
                    <div className="text-xs text-gray-400">Racing Points</div>
                  </div>
                </div>
              </div>

              {/* New Badge Earned */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-racing text-yellow-400">
                      NEW BADGE EARNED!
                    </div>
                    <div className="text-sm text-gray-300">
                      Speed Demon - Complete 5 rides
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setRideStage("booking");
                    setBookingData({
                      pickup: "",
                      destination: "",
                      vehicleType: "F1",
                      estimatedFare: 0,
                      estimatedTime: 0,
                      estimatedDistance: 0,
                    });
                    setAssignedDriver(null);
                  }}
                  className="btn-racing px-8 py-3 mr-4"
                >
                  <Zap className="w-5 h-5 inline mr-2" />
                  START ANOTHER RACE
                </button>
                <button
                  onClick={() => router.push("/history")}
                  className="btn-motogp px-8 py-3"
                >
                  VIEW RACE HISTORY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

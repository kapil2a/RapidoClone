"use client";

// components/ride/MapView.tsx
import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Zap } from "lucide-react";
import { Location, Driver } from "@/types";

interface MapViewProps {
  pickup: Location;
  destination: Location;
  driverLocation: { x: number; y: number };
  driverInfo?: Driver;
}

export default function MapView({
  pickup,
  destination,
  driverLocation,
  driverInfo,
}: MapViewProps) {
  const [mapTheme, setMapTheme] = useState<"F1" | "MotoGP">("F1");
  const [speedEffect, setSpeedEffect] = useState(false);

  useEffect(() => {
    if (driverInfo) {
      setMapTheme(driverInfo.vehicle.type);
    }
  }, [driverInfo]);

  useEffect(() => {
    // Add speed effect when driver moves
    setSpeedEffect(true);
    const timer = setTimeout(() => setSpeedEffect(false), 1000);
    return () => clearTimeout(timer);
  }, [driverLocation]);

  const themeStyles = {
    F1: {
      trackColor: "from-f1-red/20 to-red-900/20",
      gridColor: "border-f1-red/30",
      glowColor: "shadow-[0_0_30px_rgba(225,6,0,0.3)]",
      vehicleIcon: "🏎️",
    },
    MotoGP: {
      trackColor: "from-motogp-neon/20 to-green-900/20",
      gridColor: "border-motogp-neon/30",
      glowColor: "shadow-[0_0_30px_rgba(0,255,0,0.3)]",
      vehicleIcon: "🏍️",
    },
  };

  const currentTheme = themeStyles[mapTheme];

  return (
    <div className="racing-map h-96 relative overflow-hidden">
      {/* Racing Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`w-full h-full bg-gradient-to-br ${currentTheme.trackColor}`}
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Racing Track Lines */}
      <div className="absolute inset-0">
        {/* Curved racing line */}
        <svg className="w-full h-full" viewBox="0 0 400 384">
          <path
            d="M 50 320 Q 100 250, 200 280 T 350 180 T 250 50 T 100 120 T 200 200"
            stroke={mapTheme === "F1" ? "#E10600" : "#00FF00"}
            strokeWidth="3"
            strokeOpacity="0.3"
            fill="none"
            strokeDasharray="10,5"
          />
          {/* Racing line glow effect */}
          <path
            d="M 50 320 Q 100 250, 200 280 T 350 180 T 250 50 T 100 120 T 200 200"
            stroke={mapTheme === "F1" ? "#E10600" : "#00FF00"}
            strokeWidth="1"
            strokeOpacity="0.8"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Speed Lines Effect */}
      {speedEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "100%",
                animation: `speedLine 0.8s ease-out ${i * 0.1}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Pickup Location */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: "15%", top: "85%" }}
      >
        <div className="relative group">
          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <MapPin className="w-3 h-3 inline mr-1" />
            {pickup.address || "Pickup"}
          </div>
        </div>
      </div>

      {/* Destination Location */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: "85%", top: "15%" }}
      >
        <div className="relative group">
          <div
            className={`w-6 h-6 bg-f1-red rounded-full border-2 border-white ${currentTheme.glowColor}`}
          />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <Navigation className="w-3 h-3 inline mr-1" />
            {destination.address || "Destination"}
          </div>
        </div>
      </div>

      {/* Moving Driver Vehicle */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-2000 ease-linear"
        style={{
          left: `${driverLocation.x}%`,
          top: `${driverLocation.y}%`,
        }}
      >
        <div className="relative">
          {/* Vehicle Shadow */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-sm" />

          {/* Racing Vehicle */}
          <div
            className={`text-3xl vehicle-icon ${currentTheme.glowColor} ${
              speedEffect ? "animate-bounce" : ""
            }`}
          >
            {driverInfo?.vehicle.icon || currentTheme.vehicleIcon}
          </div>

          {/* Speed Trail Effect */}
          {speedEffect && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-0.5 bg-${
                    mapTheme === "F1" ? "red" : "green"
                  }-400 opacity-60`}
                  style={{
                    left: `-${(i + 1) * 8}px`,
                    animation: `fadeOut 0.8s ease-out forwards`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Driver Info Panel (if tracking) */}
      {driverInfo && (
        <div className="absolute top-4 left-4 right-4 z-40">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-f1-red to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">{driverInfo.vehicle.icon}</span>
                </div>
                <div>
                  <h4 className="font-racing text-white text-sm">
                    {driverInfo.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {driverInfo.vehicle.model} • {driverInfo.racingNumber}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-green-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-racing">EN ROUTE</span>
                </div>
                <p className="text-gray-400 text-xs">⭐ {driverInfo.rating}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Racing HUD Elements */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>LIVE TRACKING</span>
              </div>
              <div className="text-gray-400">
                Racing Mode:{" "}
                <span className="text-white font-racing">{mapTheme}</span>
              </div>
            </div>
            <div className="text-gray-400">
              Speed:{" "}
              <span className="text-motogp-neon">
                {Math.floor(Math.random() * 20 + 25)} km/h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Racing Corner Flags */}
      <div className="absolute top-4 right-4 z-30">
        <div className="w-8 h-6 checkered-bg rounded opacity-60"></div>
      </div>
      <div className="absolute bottom-4 right-4 z-30">
        <div className="w-8 h-6 checkered-bg rounded opacity-60"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-16 z-40">
        <button
          onClick={() => setMapTheme(mapTheme === "F1" ? "MotoGP" : "F1")}
          className="p-2 bg-gray-800/80 rounded-lg border border-gray-700 hover:bg-gray-700/80 transition-colors"
        >
          <span className="text-sm">{mapTheme === "F1" ? "🏍️" : "🏎️"}</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes speedLine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(300%);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 0.6;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-20px);
          }
        }
      `}</style>
    </div>
  );
}

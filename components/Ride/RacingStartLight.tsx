"use client";

// components/ride/RacingStartLight.tsx
import React, { useState, useEffect } from "react";
import { Zap, Flag } from "lucide-react";

interface RacingStartLightProps {
  onRaceStart: () => void;
  isActive: boolean;
  disabled?: boolean;
}

export default function RacingStartLight({
  onRaceStart,
  isActive,
  disabled = false,
}: RacingStartLightProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isSequenceRunning, setIsSequenceRunning] = useState(false);
  const [showGoButton, setShowGoButton] = useState(false);

  // F1 Start Light Sequence: 5 lights turn on one by one, then all go off = GO!
  const startRacingSequence = () => {
    if (disabled || isSequenceRunning) return;

    setIsSequenceRunning(true);
    setShowGoButton(false);
    setSequence([]);

    // Light up sequence (1-5)
    const intervals: NodeJS.Timeout[] = [];

    for (let i = 1; i <= 5; i++) {
      intervals.push(
        setTimeout(() => {
          setSequence((prev) => [...prev, i]);
        }, i * 800) // 800ms between each light
      );
    }

    // All lights off + GO! (after 5 seconds)
    intervals.push(
      setTimeout(() => {
        setSequence([]);
        setShowGoButton(true);
        setIsSequenceRunning(false);
      }, 5 * 800 + 1000)
    );

    // Auto-start race after GO appears
    intervals.push(
      setTimeout(() => {
        onRaceStart();
        setShowGoButton(false);
      }, 5 * 800 + 2500)
    );

    // Cleanup function
    return () => {
      intervals.forEach((interval) => clearTimeout(interval));
    };
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      {/* F1 Start Lights Grid */}
      <div className="racing-card p-8 bg-black/80 border-2 border-gray-700">
        <div className="mb-6 text-center">
          <h3 className="font-racing text-xl text-white mb-2">
            F1 START PROCEDURE
          </h3>
          <p className="text-gray-400 text-sm">
            Preparing your racing experience...
          </p>
        </div>

        {/* 5 Start Lights */}
        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3, 4, 5].map((lightNumber) => (
            <div
              key={lightNumber}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                  sequence.includes(lightNumber)
                    ? "bg-red-500 border-red-400 shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                    : "bg-gray-800 border-gray-600"
                }`}
              />
              <div className="text-xs text-gray-500 font-mono">
                {lightNumber}
              </div>
            </div>
          ))}
        </div>

        {/* Sequence Status */}
        <div className="text-center mb-6">
          {isSequenceRunning && !showGoButton && (
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <div className="racing-loader w-4 h-4"></div>
              <span className="font-racing text-sm">
                LIGHTS SEQUENCE ACTIVE
              </span>
            </div>
          )}

          {showGoButton && (
            <div className="animate-pulse">
              <div className="text-4xl font-racing text-green-400 mb-2 racing-glow-green">
                🟢 GO! GO! GO!
              </div>
              <p className="text-green-300 text-sm">Your race has started!</p>
            </div>
          )}

          {!isSequenceRunning && !showGoButton && sequence.length === 0 && (
            <p className="text-gray-400 text-sm">
              Press button to start F1 sequence
            </p>
          )}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={startRacingSequence}
            disabled={disabled || isSequenceRunning || showGoButton}
            className={`btn-racing px-8 py-4 text-lg ${
              disabled || isSequenceRunning || showGoButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105"
            }`}
          >
            {isSequenceRunning ? (
              <>
                <div className="racing-loader w-5 h-5 inline mr-2"></div>
                SEQUENCE RUNNING...
              </>
            ) : showGoButton ? (
              <>
                <Flag className="w-5 h-5 inline mr-2" />
                RACE STARTED!
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 inline mr-2" />
                CONFIRM RIDE
              </>
            )}
          </button>
        </div>
      </div>

      {/* Racing Information Panel */}
      <div className="racing-card p-6 max-w-md">
        <h4 className="font-racing text-lg mb-4 text-center text-white">
          🏁 RACING FACTS
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">F1 Start Procedure:</span>
            <span className="text-white">5 Red Lights</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Light Interval:</span>
            <span className="text-white">0.8 seconds</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Sequence:</span>
            <span className="text-white">~6 seconds</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Race Start:</span>
            <span className="text-green-400">All lights OFF!</span>
          </div>
        </div>
      </div>

      {/* Sequence Progress Bar */}
      {isSequenceRunning && (
        <div className="w-full max-w-md">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Sequence Progress</span>
            <span>{sequence.length}/5 lights</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-f1-red to-red-600 transition-all duration-800 racing-glow-red"
              style={{ width: `${(sequence.length / 5) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

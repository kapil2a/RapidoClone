// components/ui/Modal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: "success" | "error" | "info" | "warning";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = "info",
}: ModalProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✅",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/50",
          textColor: "text-green-300",
        };
      case "error":
        return {
          icon: "❌",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/50",
          textColor: "text-red-300",
        };
      case "warning":
        return {
          icon: "⚠️",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/50",
          textColor: "text-yellow-300",
        };
      default:
        return {
          icon: "ℹ️",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/50",
          textColor: "text-blue-300",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-lg border border-gray-700 max-w-md w-full mx-4 racing-glow-red">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{styles.icon}</span>
            <h2 className="text-xl font-racing text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className={`p-4 rounded-lg ${styles.bgColor} ${styles.borderColor} border`}
          >
            <div className={styles.textColor}>{children}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-700">
          <button onClick={onClose} className="btn-racing px-6 py-2">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

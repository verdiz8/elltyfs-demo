// components/AuthModal.tsx
"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  onAuth: () => void;
}

export default function AuthModal({ onAuth }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthSuccess = () => {
    setIsOpen(false);
    onAuth();
  };

  return (
    <>
      {/* Login Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
      >
        Login / Register
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="relative w-full max-w-md rounded-lg bg-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Auth Form */}
            <div className="p-6">
              <AuthForm onAuth={handleAuthSuccess} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

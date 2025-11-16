// components/AuthForm.tsx
"use client";

import { useState } from "react";

interface AuthFormProps {
  onAuth: () => void;
}

export default function AuthForm({ onAuth }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form
        setUsername("");
        setPassword("");
        // Trigger auth refresh in parent
        onAuth();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-xl font-bold">{isLogin ? "Login" : "Register"}</h2>

      {error && <div className="mb-4 rounded bg-red-600 p-3 text-white">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
        }}
        className="mt-4 w-full text-sm text-blue-400 hover:text-blue-300"
      >
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </div>
  );
}

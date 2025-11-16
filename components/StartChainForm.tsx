// components/StartChainForm.tsx
"use client";

import { useState } from "react";

interface StartChainFormProps {
  onSuccess: () => void;
}

export default function StartChainForm({ onSuccess }: StartChainFormProps) {
  const [startingNumber, setStartingNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startingNumber || isNaN(Number(startingNumber))) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: Number(startingNumber),
        }),
      });

      if (response.ok) {
        setStartingNumber("");
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to start chain:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="number"
        value={startingNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartingNumber(e.target.value)}
        className="w-32 rounded bg-gray-700 px-3 py-2 text-white"
        placeholder="Starting number"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {isSubmitting ? "Starting..." : "Start Chain"}
      </button>
    </form>
  );
}

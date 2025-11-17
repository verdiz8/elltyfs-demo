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
      } else {
        const error = await response.json();
        alert(error.error || "Failed to start chain");
      }
    } catch (error) {
      console.error("Failed to start chain:", error);
      alert("Failed to start chain");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-gray-800 p-4">
      <h3 className="mb-3 text-lg font-semibold">Start a New Calculation Chain</h3>
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-gray-400">Starting Number</label>
          <input
            type="number"
            value={startingNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartingNumber(e.target.value)}
            className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            placeholder="Enter a number to start..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-green-600 px-6 py-2 whitespace-nowrap text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Starting..." : "Start Chain"}
        </button>
      </form>
    </div>
  );
}

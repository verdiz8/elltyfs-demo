// components/ReplyForm.tsx
"use client";

import { useState } from 'react';
import { CalculationNode } from '@/types';

interface ReplyFormProps {
  parentNode: CalculationNode;
  onSuccess: () => void;
}

export default function ReplyForm({ parentNode, onSuccess }: ReplyFormProps) {
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');
  const [rightOperand, setRightOperand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rightOperand || isNaN(Number(rightOperand))) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId: parentNode._id,
          operation,
          rightOperand: Number(rightOperand)
        }),
      });

      if (response.ok) {
        setRightOperand('');
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-gray-700 rounded-lg">
      <div className="flex space-x-2 items-end">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="bg-gray-600 text-white rounded px-2 py-1"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Number</label>
          <input
            type="number"
            value={rightOperand}
            onChange={(e) => setRightOperand(e.target.value)}
            className="bg-gray-600 text-white rounded px-2 py-1 w-24"
            placeholder="Enter number"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
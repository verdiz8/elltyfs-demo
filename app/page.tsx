// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { CalculationNode } from '@/types';
import TreeView from '@/components/TreeView';
import AuthForm from '@/components/AuthForm';
import StartChainForm from '@/components/StartChainForm';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [tree, setTree] = useState<CalculationNode[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch('/api/tree')
      .then(res => res.json())
      .then(setTree)
      .catch(console.error);
  }, [refresh]);

  const refreshTree = () => setRefresh(prev => prev + 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Number Communication
          </h1>
          <p className="text-gray-400 text-center">
            Communicate through mathematical operations
          </p>
        </header>

        {!user ? (
          <div className="max-w-md mx-auto">
            <AuthForm onAuth={refreshTree} />
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <p>Welcome, {user.username}!</p>
              <StartChainForm onSuccess={refreshTree} />
            </div>
          </div>
        )}

        <TreeView nodes={tree} currentUser={user} onUpdate={refreshTree} />
      </div>
    </div>
  );
}
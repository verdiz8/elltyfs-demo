// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CalculationNode } from "@/types";
import TreeView from "@/components/TreeView";
import AuthForm from "@/components/AuthForm";
import StartChainForm from "@/components/StartChainForm";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isLoading, refreshAuth } = useAuth();
  const [tree, setTree] = useState<CalculationNode[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("/api/tree")
      .then((res) => res.json())
      .then(setTree)
      .catch(console.error);
  }, [refresh]);

  const refreshTree = () => setRefresh((prev) => prev + 1);

  const handleAuthSuccess = () => {
    refreshAuth(); // Refresh auth state
    refreshTree(); // Refresh tree data
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="mb-2 text-center text-4xl font-bold">Number Communication</h1>
          <p className="text-center text-gray-400">Communicate through mathematical operations</p>
        </header>

        {!user ? (
          <div className="mx-auto max-w-md">
            <AuthForm onAuth={handleAuthSuccess} />
          </div>
        ) : (
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p>Welcome, {user.username}!</p>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    refreshAuth();
                    refreshTree();
                  }}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
              <StartChainForm onSuccess={refreshTree} />
            </div>
          </div>
        )}

        <TreeView nodes={tree} currentUser={user} onUpdate={refreshTree} />
      </div>
    </div>
  );
}

// components/TreeNode.tsx
"use client";

import { useState } from "react";
import { CalculationNode, AuthUser } from "@/types";
import ReplyForm from "./ReplyForm";

interface TreeNodeProps {
  node: CalculationNode;
  currentUser: AuthUser | null;
  onUpdate: () => void;
}

export default function TreeNode({ node, currentUser, onUpdate }: TreeNodeProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const marginLeft = node.depth * 24;

  const handleReplyClick = (): void => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySuccess = (): void => {
    setShowReplyForm(false);
    onUpdate();
  };

  return (
    <div style={{ marginLeft: `${marginLeft}px` }} className="border-l-2 border-gray-600 py-2 pl-4">
      <div className="rounded-lg bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-blue-400">{node.value}</span>
            {node.operation && (
              <span className="text-sm text-gray-400">
                ({node.operation} {node.rightOperand})
              </span>
            )}
          </div>

          <div className="text-right text-sm text-gray-400">
            <div>by {node.username}</div>
            <div>{new Date(node.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        {currentUser && (
          <div className="mt-2">
            <button
              onClick={handleReplyClick}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {showReplyForm && <ReplyForm parentNode={node} onSuccess={handleReplySuccess} />}
          </div>
        )}
      </div>
    </div>
  );
}

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

  // reduced indentation
  const marginLeft = node.depth * 16;

  const handleReplyClick = () => setShowReplyForm(!showReplyForm);
  const handleReplySuccess = () => {
    setShowReplyForm(false);
    onUpdate();
  };

  const isRoot = node.parentId === null;

  return (
    <div style={{ marginLeft }} className="border-l border-gray-700 py-1 pl-3">
      <div className="rounded-md bg-gray-800 p-2">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`text-xl font-semibold ${isRoot ? "text-blue-400" : "text-violet-300"}`}
            >
              {node.value}
            </span>

            {node.operation && (
              <span className={`text-sm ${isRoot ? "text-orange-300" : "text-gray-400"}`}>
                ({node.operation} {node.rightOperand})
              </span>
            )}
          </div>

          <div className="text-right leading-tight text-gray-500">
            <div className="text-sm">
              by{" "}
              <span className={isRoot ? "text-blue-400" : "text-violet-300"}>{node.username}</span>
            </div>
            <div className="text-xs">{new Date(node.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Reply button */}
        {currentUser && (
          <div className="mt-1">
            <button
              onClick={handleReplyClick}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {showReplyForm && (
              <div className="mt-2">
                <ReplyForm parentNode={node} onSuccess={handleReplySuccess} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

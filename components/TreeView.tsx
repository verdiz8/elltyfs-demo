// components/TreeView.tsx
"use client";

import { CalculationNode, AuthUser } from "@/types";
import TreeNode from "./TreeNode";

interface TreeViewProps {
  nodes: CalculationNode[];
  currentUser: AuthUser | null;
  onUpdate: () => void;
}

export default function TreeView({ nodes, currentUser, onUpdate }: TreeViewProps) {
  // Build tree structure with proper typing
  const buildTree = (parentId: string | null = null, depth = 0): CalculationNode[] => {
    return nodes
      .filter((node: CalculationNode) => node.parentId === parentId)
      .sort(
        (a: CalculationNode, b: CalculationNode) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .flatMap((node: CalculationNode) => [{ ...node, depth }, ...buildTree(node._id, depth + 1)]);
  };

  const treeNodes = buildTree();

  if (treeNodes.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No calculations yet. {currentUser && "Start a chain by posting a number!"}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {treeNodes.map((node: CalculationNode) => (
        <TreeNode key={node._id} node={node} currentUser={currentUser} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

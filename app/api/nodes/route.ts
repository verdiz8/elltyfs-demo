// app/api/nodes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { DbUser, InsertCalculationNode, DbCalculationNode } from "@/types/db";
import { ObjectId } from "mongodb";

interface CreateNodeBody {
  value?: number;
  parentId?: string;
  operation?: "+" | "-" | "*" | "/";
  rightOperand?: number;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body: CreateNodeBody = await request.json();
    const { value, parentId, operation, rightOperand } = body;

    const db = await getDb();
    const users = db.collection<DbUser>("users");
    const nodes = db.collection<InsertCalculationNode>("nodes");

    // Get user info
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    let calculatedValue: number;
    let depth = 0;

    if (parentId) {
      // This is a reply - get parent node and calculate new value
      const parentCollection = db.collection<DbCalculationNode>("nodes");
      const parentNode = await parentCollection.findOne({ _id: new ObjectId(parentId) });

      if (!parentNode) {
        return NextResponse.json({ error: "Parent node not found" }, { status: 404 });
      }

      depth = parentNode.depth + 1;

      // Calculate new value based on operation
      switch (operation) {
        case "+":
          calculatedValue = parentNode.value + Number(rightOperand);
          break;
        case "-":
          calculatedValue = parentNode.value - Number(rightOperand);
          break;
        case "*":
          calculatedValue = parentNode.value * Number(rightOperand);
          break;
        case "/":
          if (Number(rightOperand) === 0) {
            return NextResponse.json({ error: "Division by zero is not allowed" }, { status: 400 });
          }
          calculatedValue = parentNode.value / Number(rightOperand);
          break;
        default:
          return NextResponse.json({ error: "Invalid operation" }, { status: 400 });
      }
    } else {
      // This is a starting number
      if (value === undefined || value === null) {
        return NextResponse.json({ error: "Starting number is required" }, { status: 400 });
      }
      calculatedValue = Number(value);
    }

    // Create new node
    const nodeData: InsertCalculationNode = {
      value: calculatedValue,
      parentId: parentId ? new ObjectId(parentId) : null,
      operation: operation || null,
      rightOperand: rightOperand || null,
      userId: new ObjectId(userId),
      username: user.username,
      depth: depth,
      createdAt: new Date(),
    };

    const result = await nodes.insertOne(nodeData);

    return NextResponse.json(
      {
        message: "Node created successfully",
        nodeId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create node error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const nodes = db.collection<DbCalculationNode>("nodes");

    const allNodes = await nodes.find().sort({ createdAt: 1 }).toArray();

    // Convert ObjectId to string for the frontend
    const serializedNodes = allNodes.map((node) => ({
      _id: node._id.toString(),
      value: node.value,
      parentId: node.parentId ? node.parentId.toString() : null,
      operation: node.operation,
      rightOperand: node.rightOperand,
      userId: node.userId.toString(),
      username: node.username,
      createdAt: node.createdAt,
      depth: node.depth,
    }));

    return NextResponse.json(serializedNodes);
  } catch (error) {
    console.error("Get nodes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

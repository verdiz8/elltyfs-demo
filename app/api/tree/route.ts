// app/api/tree/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const nodes = db.collection("nodes");

    const allNodes = await nodes.find().sort({ createdAt: 1 }).toArray();

    return NextResponse.json(allNodes);
  } catch (error) {
    console.error("Get tree error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

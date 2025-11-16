// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { DbUser } from "@/types/db";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(null);
    }

    const db = await getDb();
    const users = db.collection<DbUser>("users");
    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      const response = NextResponse.json(null);
      response.cookies.delete("userId");
      return response;
    }

    return NextResponse.json({
      id: user._id.toString(),
      username: user.username,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}

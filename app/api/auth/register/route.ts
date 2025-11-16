// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

interface RegisterBody {
  username?: string;
  password?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await users.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const response = NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );

    response.cookies.set("userId", result.insertedId.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

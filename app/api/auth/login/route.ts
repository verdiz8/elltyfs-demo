// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { DbUser } from "@/types/db";

interface LoginBody {
  username?: string;
  password?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginBody = await request.json();
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection<DbUser>("users");

    // Find user
    const user = await users.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id.toString(), username: user.username },
      },
      { status: 200 }
    );

    response.cookies.set("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

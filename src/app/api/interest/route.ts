import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, postcode, suburb } = await request.json();

    const interest = await prisma.interest.create({
      data: {
        email,
        postcode,
        suburb,
      },
    });

    return NextResponse.json({ success: true, data: interest });
  } catch (err) {
    console.error('Error in interest route:', err);
    return NextResponse.json(
      { success: false, error: "Failed to register interest" },
      { status: 500 }
    );
  }
}

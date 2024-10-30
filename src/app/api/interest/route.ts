import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, address, suburb, postcode } = body;

    // Validate input
    if (!email || !address || !suburb || !postcode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Attempting to create interest with:", { email, address, suburb, postcode });

    const interest = await prisma.interest.create({
      data: {
        email,
        address,
        suburb,
        postcode,
      },
    });

    console.log("Interest created:", interest);
    return NextResponse.json(interest, { status: 201 });
  } catch (error) {
    console.error("Interest registration error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to register interest" },
      { status: 500 }
    );
  }
}

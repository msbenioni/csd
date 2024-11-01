import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate postcode
    if (!data.postcode.startsWith("2")) {
      return NextResponse.json(
        { error: "Service not available in this area" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        streetAddress: data.streetAddress,
        suburb: data.suburb,
        postcode: data.postcode,
        email: data.email,
        pickupDate: new Date(data.pickupDate),
        status: "PENDING",
      },
    });

    // Here you could add email notification logic
    // await sendConfirmationEmail(booking);

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

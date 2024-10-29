import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      date,
      time,
      frequency,
      numberOfBags,
      location,
      autoDeduct,
      customerEmail,
      customerName,
      customerPhone,
    } = body;

    // Check if time slot is available
    const timeSlot = await prisma.timeSlot.findUnique({
      where: {
        date_time: {
          date: new Date(date),
          time: time,
        },
      },
    });

    if (timeSlot && !timeSlot.available) {
      return NextResponse.json(
        { error: "Time slot no longer available" },
        { status: 400 }
      );
    }

    const totalAmount = calculatePrice(numberOfBags);

    const booking = await prisma.$transaction(async (prisma) => {
      // ... rest of the existing POST logic ...
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

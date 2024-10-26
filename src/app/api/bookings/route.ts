// app/api/bookings/route.ts
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

    // Calculate total amount
    const totalAmount = calculatePrice(numberOfBags);

    // Start a transaction to ensure data consistency
    const booking = await prisma.$transaction(async (prisma) => {
      // Find or create customer
      const customer = await prisma.customer.upsert({
        where: { email: customerEmail },
        update: {
          name: customerName,
          phone: customerPhone,
        },
        create: {
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
        },
      });

      // Create booking
      const booking = await prisma.booking.create({
        data: {
          date: new Date(date),
          time,
          frequency,
          numberOfBags,
          location,
          autoDeduct,
          totalAmount,
          customerId: customer.id,
        },
      });

      // Mark time slot as unavailable
      await prisma.timeSlot.upsert({
        where: {
          date_time: {
            date: new Date(date),
            time,
          },
        },
        update: {
          available: false,
        },
        create: {
          date: new Date(date),
          time,
          available: false,
        },
      });

      return booking;
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

// Get available time slots
export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        date: new Date(date),
        available: true,
      },
      orderBy: {
        time: "asc",
      },
    });

    return NextResponse.json(timeSlots);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch time slots" },
      { status: 500 }
    );
  }
}

// app/api/subscriptions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, frequency, customerId } = body;

    // Get the original booking
    const originalBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!originalBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Calculate next booking dates based on frequency
    const nextDates = calculateNextBookingDates(
      new Date(originalBooking.date),
      frequency,
      4 // Create next 4 bookings
    );

    // Create future bookings
    const futureBookings = await Promise.all(
      nextDates.map((date) =>
        prisma.booking.create({
          data: {
            date,
            time: originalBooking.time,
            frequency,
            numberOfBags: originalBooking.numberOfBags,
            location: originalBooking.location,
            autoDeduct: originalBooking.autoDeduct,
            totalAmount: originalBooking.totalAmount,
            customerId,
            status: "pending",
          },
        })
      )
    );

    return NextResponse.json(futureBookings);
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

function calculateNextBookingDates(
  startDate: Date,
  frequency: string,
  count: number
): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < count; i++) {
    switch (frequency) {
      case "daily":
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case "weekly":
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    dates.push(new Date(currentDate));
  }

  return dates;
}

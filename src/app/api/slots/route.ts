import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, TimeSlot, SortOrder } from "@prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const format = url.searchParams.get("format");

  console.log("Received request for date:", date, "format:", format);

  try {
    // Create a date range for the selected date (midnight to midnight)
    let startDate, endDate;
    if (date) {
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
    }

    const baseQuery = {
      where: date
        ? {
            date: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {},
      orderBy: [{ date: SortOrder.asc }, { time: SortOrder.asc }],
    };

    console.log("Executing query with params:", baseQuery);

    const slots = await prisma.timeSlot.findMany(baseQuery);
    console.log("Found slots:", slots);

    if (format === "calendar") {
      const formattedSlots = slots.map((slot: TimeSlot) => {
        const startDateTime = getStartDate(slot);
        return {
          id: slot.id,
          title: `Available at ${slot.time}`,
          start: startDateTime,
          end: getEndDate(startDateTime),
          allDay: false,
          isUnavailable: !slot.available,
        };
      });
      console.log("Returning calendar format:", formattedSlots);
      return NextResponse.json({ events: formattedSlots });
    }

    // Generate default time slots if none exist for the date
    if (date && slots.length === 0) {
      const defaultSlots = generateDefaultTimeSlots(new Date(date));
      console.log("Generated default slots:", defaultSlots);
      return NextResponse.json(defaultSlots);
    }

    console.log("Returning raw format:", slots);
    return NextResponse.json(slots);
  } catch (error) {
    console.error("Detailed error in slots route:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: "Failed to fetch slots", details: errorMessage },
      { status: 500 }
    );
  }
}

function getStartDate(slot: TimeSlot) {
  const startDate = new Date(slot.date);
  const [hours, minutes] = (slot.time || "00:00").split(":").map(Number);
  startDate.setHours(hours || 0, minutes || 0);
  return startDate;
}

function getEndDate(startDate: Date) {
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);
  return endDate;
}

function generateDefaultTimeSlots(date: Date) {
  const slots = [];
  const startHour = 7;
  const endHour = 16;

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minutes of [0, 30]) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minutes, 0, 0);

      slots.push({
        id: `default-${slotDate.getTime()}`,
        date: slotDate,
        time: `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`,
        available: true,
      });
    }
  }

  return slots;
}

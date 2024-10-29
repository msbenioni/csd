import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const format = url.searchParams.get("format"); // 'calendar' or 'raw'

  try {
    const baseQuery = {
      where: {
        available: true,
        ...(date && { date: new Date(date) }),
      },
      orderBy: {
        date: Prisma.SortOrder.asc
      },
    };

    const slots = await prisma.timeSlot.findMany(baseQuery);

    // Return calendar format if requested
    if (format === 'calendar') {
      const formattedSlots = slots.map(slot => ({
        id: slot.id,
        title: `Available at ${slot.time}`,
        start: getStartDate(slot),
        end: getEndDate(getStartDate(slot)),
        allDay: false
      }));
      return NextResponse.json({ events: formattedSlots });
    }

    // Return raw format
    return NextResponse.json(slots);
  } catch (error) {
    console.error("Failed to fetch slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

function getStartDate(slot: any) {  // Define proper TimeSlot type
  const startDate = new Date(slot.date);
  const [hours, minutes] = (slot.time || "00:00").split(':').map(Number);
  startDate.setHours(hours || 0, minutes || 0);
  return startDate;
}

function getEndDate(startDate: Date) {
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);
  return endDate;
}

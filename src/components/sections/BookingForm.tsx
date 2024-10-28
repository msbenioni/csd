"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { DynamicCalendarWithRouter } from "@/components/DynamicCalendar";

export function BookingForm({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Select a Date and Time
      </h2>
      <DynamicCalendarWithRouter isAdmin={isAdmin} router={router} />
    </Card>
  );
}

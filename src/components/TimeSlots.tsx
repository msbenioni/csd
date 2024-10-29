import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import "./TimeSlots.css";

interface Slot {
  id: string;
  start: Date;
  end: Date;
  title: string;
  isUnavailable?: boolean;
}

interface TimeSlotsProps {
  date: Date;
  slots: Slot[];
  onSelectTime: (time: Date) => void;
}

export function TimeSlots({ date, slots, onSelectTime }: TimeSlotsProps) {
  const availableSlots = generateAvailableSlots(date, slots);

  return (
    <div>
      <h3>Available time slots for {moment(date).format("MMMM D, YYYY")}</h3>
      <div className="grid grid-cols-4 gap-2 p-4">
        {availableSlots.map((slot) => (
          <Button
            key={slot.getTime()}
            onClick={() => onSelectTime(slot)}
            variant="outline"
            className="w-full"
          >
            {moment(slot).format("h:mm A")}
          </Button>
        ))}
      </div>
    </div>
  );
}

function generateAvailableSlots(date: Date, bookedSlots: Slot[]): Date[] {
  const startTime = moment(date).hour(7).minute(0);
  const endTime = moment(date).hour(16).minute(0);
  const slots: Date[] = [];

  while (startTime.isBefore(endTime)) {
    const currentSlot = startTime.toDate();
    const isBooked = bookedSlots.some(
      (slot) =>
        moment(slot.start).isSame(currentSlot) ||
        (moment(slot.start).isBefore(currentSlot) &&
          moment(slot.end).isAfter(currentSlot))
    );

    if (!isBooked) {
      slots.push(currentSlot);
    }

    startTime.add(30, "minutes");
  }

  return slots;
}

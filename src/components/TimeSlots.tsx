import React, { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Slot } from "@/app/api/types/slots";
import styles from "./TimeSlots.module.css";

interface TimeSlotsProps {
  date: Date;
  slots: Slot[];
  onSelectTime: (time: Date) => void;
  selectedDate: Date;
}

export function TimeSlots({
  date,
  slots,
  onSelectTime,
  selectedDate,
}: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const availableSlots = generateAvailableSlots(date, slots);

  const handleSelectTime = (time: Date) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  const isDateSelected = moment(date).isSame(selectedDate, "day");

  return (
    <div className={styles.container}>
      <h3
        className={`text-lg text-center p-4 rounded-lg ${
          isDateSelected ? "bg-primary text-white" : ""
        }`}
      >
        Select a time for {moment(date).format("MMMM D, YYYY")}
      </h3>
      <div className={styles.grid}>
        {availableSlots.map((slot) => (
          <Button
            key={slot.getTime()}
            onClick={() => handleSelectTime(slot)}
            variant="outline"
            className={`w-full hover:bg-primary hover:text-white ${
              selectedTime?.getTime() === slot.getTime()
                ? "bg-primary text-white"
                : ""
            }`}
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

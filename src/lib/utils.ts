// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface Booking {
  date: string;
  time: string;
}

export function calculatePrice(numberOfBags: number): number {
  const removalFee = numberOfBags > 2 ? 6 : 0;
  const bagFee = numberOfBags * 8;
  return removalFee + bagFee;
}

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 7; hour <= 16; hour++) {
    for (const minute of ["00", "30"]) {
      if (hour < 16 || (hour === 16 && minute === "00")) {
        slots.push(`${hour.toString().padStart(2, "0")}:${minute}`);
      }
    }
  }
  return slots;
}

export function isTimeSlotAvailable(
  selectedDate: Date,
  selectedTime: string,
  existingBookings: Booking[]
): boolean {
  const bookingDate = selectedDate.toISOString().split("T")[0];
  return !existingBookings.some(
    (booking) =>
      booking.date.split("T")[0] === bookingDate &&
      booking.time === selectedTime
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(amount);
}

export function getNextAvailableSlot(
  date: Date,
  existingBookings: Booking[]
): { date: Date; time: string } | null {
  const timeSlots = generateTimeSlots();
  const currentDate = new Date(date);

  for (let i = 0; i < 7; i++) {
    for (const time of timeSlots) {
      if (isTimeSlotAvailable(currentDate, time, existingBookings)) {
        return { date: currentDate, time };
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

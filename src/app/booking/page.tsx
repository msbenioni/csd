import React from "react";
import { BookingForm } from "@/components/sections/BookingForm";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Rubbish Removal</h1>
      <BookingForm />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export function BookingForm() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleRecurringChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRecurring(event.target.checked);
  };

  return (
    <Card className="p-6">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700"
          >
            Service
          </label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic Cleaning</SelectItem>
              <SelectItem value="deep">Deep Cleaning</SelectItem>
              <SelectItem value="move-in-out">Move In/Out Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            className="rounded-md border"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <Input type="time" id="time" />
        </div>

        <div className="flex items-center">
          <Checkbox
            id="recurring"
            checked={isRecurring}
            onChange={handleRecurringChange}
          />
          <label htmlFor="recurring" className="ml-2 text-sm text-gray-700">
            Recurring service
          </label>
        </div>

        <Button type="submit" className="w-full">
          Book Now
        </Button>
      </form>
    </Card>
  );
}

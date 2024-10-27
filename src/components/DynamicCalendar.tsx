import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TimeSlots } from "./TimeSlots";
import { AppRouterInstance } from "next/navigation";
import { Button } from "@/components/ui/button";
import styles from "./DynamicCalendar.module.css";

const localizer = momentLocalizer(moment);

interface Slot {
  id: string;
  start: Date;
  end: Date;
  title: string;
  isUnavailable?: boolean;
}

interface DynamicCalendarProps {
  isAdmin: boolean;
  onConfirm: () => void;
}

export function DynamicCalendar({ isAdmin, onConfirm }: DynamicCalendarProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    // Replace this with your actual API call
    const response = await fetch("/api/slots");
    const data = await response.json();
    setSlots(data);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setSelectedTime(null);
  };

  const handleCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm();
    }
  };

  const bookSlot = async (date: Date) => {
    // Replace this with your actual API call to book a slot
    await fetch("/api/book-slot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: date,
        end: new Date(date.getTime() + 3600000),
      }),
    });
    setMessage("Slot booked successfully!");
  };

  const blockUnavailableTime = async (date: Date) => {
    // Replace this with your actual API call to block off unavailable time
    await fetch("/api/block-unavailable-time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: date,
        end: new Date(date.getTime() + 3600000),
      }),
    });
    setMessage("Time blocked successfully!");
  };

  const eventStyleGetter = (event: Slot) => {
    if (event.isUnavailable) {
      return {
        style: {
          backgroundColor: "red",
          opacity: 0.8,
        },
      };
    }
    return {};
  };

  const isCurrentMonth = currentMonth.getMonth() === new Date().getMonth() &&
                         currentMonth.getFullYear() === new Date().getFullYear();

  const isNextMonth = currentMonth.getMonth() === new Date().getMonth() + 1 &&
                      currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.controlsContainer}>
        <Button 
          onClick={handleCurrentMonth} 
          className={styles.button}
          disabled={isCurrentMonth}
        >
          Current Month
        </Button>
        <h2>{moment(currentMonth).format("MMMM YYYY")}</h2>
        <Button
          onClick={handleNextMonth}
          className={styles.button}
          disabled={isNextMonth}
        >
          Next Month
        </Button>
      </div>
      <div className={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={slots}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          view="month"
          date={currentMonth}
          onNavigate={() => {}}
          toolbar={false}
          eventPropGetter={eventStyleGetter}
          views={["month"]}
        />
      </div>
      {selectedDate && (
        <TimeSlots
          date={selectedDate}
          slots={slots}
          onSelectTime={(time) => setSelectedTime(time)}
        />
      )}
      {selectedDate && selectedTime && (
        <Button onClick={handleConfirm} className={`mt-4 ${styles.button}`}>
          Book Pickup
        </Button>
      )}
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}

// Higher-order component to provide router functionality
interface DynamicCalendarWithRouterProps
  extends Omit<DynamicCalendarProps, "onConfirm"> {
  router: AppRouterInstance;
}

export function DynamicCalendarWithRouter({
  router,
  ...props
}: DynamicCalendarWithRouterProps) {
  return (
    <DynamicCalendar {...props} onConfirm={() => router.push("/checkout")} />
  );
}

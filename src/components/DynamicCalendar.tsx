import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TimeSlots } from "./TimeSlots";
import { useRouter } from "next/navigation";
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
    const today = new Date();
    const nextAllowedMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    if (currentMonth < nextAllowedMonth) {
      setCurrentMonth(nextAllowedMonth);
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm();
    }
  };

  const bookSlot = async (date: Date) => {
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
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          color: "white",
          borderRadius: "5px",
        },
      };
    }
    return {
      style: {
        backgroundColor: "rgba(64, 224, 208, 0.8)",
        color: "white",
        borderRadius: "5px",
      },
    };
  };

  const isCurrentMonth =
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  const isNextMonth =
    currentMonth.getMonth() === new Date().getMonth() + 1 &&
    currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.calendarWrapper} pt-24`}>
        <div className={styles.controlsContainer}>
          <Button
            onClick={handleCurrentMonth}
            className={`${styles.button} ${
              isCurrentMonth ? styles.disabled : ""
            }`}
          >
            Current Month
          </Button>
          <h2>{moment(currentMonth).format("MMMM YYYY")}</h2>
          <Button
            onClick={handleNextMonth}
            className={`${styles.button} ${isNextMonth ? styles.disabled : ""}`}
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
    </div>
  );
}

// Higher-order component to provide router functionality
interface DynamicCalendarWithRouterProps
  extends Omit<DynamicCalendarProps, "onConfirm"> {
  router: ReturnType<typeof useRouter>;
}

export function DynamicCalendarWithRouter({
  router,
  ...props
}: DynamicCalendarWithRouterProps) {
  return (
    <DynamicCalendar {...props} onConfirm={() => router.push("/checkout")} />
  );
}

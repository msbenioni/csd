import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TimeSlots } from "./TimeSlots";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slot } from '../app/api/types/slots';
import styles from "./DynamicCalendar.module.css";

const localizer = momentLocalizer(moment);

interface DynamicCalendarProps {
  isAdmin: boolean;
  onConfirm: () => void;
}

export function DynamicCalendar({ isAdmin, onConfirm }: DynamicCalendarProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await fetch("/api/slots");
      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if data is an array, if not, use the correct property or empty array
      const slotsArray = Array.isArray(data) ? data : (data.slots || []);
      
      const formattedSlots = slotsArray.map((slot: Slot) => ({
        id: slot.id,
        date: new Date(slot.date),
        time: slot.time,
        available: slot.available,
        start: new Date(`${slot.date}T${slot.time}`),
        end: new Date(`${slot.date}T${slot.time}`),
        title: `Available at ${slot.time}`
      }));
      setSlots(formattedSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]);
    }
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const clickDate = new Date(slotInfo.start);
    const today = new Date();
    // Reset hours to start of day for both dates
    clickDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Only allow selection if date is today or in the future
    if (clickDate.getTime() >= today.getTime()) {
      setSelectedDate(clickDate);
      setSelectedTime(null);
    }
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

  const eventStyleGetter = (event: Slot) => {
    if (event.isUnavailable) {
      return {
        className: "bg-red-500/50 rounded",
      };
    }
    return {
      className:
        "bg-primary/80 hover:bg-primary hover:text-white transition-colors rounded",
    };
  };

  return (
    <div className={`${styles.pageWrapper} bg-gradient-to-br from-[#8b1e3f] to-[#1f2a44] p-5`}>
      <div className={`${styles.calendarWrapper} bg-white/10 p-8 rounded-lg`}>
        <div className={styles.controlsContainer}>
          <Button
            onClick={handleCurrentMonth}
            className={`transition-all ${
              currentMonth.getMonth() === new Date().getMonth() &&
              currentMonth.getFullYear() === new Date().getFullYear()
                ? "opacity-50 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            Current Month
          </Button>
          <h2 className="font-bold text-white text-2xl">
            {moment(currentMonth).format("MMMM YYYY")}
          </h2>
          <Button
            onClick={handleNextMonth}
            className={`transition-all ${
              currentMonth.getMonth() === new Date().getMonth() + 1 &&
              currentMonth.getFullYear() === new Date().getFullYear()
                ? "opacity-50 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            Next Month
          </Button>
        </div>

        <div className={styles.calendarContainer}>
          <Calendar
            localizer={localizer}
            events={slots || []}
            startAccessor="start"
            endAccessor="end"
            selectable
            selected={selectedDate}
            onSelectSlot={(slotInfo) => {
              const clickDate = new Date(slotInfo.start);
              const today = new Date();
              // Reset hours to start of day for both dates
              clickDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);
              
              // Only allow selection if date is today or in the future
              if (clickDate.getTime() >= today.getTime()) {
                handleSelectSlot(slotInfo);
              }
            }}
            dayPropGetter={(date) => {
              const today = new Date();
              // Reset hours to start of day for comparison
              today.setHours(0, 0, 0, 0);
              date.setHours(0, 0, 0, 0);
              
              if (date.getTime() < today.getTime()) {
                return {
                  style: {
                    backgroundColor: '#e5e7eb',
                    cursor: 'not-allowed',
                    color: '#9ca3af'
                  }
                };
              }
              return {};
            }}
            view="month"
            date={currentMonth}
            toolbar={false}
            eventPropGetter={eventStyleGetter}
            views={["month"]}
            defaultView="month"
            style={{ height: 500 }}
          />
        </div>

        {selectedDate && (
          <TimeSlots
            date={selectedDate}
            slots={slots}
            onSelectTime={(time) => setSelectedTime(time)}
            selectedDate={selectedDate}
          />
        )}

        {selectedDate && selectedTime && (
          <Button
            onClick={handleConfirm}
            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-6 text-xl font-semibold transition-all"
          >
            Confirm Date & Time Selected
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

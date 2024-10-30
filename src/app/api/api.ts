interface TimeSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  isUnavailable: boolean;
}

export async function fetchTimeSlots(
  date?: string,
  format: "calendar" | "raw" = "raw"
): Promise<TimeSlot[] | { events: CalendarEvent[] }> {
  try {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (format) params.append("format", format);

    const response = await fetch(`/api/slots?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // If format is calendar, return the events object
    if (format === "calendar") {
      return { events: data.events };
    }
    
    // For raw format, return the array of time slots
    return data.map((slot: any) => ({
      ...slot,
      date: new Date(slot.date)
    }));
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return format === "calendar" ? { events: [] } : [];
  }
}

interface BookingData {
  // Define your booking data structure here
  date: Date;
  time: string;
  // ... other booking fields
}

export async function createBooking(bookingData: BookingData) {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

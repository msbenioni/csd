export interface TimeSlot {
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

interface RawTimeSlot {
  id?: string;
  date: string;
  time: string;
  available?: boolean;
}

export async function fetchTimeSlots(
  date?: string,
  format: "calendar" | "raw" = "raw"
): Promise<TimeSlot[] | { events: CalendarEvent[] }> {
  try {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (format) params.append("format", format);

    const url = `/api/slots?${params}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    
    if (format === "calendar") {
      return { events: data.events || [] };
    }
    
    if (!Array.isArray(data)) {
      console.error('Expected array of slots but received:', data);
      return [];
    }
    
    return data.map((slot: RawTimeSlot) => ({
      id: slot.id || crypto.randomUUID(),
      date: new Date(slot.date),
      time: slot.time,
      available: slot.available ?? true
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

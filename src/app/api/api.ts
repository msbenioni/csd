export async function fetchTimeSlots(
  date?: string,
  format: "calendar" | "raw" = "raw"
) {
  const params = new URLSearchParams();
  if (date) params.append("date", date);
  if (format) params.append("format", format);

  const response = await fetch(`/api/slots?${params}`);
  return response.json();
}

export async function createBooking(bookingData: any) {
  // Define proper type for bookingData
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
}

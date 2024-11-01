export interface BookingDetails {
  address: string;
  suburb: string;
  postcode: string;
  email: string;
  selectedDate?: string;
  selectedTime?: string;
  formattedDate?: string;
  formattedTime?: string;
}

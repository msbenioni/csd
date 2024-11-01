export interface Booking {
  id: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  email: string;
  pickupDate: Date;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

export interface BookingFormData {
  streetAddress: string;
  suburb: string;
  postcode: string;
  email: string;
  pickupDate?: string;
}

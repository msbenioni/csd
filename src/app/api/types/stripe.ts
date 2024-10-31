export interface StripeOrder {
  id: string;
  stripeSessionId: string;
  customerEmail: string;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  metadata: {
    orderId: string;
    pickupAddress: string;
    items: string;
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

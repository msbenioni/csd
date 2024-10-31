import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function createStripeSession(orderData: any) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Laundry Service",
            description: `${orderData.serviceDetails.numberOfBags} bag(s) of laundry`,
          },
          unit_amount: Math.round(orderData.pricing.total * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    customer_email: orderData.customerInfo.email,
    metadata: {
      orderId: "ORDER_" + Date.now(),
      numberOfBags: orderData.serviceDetails.numberOfBags,
      pickupAddress: JSON.stringify(orderData.serviceDetails.pickupAddress),
      items: JSON.stringify([
        {
          type: "laundry_service",
          bags: orderData.serviceDetails.numberOfBags,
        },
      ]),
    },
  });
}

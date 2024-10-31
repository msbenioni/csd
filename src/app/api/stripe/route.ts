import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "Laundry Service",
              description: `${body.serviceDetails.numberOfBags} bag(s) of laundry`,
            },
            unit_amount: Math.round(body.pricing.total * 100), // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: body.customerInfo.email,
      metadata: {
        orderId: "ORDER_" + Date.now(), // You might want to generate this differently
        numberOfBags: body.serviceDetails.numberOfBags,
        pickupAddress: JSON.stringify(body.serviceDetails.pickupAddress),
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}

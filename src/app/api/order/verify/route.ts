import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "No session ID provided" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Create or update the order in your database
    // 2. Send confirmation email
    await sendOrderConfirmationEmail({
      email: session.customer_email!,
      orderDetails: {
        id: session.metadata.orderId,
        amount: session.amount_total!,
        items: JSON.parse(session.metadata.items || "[]"),
        pickupAddress: JSON.parse(session.metadata.pickupAddress),
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: session.metadata.orderId,
        status: "confirmed",
        customerEmail: session.customer_email,
        amount: session.amount_total,
        // Add other relevant details
      },
    });
  } catch (error) {
    console.error("Error verifying order:", error);
    return NextResponse.json(
      { success: false, error: "Error verifying order" },
      { status: 500 }
    );
  }
}

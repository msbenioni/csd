import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Handle successful payment
        await handleSuccessfulPayment(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Handle successful payment intent
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Handle failed payment
        await handlePaymentFailed(paymentIntent);
        break;
      }

      // Add more event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Error processing webhook: ${err}`);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // Create order in database
  const orderData = {
    stripeSessionId: session.id,
    customerEmail: session.customer_email,
    amount: session.amount_total,
    status: "confirmed",
    metadata: session.metadata,
  };

  // TODO: Save order to database
  console.log("Processing order:", orderData);

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail({
      email: session.customer_email!,
      orderDetails: {
        id: session.metadata?.orderId || session.id,
        amount: session.amount_total!,
        items: JSON.parse(session.metadata?.items || "[]"),
        pickupAddress: JSON.parse(session.metadata?.pickupAddress || "{}"),
      },
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  // Handle successful payment intent
  console.log("Payment succeeded:", paymentIntent.id);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Handle failed payment
  console.log("Payment failed:", paymentIntent.id);

  // TODO: Update order status
  // TODO: Send notification to customer
}

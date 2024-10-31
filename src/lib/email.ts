import nodemailer from "nodemailer";

interface OrderDetails {
  id: string;
  amount: number;
  items: any[];
  pickupAddress: {
    street: string;
    suburb: string;
    postcode: string;
    instructions?: string;
  };
}

interface EmailParams {
  email: string;
  orderDetails: OrderDetails;
}

export async function sendOrderConfirmationEmail({
  email,
  orderDetails,
}: EmailParams) {
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailContent = `
    <h1>Thank You for Your Order!</h1>
    <p>Your order has been successfully placed.</p>
    
    <h2>Order Details</h2>
    <p>Order ID: ${orderDetails.id}</p>
    <p>Amount: $${(orderDetails.amount / 100).toFixed(2)}</p>
    
    <h2>Pickup Address</h2>
    <p>${orderDetails.pickupAddress.street}</p>
    <p>${orderDetails.pickupAddress.suburb}, ${
    orderDetails.pickupAddress.postcode
  }</p>
    ${
      orderDetails.pickupAddress.instructions
        ? `<p>Special Instructions: ${orderDetails.pickupAddress.instructions}</p>`
        : ""
    }
    
    <p>We will notify you when your pickup is scheduled.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Order Confirmation - Clean Sweep Duo",
    html: emailContent,
  });
}

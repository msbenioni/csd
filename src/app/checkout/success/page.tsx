"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderDetails {
  id: string;
  status: string;
  customerEmail: string;
  amount: number;
  // Add other relevant fields
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/order/verify?session_id=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setOrderDetails(data.order);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You For Your Order!
          </h1>

          <p className="text-gray-600 mb-6">
            Your order has been successfully placed. We have sent a confirmation
            email with all the details.
          </p>

          {orderDetails && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Order ID:</span>{" "}
                  {orderDetails.id}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600">{orderDetails.status}</span>
                </p>
                <p>
                  <span className="font-medium">Amount Paid:</span> $
                  {(orderDetails.amount / 100).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              View Order Status
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  pickupDate?: string;
  numberOfBags?: number;
  specialInstructions?: string;
}

const calculateTotalPrice = (numberOfBags: number = 0) => {
  const bagCost = numberOfBags * 8;
  const pickupFee = 6;
  const subtotal = bagCost + pickupFee;
  const tax = subtotal * 0.125; // 12.5% tax
  return {
    bagCost,
    pickupFee,
    subtotal,
    tax,
    total: subtotal + tax
  };
};

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    suburb: "",
    postcode: "",
    pickupDate: "",
    numberOfBags: 1,
    specialInstructions: "",
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Check Availability");

  // Get next 14 available dates (including weekends)
  const getAvailableDates = () => {
    const dates = [];
    const now = new Date();
    const currentDate = new Date(now.getTime());

    // If it's after 2 PM, start from tomorrow
    if (now.getHours() >= 14) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    while (dates.length < 14) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPostcode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.postcode.startsWith("2")) {
      setStep(3);
      setMessage("");
    } else {
      try {
        await fetch("/api/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setMessage(
          "Sorry we do not service this area yet but we have registered your interest and will notify you when we expand to your area."
        );
        setButtonText("Interest Registered");
        // Clear form data
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          streetAddress: "",
          suburb: "",
          postcode: "",
          pickupDate: "",
          numberOfBags: 1,
          specialInstructions: "",
        });
      } catch (error) {
        setMessage(
          `Error submitting form: ${
            error instanceof Error ? error.message : "Please try again."
          }`
        );
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      const { sessionId } = await bookingResponse.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        setMessage(error.message || "An error occurred");
      }
    } catch (error) {
      setMessage(
        `Error creating booking: ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    }

    setLoading(false);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <section
      id="booking-form"
      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="booking-form-card max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between">
              <span className={`step ${step >= 1 ? "active" : ""}`}>
                Personal Details
              </span>
              <span className={`step ${step >= 2 ? "active" : ""}`}>
                Address
              </span>
              <span className={`step ${step >= 3 ? "active" : ""}`}>
                Pickup Details
              </span>
              <span className={`step ${step >= 4 ? "active" : ""}`}>
                Review & Pay
              </span>
            </div>
          </div>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="input-3d"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="input-3d"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="input-3d w-full"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input-3d w-full"
                required
              />
              <button type="submit" className="button-3d w-full">
                Next
              </button>
            </form>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <form onSubmit={checkPostcode} className="space-y-4">
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="input-3d w-full"
                required
              />
              <input
                type="text"
                name="suburb"
                value={formData.suburb}
                onChange={handleInputChange}
                placeholder="Suburb"
                className="input-3d w-full"
                required
              />
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                placeholder="Postcode"
                className="input-3d w-full"
                required
              />
              <button
                type="submit"
                className="button-3d w-full"
                disabled={loading}
              >
                {loading ? "Checking..." : buttonText}
              </button>
            </form>
          )}

          {/* Step 3: Pickup Details */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <label htmlFor="pickupDate" className="block text-gray-700 mb-2">
                Select Pickup Date
              </label>
              <select
                id="pickupDate"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="input-3d w-full"
                required
              >
                <option value="">Select a date</option>
                {getAvailableDates().map((date) => (
                  <option
                    key={date.toISOString()}
                    value={date.toISOString().split("T")[0]}
                  >
                    {date.toLocaleDateString("en-AU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              <div className="number-input-container">
                <label
                  htmlFor="numberOfBags"
                  className="block text-gray-700 mb-2"
                >
                  Number of Bags ($8 each + $6 pickup fee + 12.5% tax)
                </label>
                <input
                  id="numberOfBags"
                  type="number"
                  name="numberOfBags"
                  value={formData.numberOfBags}
                  onChange={handleInputChange}
                  min="1"
                  className="input-3d w-full"
                  required
                />
              </div>

              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder="Special Instructions (optional)"
                className="input-3d w-full h-24"
              />
              <button type="submit" className="button-3d w-full">
                Review Booking
              </button>
            </form>
          )}

          {/* Step 4: Review & Pay */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Review Your Booking</h3>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Personal Details</h4>
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Pickup Address</h4>
                    <p>{formData.streetAddress}</p>
                    <p>
                      {formData.suburb}, {formData.postcode}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium">Pickup Details</h4>
                  <p>Date: {formData.pickupDate}</p>
                  <p>Number of Bags: {formData.numberOfBags}</p>
                  
                  {/* New pricing breakdown */}
                  <div className="mt-2 space-y-1">
                    <p>Bags Cost: ${calculateTotalPrice(formData.numberOfBags).bagCost.toFixed(2)}</p>
                    <p>Pickup Fee: ${calculateTotalPrice().pickupFee.toFixed(2)}</p>
                    <p>Subtotal: ${calculateTotalPrice(formData.numberOfBags).subtotal.toFixed(2)}</p>
                    <p>Tax (12.5%): ${calculateTotalPrice(formData.numberOfBags).tax.toFixed(2)}</p>
                    <p className="font-bold">
                      Total: ${calculateTotalPrice(formData.numberOfBags).total.toFixed(2)}
                    </p>
                  </div>

                  {formData.specialInstructions && (
                    <div className="mt-2">
                      <h4 className="font-medium">Special Instructions</h4>
                      <p>{formData.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="button-3d w-full"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay $${calculateTotalPrice(formData.numberOfBags).total.toFixed(2)}`}
              </button>
            </div>
          )}

          {/* Success Message (your existing success message) */}
          {message && (
            <div className="mt-4 text-red-600 text-center">{message}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

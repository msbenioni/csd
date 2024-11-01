"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
    let currentDate = new Date();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPostcode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.postcode.startsWith("2")) {
      setStep(2);
      setMessage("");
    } else {
      try {
        await fetch("/api/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setMessage(
          "Sorry we do not service this area yet but wehave registered your interest and will notify you when we expand to your area."
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
      } catch (_error) {
        setMessage("Error submitting form. Please try again.");
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
        throw new Error('Failed to create booking');
      }

      const { sessionId } = await bookingResponse.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (error) {
      setMessage("Error creating booking. Please try again.");
    }

    setLoading(false);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <section id="booking-form" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-16">
      <div className="container mx-auto px-4">
        <div className="booking-form-card max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between">
              <span className={`step ${step >= 1 ? 'active' : ''}`}>Personal Details</span>
              <span className={`step ${step >= 2 ? 'active' : ''}`}>Address</span>
              <span className={`step ${step >= 3 ? 'active' : ''}`}>Pickup Details</span>
              <span className={`step ${step >= 4 ? 'active' : ''}`}>Review & Pay</span>
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
              <button type="submit" className="button-3d w-full">Next</button>
            </form>
          )}

          {/* Step 2: Address (your existing address form) */}

          {/* Step 3: Pickup Details */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <select
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="input-3d w-full"
                required
              >
                {/* Your existing date options */}
              </select>
              
              <div className="number-input-container">
                <label className="block text-gray-700 mb-2">Number of Bags ($8 each)</label>
                <input
                  type="number"
                  name="numberOfBags"
                  value={formData.numberOfBags}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
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
              <button type="submit" className="button-3d w-full">Review Booking</button>
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
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Pickup Address</h4>
                    <p>{formData.streetAddress}</p>
                    <p>{formData.suburb}, {formData.postcode}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium">Pickup Details</h4>
                  <p>Date: {formData.pickupDate}</p>
                  <p>Number of Bags: {formData.numberOfBags}</p>
                  <p>Total Cost: ${(formData.numberOfBags || 0) * 8}</p>
                  {formData.specialInstructions && (
                    <div className="mt-2">
                      <h4 className="font-medium">Special Instructions</h4>
                      <p>{formData.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="button-3d w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay $${(formData.numberOfBags || 0) * 8}`}
              </button>
            </div>
          )}

          {/* Success Message (your existing success message) */}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

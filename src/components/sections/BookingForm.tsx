"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface FormData {
  streetAddress: string;
  suburb: string;
  postcode: string;
  email: string;
  pickupDate?: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    streetAddress: "",
    suburb: "",
    postcode: "",
    email: "",
    pickupDate: "",
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
          streetAddress: "",
          suburb: "",
          postcode: "",
          email: "",
          pickupDate: "",
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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(
          `Booking confirmed for ${formData.pickupDate}! Check your email for details.`
        );
        setStep(3);
      } else {
        setMessage("Error creating booking. Please try again.");
      }
    } catch (_error) {
      setMessage("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="booking-form" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-16">
      <div className="container mx-auto px-4">
        <div className="booking-form-card max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Start Your Booking
          </h2>

          {step === 1 && (
            <form onSubmit={checkPostcode} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="input-3d w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleInputChange}
                  placeholder="Suburb"
                  className="input-3d w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Postcode"
                  className="input-3d w-full"
                  required
                  pattern="\d{4}"
                  minLength={4}
                  maxLength={4}
                  title="Please enter a 4-digit postcode"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input-3d w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="button-3d w-full"
                disabled={loading}
              >
                {loading ? "Checking..." : buttonText}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <select
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="input-3d w-full"
                  required
                >
                  <option value="">Select Pickup Date</option>
                  {getAvailableDates().map((date) => (
                    <option
                      key={date.toISOString()}
                      value={date.toISOString().split("T")[0]}
                    >
                      {date.toLocaleDateString("en-AU", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-600 text-sm">
                Pickup times are between 7am - 4pm, depending on our current
                workload.
              </p>
              <p className="text-gray-600 text-sm">
                All rubbish must be bagged and placed on the roadside where your
                council bins are collected.
              </p>
              <button
                type="submit"
                className="button-3d w-full"
                disabled={loading}
              >
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="success-message">
              <FaCheck className="text-4xl text-green-500 mb-4" />
              <p className="text-xl text-green-700">{message}</p>
            </div>
          )}

          {message && step !== 3 && (
            <div
              className={`mt-4 p-4 rounded ${
                message.includes("don't service")
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

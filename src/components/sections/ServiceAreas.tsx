"use client";

import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ServiceAreas = () => {
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInterestRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, postcode, suburb }),
      });

      if (response.ok) {
        setMessage("Thanks! We'll notify you when we service your area.");
        setEmail("");
        setPostcode("");
        setSuburb("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error('Error in service areas:', err);
      setMessage("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="service-area" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-16">
      <div className="container mx-auto px-4">
        <div className="service-area-card max-w-3xl mx-auto">
          <FaMapMarkerAlt className="text-4xl text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold mb-6">Service Areas</h2>

          <div className="mb-8">
            <p className="text-xl mb-4">
              We currently service all areas with 2000 postcodes.
            </p>
            <p className="text-gray-600">
              Not in our service area? Register your interest below!
            </p>
          </div>

          <form
            onSubmit={handleInterestRegistration}
            className="max-w-md mx-auto"
          >
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="input-3d w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Your suburb"
                className="input-3d w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Your postcode"
                className="input-3d w-full"
                required
                pattern="[0-9]*"
                maxLength={4}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="button-3d w-full"
            >
              {loading ? "Registering..." : "Register Interest"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded ${
                message.includes("Thanks")
                  ? "bg-green-100 text-green-700"
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

export default ServiceAreas;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "./ServiceAreas.module.css";
import { useRouter } from "next/navigation";

interface InterestFormData {
  email: string;
  address: string;
  suburb: string;
  postcode: string;
}

export const ServiceAreas: React.FC = () => {
  const router = useRouter();
  const [interestForm, setInterestForm] = useState<InterestFormData>({
    email: "",
    address: "",
    suburb: "",
    postcode: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isInServiceArea, setIsInServiceArea] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterestForm({ ...interestForm, [name]: value });

    // Reset service area message when postcode changes
    if (name === "postcode") {
      setIsInServiceArea(null);
      setMessage("");
    }
  };

  const checkServiceArea = (postcode: string): boolean => {
    return postcode.startsWith("2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isServiced = checkServiceArea(interestForm.postcode);
    setIsInServiceArea(isServiced);

    try {
      if (isServiced) {
        setMessage(
          "Great news! We service your area. Redirecting to booking..."
        );
        // Wait a brief moment to show the message before redirecting
        setTimeout(() => {
          router.push("/booking");
        }, 1500);
      } else {
        // Store interest for unserviced area
        await fetch("/api/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interestForm),
        });
        setMessage(
          "Thank you! We will email you when we start servicing your area."
        );
        setInterestForm({ email: "", address: "", suburb: "", postcode: "" }); // Clear form
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={styles.serviceAreasSection}>
      <div className={styles.container}>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
          Service Areas
        </h2>
        <p className="text-lg text-[#ffe5e5] mb-8 text-center">
          We currently service East and South Auckland. Check if we're available
          in your area!
        </p>

        <div className={styles.formContainer}>
          <h3 className="text-2xl font-bold mb-4 text-white text-center">
            Check Your Address
          </h3>
          <form onSubmit={handleSubmit} className={styles.interestForm}>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={interestForm.address}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              value={interestForm.suburb}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={interestForm.postcode}
              onChange={handleInputChange}
              required
              pattern="[0-9]{4}"
              title="Please enter a valid 4-digit postcode"
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={interestForm.email}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <Button
              type="submit"
              className={`${styles.submitButton} ${
                isInServiceArea === true
                  ? "bg-green-600"
                  : isInServiceArea === false
                  ? "bg-blue-600"
                  : ""
              }`}
            >
              {isInServiceArea === null
                ? "Check Availability"
                : isInServiceArea
                ? "Proceed to Booking"
                : "Register Interest"}
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                isInServiceArea ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

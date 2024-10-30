"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./ServiceAreas.module.css";

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

    if (isServiced) {
      setMessage("Great news! We service your area. Redirecting to booking...");
      setTimeout(() => {
        router.push("/booking");
      }, 1500);
    } else {
      setMessage(
        "Unfortunately we do not service here, yet. Click 'Register Interest' to be notified when we do."
      );
    }
  };

  const handleRegisterInterest = async () => {
    try {
      setMessage("Processing your request...");
      await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interestForm),
      });
      setMessage(
        "Thank you! We will notify you when we start servicing your area."
      );
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={`${styles.section} py-16 px-4`}>
      <div className={`${styles.container} px-4`}>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
          Service Areas
        </h2>
        <p className="text-lg text-[#ffe5e5] mb-8 text-center">
          We currently service East and South Auckland.
        </p>

        <div className={`${styles.formContainer} p-8 rounded-lg`}>
          <h3 className="text-2xl font-bold mb-4 text-white text-center">
            Check If We Service Your Address
          </h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={interestForm.address}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              value={interestForm.suburb}
              onChange={handleInputChange}
              required
              className={styles.input}
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
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={interestForm.email}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <Button
              type={isInServiceArea === false ? "button" : "submit"}
              onClick={
                isInServiceArea === false ? handleRegisterInterest : undefined
              }
              className={`
                w-full py-6 text-lg font-bold transition-all
                ${
                  isInServiceArea === true
                    ? "bg-green-600 hover:bg-green-700"
                    : isInServiceArea === false
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-primary hover:bg-primary/90"
                }
              `}
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
              className={`
              mt-4 text-center
              ${isInServiceArea ? "text-green-400" : "text-yellow-400"}
            `}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

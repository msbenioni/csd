import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import styles from "./ServiceAreas.module.css";

// Load the map component dynamically to avoid server-side rendering issues
const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface InterestFormData {
  email: string;
  suburb: string;
}

export const ServiceAreas: React.FC = () => {
  const [interestForm, setInterestForm] = useState<InterestFormData>({
    email: "",
    suburb: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterestForm({ ...interestForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your actual API call to store the interest form data
    await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interestForm),
    });

    setMessage(
      "Thank you! We’ll let you know if we start servicing your area."
    );
    setInterestForm({ email: "", suburb: "" }); // Clear the form
  };

  return (
    <section className={styles.serviceAreasSection}>
      <div className={styles.container}>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
          Service Areas
        </h2>
        <p className="text-lg text-[#ffe5e5] mb-8 text-center">
          We currently service East and South Auckland. If you’re outside these
          areas and want our service, please let us know!
        </p>

        <div className={styles.mapContainer}>
          <Map
            center={{ lat: -36.8485, lng: 174.7633 }} // Center around Auckland
            zoom={11}
            serviceAreas={[
              {
                name: "East Auckland",
                coordinates: [
                  /* East Auckland coordinates */
                ],
              },
              {
                name: "South Auckland",
                coordinates: [
                  /* South Auckland coordinates */
                ],
              },
            ]}
          />
        </div>

        <div className={styles.formContainer}>
          <h3 className="text-2xl font-bold mb-4 text-white text-center">
            Interested in Our Service in Your Area?
          </h3>
          <form onSubmit={handleSubmit} className={styles.interestForm}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={interestForm.email}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="suburb"
              placeholder="Your Suburb/Town"
              value={interestForm.suburb}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <Button type="submit" className={styles.submitButton}>
              Submit Interest
            </Button>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </div>
    </section>
  );
};

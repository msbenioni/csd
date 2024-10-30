"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface CheckoutFormData {
  serviceDetails: {
    numberOfBags: number;
    pickupAddress: {
      street: string;
      suburb: string;
      postcode: string;
      instructions?: string;
    };
  };
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

// Optional: Create a separate type for available time slots
type TimeSlot = {
  id: string;
  time: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    serviceDetails: {
      numberOfBags: 1,
      pickupAddress: {
        street: "",
        suburb: "",
        postcode: "",
        instructions: "",
      },
    },
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Example time slots - you might want to move these to a configuration file
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '9:00 AM - 11:00 AM' },
    { id: '2', time: '11:00 AM - 1:00 PM' },
    { id: '3', time: '1:00 PM - 3:00 PM' },
    { id: '4', time: '3:00 PM - 5:00 PM' },
  ];

  const handleServiceDetailsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        pickupAddress: {
          ...prev.serviceDetails.pickupAddress,
          [name]: value,
        },
      },
    }));
  };

  const handleBagCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        numberOfBags: parseInt(e.target.value),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              Service Details
            </div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              Customer Info
            </div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              Review & Pay
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Service Details</h2>
              
              {/* Number of Bags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Bags
                </label>
                <select
                  value={formData.serviceDetails.numberOfBags}
                  onChange={handleBagCountChange}
                  className="w-full p-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Bag' : 'Bags'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pickup Address</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.serviceDetails.pickupAddress.street}
                    onChange={handleServiceDetailsChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Suburb
                    </label>
                    <input
                      type="text"
                      name="suburb"
                      value={formData.serviceDetails.pickupAddress.suburb}
                      onChange={handleServiceDetailsChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.serviceDetails.pickupAddress.postcode}
                      onChange={handleServiceDetailsChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.serviceDetails.pickupAddress.instructions}
                    onChange={handleServiceDetailsChange}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="E.g., Gate code, preferred pickup location, etc."
                  />
                </div>
              </div>

              {/* Pickup Date/Time - We'll need to add a date picker library */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Pickup Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  className="w-full p-2 border rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  name="timeSlot"
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>Customer Information Form (Coming Soon)</div>
          )}
          {currentStep === 3 && <div>Review & Payment (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}

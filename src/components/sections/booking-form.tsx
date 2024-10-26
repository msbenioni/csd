import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function BookingForm() {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: "07:00",
    frequency: "once",
    bags: 1,
    location: "",
    autoDeduct: false,
  });
  const [total, setTotal] = useState(8); // Initial price for 1 bag

  const calculatePrice = (bags) => {
    const removalFee = bags > 2 ? 6 : 0;
    const bagFee = bags * 8;
    return removalFee + bagFee;
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    if (field === "bags") {
      setTotal(calculatePrice(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.date ||
      !formData.time ||
      !formData.location ||
      formData.bags < 1
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle form submission and payment
    console.log(formData);
    // Add payment processing logic here
  };

  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Select Date</Label>
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => handleInputChange("date", date)}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-2">
          <Label>Select Time</Label>
          <Select
            value={formData.time}
            onValueChange={(value) => handleInputChange("time", value)}
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Pickup Frequency</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) => handleInputChange("frequency", value)}
          >
            <option value="once">One-time pickup</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Number of Bags</Label>
          <Input
            type="number"
            min={1}
            value={formData.bags}
            onChange={(e) =>
              handleInputChange("bags", parseInt(e.target.value) || 1)
            }
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Pickup Location</Label>
          <Input
            placeholder="e.g., Outside front door"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData.autoDeduct}
            onCheckedChange={(checked) =>
              handleInputChange("autoDeduct", checked)
            }
          />
          <Label className="text-sm">
            Allow automatic deductions for excess bags
          </Label>
        </div>

        <div className="text-xl font-bold text-center py-4">
          Total: ${total}
        </div>

        <Button type="submit" className="w-full">
          Book Now
        </Button>
      </form>
    </Card>
  );
}

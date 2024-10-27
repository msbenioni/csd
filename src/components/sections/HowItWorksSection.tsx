"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { title: "Click 'Book Now'", description: "Start your booking process" },
    { title: "Select Date & Time", description: "Choose a convenient slot" },
    {
      title: "Add Pick-Up Details",
      description: "Specify location and number of bags",
    },
    { title: "Complete Payment", description: "Secure online payment" },
    {
      title: "Await Pick-Up",
      description: "We'll arrive at the scheduled time",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-white to-blue-900"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <Card className="max-w-2xl mx-auto bg-[#f4ea1c]/90 backdrop-blur-sm rounded-xl overflow-hidden">
          <CardHeader>
            <h3 className="text-2xl font-bold text-center mb-4">
              Pricing & Terms:
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 max-w-md text-gray-600 mx-auto">
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>
                  One-Time Pick-Up: $6 removal fee for more than two bags (no
                  charge for one bag).
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>Cost Per Bag: $8 per bag (10kg limit per bag).</span>
              </li>
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>
                  Rubbish must be bagged or boxed. We do not accept loose items.
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>Individual items must weigh no more than 10kg.</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6">
            <Button className="w-full text-white" size="lg" asChild>
              <a href="/booking">Book Now</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

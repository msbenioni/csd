import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export function SubscriptionProcess() {
  const steps = [
    {
      title: "Choose a Plan",
      description: "Select daily, weekly, or monthly pick-ups",
    },
    {
      title: "Customize Pick-Up Details",
      description: "Set your preferred time and location",
    },
    { title: "Secure Payment", description: "Set up automatic billing" },
    {
      title: "Confirm & Relax",
      description: "We'll handle your rubbish removal regularly",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Easy Subscription Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
              Subscription Terms:
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 max-w-md text-gray-600 mx-auto">
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>Daily, weekly, or monthly pick-up plans available.</span>
              </li>
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>Automatic payments billed the day before each pick-up.</span>
              </li>
              <li className="flex items-center">
                <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                </div>
                <span>Flexible adjustment policy for adding or removing bags.</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-6">
            <Button className="w-full text-white" size="lg" asChild>
              <a href="/subscription">Choose A Plan</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

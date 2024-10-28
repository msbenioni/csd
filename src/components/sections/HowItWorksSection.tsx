"use client";

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
    <section id="how-it-works" className="py-24 bg-[#1f2a44]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold mb-8 text-center text-[#ffc107]">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 neon-step">
                {index + 1}
              </div>
              <h3 className="font-bold text-lg text-[#ffe5e5] mb-2">
                {step.title}
              </h3>
              <p className="text-lg text-[#cfcfcf] font-semibold">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

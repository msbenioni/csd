"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  Book,
} from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { title: "Click 'Book Now'", icon: Book },
    { title: "Select Date & Time", icon: Calendar },
    { title: "Add Pick-Up Details", icon: MapPin },
    { title: "Complete Payment", icon: CreditCard },
    { title: "Await Pick-Up", icon: Truck },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#1f2a44]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold mb-8 text-center text-[#ffc107]">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          {steps.map((step, index) => (
            <Link href="/booking" key={index} className="no-underline">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="relative text-center flex flex-col items-center w-60 p-6 rounded-xl shadow-md neon-box bg-gradient-to-r from-yellow-400 to-orange-400 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 neon-step">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">
                  {step.title}
                </h3>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.3 + 0.5 }}
                    className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-[#ffc107]"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </motion.div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Recycle } from "lucide-react";

const features = [
  {
    title: "Flexible Scheduling",
    description:
      "Book your preferred time slot from 7 AM to 4 PM, with daily, weekly, or monthly pickup options.",
    icon: Calendar,
  },
  {
    title: "Simple Pricing",
    description:
      "$8 per bag with free removal for single bags. Transparent pricing with no hidden fees.",
    icon: CreditCard,
  },
  {
    title: "Reliable Service",
    description:
      "Professional mother-daughter team serving South and East Auckland with care and dedication.",
    icon: Clock,
  },
  {
    title: "Eco-Friendly",
    description:
      "We ensure proper waste disposal and recycling practices for a cleaner environment.",
    icon: Recycle,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Clean Sweep Duo?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make rubbish removal simple, reliable, and hassle-free for our
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

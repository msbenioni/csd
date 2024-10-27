"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-blue-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No hidden fees, just straightforward pricing for all your rubbish
            removal needs
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-2xl mx-auto bg-[#f4ea1c]/90 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardHeader>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Per Bag Pricing</h3>
                <div className="text-4xl font-bold">
                  $8<span className="text-lg text-gray-500">/bag</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 max-w-md text-gray-600 mx-auto">
                <li className="flex items-center">
                  <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                  </div>
                  <span>$8 per bag (max 10kg/bag)</span>
                </li>
                <li className="flex items-center">
                  <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                  </div>
                  <span>+$6 service fee</span>
                </li>
                <li className="flex items-center">
                  <div className="w-7 h-7 mr-3 border-2 border-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-500 stroke-[3]" />
                  </div>
                  <span>Available daily from 7 AM to 4 PM</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button className="w-full text-white" size="lg" asChild>
                <a href="/booking">Book Now</a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

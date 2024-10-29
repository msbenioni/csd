"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Pricing: FC = () => {
  return (
    <section id="pricing" className="pb-16 bg-[#1f2a44]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-extrabold text-[#ffc107] mb-4">
            No Hidden Fees Just Simple Pricing
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-30"
        >
          <Card className="max-w-2xl mx-auto bg-[#8B1E3F] backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden neon-card">
            <CardHeader>
              <div className="text-center p-8">
                <div className="text-6xl font-extrabold text-white">
                  $8
                  <span className="text-2xl text-white">
                    {" "}
                    / per bag (max 10kg)
                  </span>
                  <p className="text-lg text-white">(no loose items)</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 max-w-md mx-auto">
                <li className="flex items-center p-6 bg-white rounded-xl shadow-md text-lg font-semibold text-[#1f2a44] neon-box">
                  <div className="w-10 h-10 mr-4 bg-green-500 rounded-full flex items-center justify-center neon-check">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                  <span>+$6 service fee</span>
                </li>
                <li className="flex items-center p-6 bg-white rounded-xl shadow-md text-lg font-semibold text-[#1f2a44] neon-box">
                  <div className="w-10 h-10 mr-4 bg-green-500 rounded-full flex items-center justify-center neon-check">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                  <span>Pickup available daily from 7 AM to 4 PM</span>
                </li>
                <li className="flex items-center p-6 bg-white rounded-xl shadow-md text-lg font-semibold text-[#1f2a44] neon-box">
                  <div className="w-10 h-10 mr-4 bg-green-500 rounded-full flex items-center justify-center neon-check">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                  <span>
                    Servicing East & South Auckland <br />
                    (other areas coming soon)
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-8 flex justify-center">
              <Button
                className="w-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 text-xl"
                size="lg"
                asChild
              >
                <a href="/booking">Book Now</a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

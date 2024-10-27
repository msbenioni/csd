"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-white">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-10">
            Rubbish Bag Removal<br />
            Easy and Affordable
          </h1>
          <p className="text-xl text-[#f4ea1c] mb-8 max-w-2xl mx-auto">
            A little family business with a big mission:<br />
            helping the neighbourhood get rid of those extra bags of rubbish.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              asChild
            >
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Image
            src="/images/duo-car.png"
            alt="Kawaii-style duo car"
            width={500}
            height={300}
            priority
            className="mx-auto w-auto h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

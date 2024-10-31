"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-pink-700 to-[#8B1E3F] pt-20 z-10">
      <div className="container px-4 mx-auto text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-[#8B1E3F] shadow-xl relative"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6 leading-tight">
            <span className="inline-block transform hover:scale-110 transition duration-300">
              Rubbish Bag Removal
            </span>
            <br />
            <span className="text-[#FF6347]">Easy & Affordable!</span>
          </h1>
          <p className="text-2xl text-[#FFB6C1] mb-8 max-w-2xl mx-auto font-medium">
            A SMALL family business with a{" "}
            <span className="font-bold">BIG</span> mission:
            <br />
            Hassle free rubbish removal at an affordable price!
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-12 py-6 text-2xl rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              asChild
            >
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <div className="relative float-animation p-6 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full w-max mx-auto shadow-xl">
            <Image
              src="/images/duo-car.png"
              alt="Kawaii-style duo car"
              width={600}
              height={600}
              priority
              className="mx-auto w-auto h-auto rounded-full relative z-10 transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

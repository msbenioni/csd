"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah",
    location: "Ormiston",
    comment:
      "Clean Sweep Duo has been fantastic! Its just so easy to book and know you wont be charged any extra.",
    rating: 5,
  },
  {
    name: "David",
    location: "Pakuranga",
    comment:
      "I love how easy it is to schedule pickups through their website. Couldnt ask for better!",
    rating: 5,
  },
  {
    name: "Michelle",
    location: "Botany Downs",
    comment: "Great local service!",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-pink-700 to-[#8B1E3F]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-[#ffe5e5] font-medium">
            Dont just take our word for it – hear from some of our satisfied
            customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <CardHeader>
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-[#1f2a44] text-lg">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start mt-4">
                  <div className="font-bold text-xl text-[#1f2a44]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

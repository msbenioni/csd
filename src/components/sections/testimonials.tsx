"use client";
import { PlaceholderImage } from "../ui/PlaceholderImage";
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
    name: "Sarah Johnson",
    location: "Howick",
    comment:
      "Clean Sweep Duo has been fantastic! Their regular pickup service is reliable and their communication is excellent. The mother-daughter team is always professional and friendly.",
    rating: 5,
  },
  {
    name: "David Thompson",
    location: "Pakuranga",
    comment:
      "I love how easy it is to schedule pickups through their website. The pricing is transparent and the service is always on time. Couldn't ask for better!",
    rating: 5,
  },
  {
    name: "Michelle Lee",
    location: "Botany Downs",
    comment:
      "Their subscription service is perfect for my business. They're always punctual and handle our waste disposal needs efficiently. Great local service!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="max-w-2xl mx-auto">
            Dont just take our word for it - hear from some of our satisfied
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
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm">
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

export default Testimonials;

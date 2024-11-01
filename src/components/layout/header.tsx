"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [{ label: "Book Now", href: "/#booking-form" }];

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-gradient-to-b from-pink-700 to-[#8B1E3F]/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <motion.div
              animate={{
                scale: isScrolled ? 1.2 : 1,
                y: isScrolled ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/duologo.png"
                alt="Clean Sweep Duo Logo"
                width={isScrolled ? 170 : 150}
                height={isScrolled ? 170 : 150}
                style={{ height: "auto" }}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <Link href={navItems[0].href} className="w-full">
              <Button className="w-full text-white transition-colors duration-600">
                {navItems[0].label}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) =>
                item.label === "Book Now" ? (
                  <Link key={index} href={item.href} className="w-full">
                    <Button className="w-full transition-colors duration-600">
                      {item.label}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-white hover:text-yellow-400 transition-colors duration-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

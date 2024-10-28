"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, FC } from "react";
import Link from "next/link";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Book Now", href: "/booking" },
  ];

  return (
    <header className="fixed w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/duologo.png"
              alt="Clean Sweep Duo Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) =>
              item.label === "Book Now" ? (
                <Link key={index} href={item.href}>
                  <Button className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow-md hover:from-orange-400 hover:to-yellow-400 transition-colors duration-300">
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white hover:text-yellow-300 font-medium transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
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
          <div className="md:hidden py-4 bg-white text-gray-800 rounded-lg shadow-md mt-2">
            <nav className="flex flex-col space-y-4 items-center">
              {navItems.map((item, index) =>
                item.label === "Book Now" ? (
                  <Link key={index} href={item.href} className="w-full">
                    <Button className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 shadow-md hover:from-orange-400 hover:to-yellow-400 transition-colors duration-300">
                      {item.label}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-gray-700 font-medium hover:text-pink-600 transition-colors duration-300"
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
};

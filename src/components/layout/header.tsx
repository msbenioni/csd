"use client";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Book Now", href: "/booking" },
  ];

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
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
                <Link key={index} href={item.href} className="w-full">
                  <Button className="w-full text-white transition-colors duration-600">{item.label}</Button>
                </Link>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-600"
                >
                  {item.label}
                </Link>
              )
            )}
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
                    <Button className="w-full transition-colors duration-600">{item.label}</Button>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-600"
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

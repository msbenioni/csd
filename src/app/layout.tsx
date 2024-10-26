import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Book Now", href: "/booking" },
  ];

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="font-bold text-xl text-blue-600">
            Clean Sweep Duo
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) =>
              item.label === "Book Now" ? (
                <Button key={index} asChild>
                  <a href={item.href}>{item.label}</a>
                </Button>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
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
                  <Button key={index} className="w-full" asChild>
                    <a href={item.href}>{item.label}</a>
                  </Button>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Clean Sweep Duo</h3>
            <p className="text-gray-600">
              Professional rubbish removal service in South and East Auckland
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              South and East Auckland, New Zealand
              <br />
              Operating Hours: 7 AM - 4 PM Daily
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </a>
              <a href="#services" className="text-gray-600 hover:text-blue-600">
                Services
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
              <a href="/booking" className="text-gray-600 hover:text-blue-600">
                Book Now
              </a>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Clean Sweep Duo. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

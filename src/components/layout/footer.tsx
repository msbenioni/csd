"use client"; // Add this at the top of the file
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1f2a44] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Business Information */}
        <div>
          <h4 className="font-bold text-lg mb-2">Contact Us</h4>
          <p>Email: cleansweepduo@gmail.com</p>
          <p>Service Hours: 7 AM - 4 PM</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-2">Quick Links</h4>
          <ul>
            <li>
              <Link href="/#pricing" className="hover:text-yellow-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-yellow-400">
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & CTA */}
        <div>
          <h4 className="font-bold text-lg mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400"
            >
              Instagram
            </a>
          </div>
          <p className="mt-8 text-sm text-center">
            &copy; 2024 Clean Sweep Duo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client"; // Add this at the top of the file

export default function Footer() {
  return (
    <footer className="bg-[#1f2a44] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <a href="/#pricing" className="hover:text-yellow-400">
                Pricing
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:text-yellow-400">
                Book Now
              </a>
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
        </div>

        {/* Payment & Legal */}
        <div>
          <h4 className="font-bold text-lg mb-2">Service Areas</h4>
          <div className="flex space-x-4">
            <span>South Auckland</span>
            <span>East Auckland</span>
          </div>
          <p className="mt-8 text-sm text-center">
            &copy; 2024 Clean Sweep Duo. All rights reserved.
          </p>
        </div>

        {/* Service Area Notification */}
        <div>
          <h4 className="font-bold text-lg mb-2">
            Do You Want Us In Your Area?
          </h4>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Add form submission logic
            }}
          >
            <select
              className="w-full p-2 rounded text-gray-800"
              aria-label="Select your area"
              required
            >
              <option value="">Select Your Area</option>
              <option value="north-shore">North Shore Auckland</option>
              <option value="west-auckland">West Auckland</option>
              <option value="central-auckland">Central Auckland</option>
              <option value="waikato">Waikato</option>
            </select>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded text-gray-800"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
            >
              Notify Me When Available
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

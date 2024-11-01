import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faDollarSign,
  faTruck,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-500 to-pink-500 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Text */}
          <div className="text-center md:text-right md:w-[25%]">
            <h1 className="text-7xl font-bold text-white">Simple Affordable</h1>
          </div>

          {/* Center Image - Clickable */}
          <a
            href="#booking-form"
            className="md:w-1/2 transition-transform hover:scale-105"
          >
            <Image
              src="/images/duophone.png"
              alt="Clean Sweep Duo mobile app"
              width={400}
              height={800}
              className="mx-auto"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <p className="text-2xl font-bold text-black text-center mt-4 flex items-center justify-center space-x-4">
              <span className="flex items-center">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="mr-1 w-6 h-6 text-white"
                />
                <span>Book </span>
              </span>
              <span className="flex items-center">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="mr-1 w-6 h-6 text-white"
                />
                <span>Pay </span>
              </span>
              <span className="flex items-center">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="mr-1 w-6 h-6 text-white"
                />
                <span>Put on the curb </span>
              </span>
              <span className="flex items-center">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="mr-1 w-6 h-6 text-white"
                />
                <span>We Pickup</span>
              </span>
            </p>
          </a>

          {/* Right Text */}
          <div className="text-center md:text-left md:w-[25%]">
            <h1 className="text-7xl font-bold text-white">Rubbish Removal</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

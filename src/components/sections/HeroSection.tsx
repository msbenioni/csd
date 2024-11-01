import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Text */}
          <div className="text-center md:text-right md:w-1/3">
            <h1 className="text-7xl font-bold text-white">Simple</h1>
          </div>

          {/* Center Image - Clickable */}
          <a
            href="#booking-form"
            className="md:w-1/3 transition-transform hover:scale-105"
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
            <p className="text-xl text-white text-center mt-4">
              $8 per bag, placed at your curb. We handle the rest.
            </p>
          </a>

          {/* Right Text */}
          <div className="text-center md:text-left md:w-1/3">
            <h1 className="text-7xl font-bold text-white">Rubbish Removal</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

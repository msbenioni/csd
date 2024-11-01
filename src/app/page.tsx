import HeroSection from "@/components/sections/HeroSection";
import Pricing from "@/components/sections/Pricing";
import ServiceAreas from "@/components/sections/ServiceAreas";
import BookingForm from "@/components/sections/BookingForm";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <HeroSection />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="service-areas">
        <ServiceAreas />
      </div>
      <div id="booking">
        <BookingForm />
      </div>
    </main>
  );
}

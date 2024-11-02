import HeroSection from "@/components/sections/HeroSection";
import ServiceAreas from "@/components/sections/ServiceAreas";
import BookingForm from "@/components/sections/BookingForm";
import Pricing from "@/components/sections/Pricing";
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

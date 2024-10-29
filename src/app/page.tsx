// This file will contain the main structure of your landing page
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <HowItWorksSection />
      <Pricing />
      <Map
        center={{ lat: 40.7128, lng: -74.006 }}
        zoom={10}
        serviceAreas={[]}
      />
      <Testimonials />
    </>
  );
}

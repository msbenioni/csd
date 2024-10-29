// This file will contain the main structure of your landing page
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <HowItWorksSection />
      <Pricing />
      <ServiceAreas />
      <Testimonials />
    </>
  );
}

// This file will contain the main structure of your landing page
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SubscriptionProcess } from "@/components/sections/SubscriptionProcess";
import Testimonials from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/Pricing";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <Pricing />
      <HowItWorksSection />
      <SubscriptionProcess />
      <Testimonials />
    </>
  );
}

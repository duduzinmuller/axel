import AboutSection from "./_components/AboutSection";
import CapabilitiesSection from "./_components/CapabilitiesSection";
import HeroSection from "./_components/HeroSection";
import { PricingPlans } from "./_components/PricingPlans";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PricingPlans />
      <CapabilitiesSection />
    </div>
  );
}

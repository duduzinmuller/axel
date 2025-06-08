import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";
import { PricingPlans } from "./_components/PricingPlans";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PricingPlans />
    </div>
  );
}

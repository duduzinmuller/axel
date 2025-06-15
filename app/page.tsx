"use client";

import { useEffect } from "react";
import AboutSection from "./_components/AboutSection";
import CapabilitiesSection from "./_components/CapabilitiesSection";
import ExperienceSection from "./_components/ExperienceSection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import Navbar from "./_components/Navbar";
import PricingPlans from "./_components/PricingPlans";
import { useAppSelector } from "./store";
import { useRouter } from "next/navigation";
import LoadingScreen from "./_components/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/chat-axel");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PricingPlans />
      <CapabilitiesSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
}

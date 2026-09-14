import HeroSection from "@/components/HeroSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import BentoSection from "@/components/BentoSection";
import GlimpsesSection from "@/components/GlimpsesSection";
import ServicesSection from "@/components/ServicesSection";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersMarquee />
      <ServicesSection />
      <BentoSection />
      <GlimpsesSection />
      <AppDownload />
      <Footer />
    </main>
  );
}

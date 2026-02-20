import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookiePrivacyWrapper } from "@/components/layout/CookiePrivacyWrapper";
import { Hero } from "@/components/sections/Hero";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Features } from "@/components/sections/Features";
import { ValueProps } from "@/components/sections/ValueProps";
import { Testimonials } from "@/components/sections/Testimonials";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { Steps } from "@/components/sections/Steps";
import { CtaSection } from "@/components/sections/CtaSection";
import { Faq } from "@/components/sections/Faq";
import { DemoFormModal } from "@/components/sections/DemoFormModal";

export default function PlantManagerPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChoose />
        <Features />
        <ValueProps />
        <Testimonials />
        <LogoCarousel />
        <Steps />
        <CtaSection />
        <Faq />
      </main>
      <Footer />
      <DemoFormModal />
      <CookiePrivacyWrapper />
    </>
  );
}

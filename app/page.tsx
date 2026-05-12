import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import WhyTrellis from "@/components/WhyTrellis";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyTrellis />
      <ProcessSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}

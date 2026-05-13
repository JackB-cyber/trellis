import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";

// Below-fold components loaded as separate chunks — improves Time to Interactive
const WhyTrellis = dynamic(() => import("@/components/WhyTrellis"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

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

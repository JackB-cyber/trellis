import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Code-split so Framer Motion (used only by the FAQ accordion) stays out of
// the shared chunk other routes — like home — would otherwise download.
const ServicesContent = dynamic(() => import("./ServicesContent"));

const title = "Services & Pricing";
const description =
  "One fixed-price package starting at $3,597. Honest timelines, no surprises.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

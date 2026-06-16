import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

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

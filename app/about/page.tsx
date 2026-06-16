import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const title = "About Us";
const description =
  "A Canadian-owned web design studio for small businesses who want a real partner.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function AboutPage() {
  return <AboutContent />;
}

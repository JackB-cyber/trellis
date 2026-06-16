import type { Metadata } from "next";
import ContactContent from "./ContactContent";

const title = "Get a Free Quote";
const description =
  "Tell us about your business and we'll get back within one business day.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ContactPage() {
  return <ContactContent />;
}

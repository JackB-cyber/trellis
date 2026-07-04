import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const siteTitle = "Trellis Digital — Web Design for Canadian Small Businesses";
const siteDescription =
  "Web design for Canadian small businesses. Fixed pricing, honest timelines, and everything handled start to finish.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trellisdigital.ca"),
  title: {
    default: siteTitle,
    template: "%s — Trellis Digital",
  },
  description: siteDescription,
  // Resolves per-page against metadataBase — every route gets a canonical URL
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Trellis Digital",
    title: siteTitle,
    description: siteDescription,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    apple: { url: "/apple-touch-icon.png" },
  },
};

// LocalBusiness structured data for search engines — static, developer-controlled JSON
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Trellis Digital",
  description: siteDescription,
  url: "https://www.trellisdigital.ca",
  email: "hello@trellisdigital.ca",
  address: { "@type": "PostalAddress", addressRegion: "AB", addressCountry: "CA" },
  areaServed: { "@type": "Country", name: "Canada" },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-abyss text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <Cursor />
        <div className="grain-fixed" aria-hidden />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.trellisdigital.ca", priority: 1, changeFrequency: "monthly" },
    { url: "https://www.trellisdigital.ca/services", priority: 0.9, changeFrequency: "monthly" },
    { url: "https://www.trellisdigital.ca/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "https://www.trellisdigital.ca/about", priority: 0.7, changeFrequency: "monthly" },
  ];
}

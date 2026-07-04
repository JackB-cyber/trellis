import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/work" },
    sitemap: "https://www.trellisdigital.ca/sitemap.xml",
  };
}

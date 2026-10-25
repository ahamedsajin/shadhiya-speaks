import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const ROUTES = [
  "/",
  "/about",
  "/ielts-preparation",
  "/spoken-english",
  "/one-to-one-coaching",
  "/free-assessment",
  "/testimonials",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ROUTES.map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/free-assessment" ? 0.9 : 0.7,
  }));
}

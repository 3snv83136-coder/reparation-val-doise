import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/lib/cities";
import { getAllLongtailSlugs } from "@/lib/longtails";

const BASE_URL = "https://urgence-canalisation-valdoise.fr";

// Fixed date so lastmod doesn't change on every build — update manually when content changes
const LAST_CONTENT_UPDATE = "2026-03-23T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages principales
  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reservation`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/temoignages`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/zone-intervention`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 49 pages ville
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${BASE_URL}/zone-intervention/${slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Pages guide long-tail SEO
  const guidePages: MetadataRoute.Sitemap = getAllLongtailSlugs().map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...mainPages, ...cityPages, ...guidePages];
}

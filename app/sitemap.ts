import type { MetadataRoute } from "next";
import { eventDetails } from "./data/events";
import { siteUrl } from "./site-metadata";

const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/su-kien"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/phap-ly"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/quyen-rieng-tu"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/mien-tru-trach-nhiem"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/dinh-chinh"), changeFrequency: "monthly", priority: 0.5 },
    ...eventDetails.map((event) => ({
      url: absoluteUrl(`/su-kien/${event.slug}`),
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

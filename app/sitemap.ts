import type { MetadataRoute } from "next";
import { eventDetails } from "./data/events";

const baseUrl = "https://dong-coi-viet.anhtuan-freelc.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/su-kien`, changeFrequency: "weekly", priority: 0.9 },
    ...eventDetails.map((event) => ({
      url: `${baseUrl}/su-kien/${event.slug}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

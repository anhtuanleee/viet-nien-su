import type { Metadata } from "next";

export const siteName = "Việt Niên Sử";
export const siteTitle = "Việt Niên Sử — Bản đồ 3D lịch sử Việt Nam";
export const siteDescription =
  "Khám phá lãnh thổ Việt Nam qua các thời kỳ trên bản đồ 3D tương tác, kèm nguồn tư liệu, mức độ chắc chắn và hồ sơ sự kiện lịch sử.";

const fallbackHost = "viet-nien-bo588o1rw-anhtuanlees-projects.vercel.app";
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  fallbackHost;

export const siteUrl = new URL(
  configuredUrl.startsWith("http://") || configuredUrl.startsWith("https://")
    ? configuredUrl
    : `https://${configuredUrl}`,
);

export const defaultSocialImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Việt Niên Sử — Bản đồ 3D lịch sử Việt Nam",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "vi_VN",
      type: "website",
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultSocialImage.url],
    },
  };
}

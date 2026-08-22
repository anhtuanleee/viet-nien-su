import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ProjectConsoleInfo from "./components/ProjectConsoleInfo";
import { defaultSocialImage, siteDescription, siteName, siteTitle, siteUrl } from "./site-metadata";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Venn", url: "https://github.com/anhtuanleee" }],
  creator: "Venn",
  publisher: "Venn",
  category: "education",
  keywords: [
    "lịch sử Việt Nam",
    "bản đồ lịch sử Việt Nam",
    "lãnh thổ Việt Nam",
    "bản đồ 3D",
    "Việt Niên Sử",
    "Hoàng Sa",
    "Trường Sa",
  ],
  alternates: { canonical: "/" },
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "vi_VN",
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [defaultSocialImage.url],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <ProjectConsoleInfo />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

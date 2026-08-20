import type { Metadata } from "next";
import "./globals.css";
import ProjectConsoleInfo from "./components/ProjectConsoleInfo";

export const metadata: Metadata = {
  metadataBase: new URL("https://dong-coi-viet.bargain-92losekcahfn.chatgpt.site"),
  title: {
    default: "Việt Niên Sử",
    template: "%s · Việt Niên Sử",
  },
  description: "Bản đồ 3D tương tác khám phá lãnh thổ Việt Nam qua các thời kỳ lịch sử.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "Việt Niên Sử",
    description: "Bản đồ lịch sử tương tác · Nội dung có nguồn",
    url: "/",
    siteName: "Việt Niên Sử",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Việt Niên Sử — Bản đồ lịch sử tương tác, nội dung có nguồn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Việt Niên Sử",
    description: "Bản đồ lịch sử tương tác · Nội dung có nguồn",
    images: ["/og.png"],
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
      </body>
    </html>
  );
}

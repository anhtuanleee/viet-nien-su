import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dong-coi-viet.anhtuan-freelc.chatgpt.site"),
  title: {
    default: "Dòng Cõi Việt",
    template: "%s · Dòng Cõi Việt",
  },
  description: "Bản đồ 3D tương tác khám phá lãnh thổ Việt Nam qua các thời kỳ lịch sử.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}

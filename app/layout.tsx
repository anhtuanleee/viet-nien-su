import type { Metadata } from "next";
import "./globals.css";
import ProjectConsoleInfo from "./components/ProjectConsoleInfo";

export const metadata: Metadata = {
  title: {
    default: "Việt Niên Sử",
    template: "%s · Việt Niên Sử",
  },
  description: "Bản đồ 3D tương tác khám phá lãnh thổ Việt Nam qua các thời kỳ lịch sử.",
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

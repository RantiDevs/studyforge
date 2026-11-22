import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyForge",
  description: "Personal study hub — Meshack Akinkuotu, B.Eng. Biomedical Engineering",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg text-txt antialiased">
        {children}
      </body>
    </html>
  );
}

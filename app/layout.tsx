import type { Metadata } from "next";
import "./globals.css";
import AppChrome from "@/components/AppChrome";

export const metadata: Metadata = {
  title: {
    default: "Manav Studio",
    template: "%s | Manav Studio",
  },
  description:
    "Client-focused websites, landing pages, and custom web projects built with stronger messaging, better structure, and clean frontend execution.",
  keywords: [
    "Manav",
    "freelance web developer",
    "frontend developer",
    "client project website",
    "custom website development",
    "landing page developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

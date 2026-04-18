import type { Metadata } from "next";
import "./globals.css";
import CursorAura from "@/components/CursorAura";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageProgressBar from "@/components/PageProgressBar";
import PageTransition from "@/components/PageTransition";
import SurfaceCardEffects from "@/components/SurfaceCardEffects";

export const metadata: Metadata = {
  title: {
    default: "Manav Studio",
    template: "%s | Manav Studio",
  },
  description:
    "Design-forward websites and polished product experiences crafted with strategy, motion, and clean frontend execution.",
  keywords: [
    "Manav",
    "web designer",
    "frontend developer",
    "Next.js portfolio",
    "website renovation",
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
        <PageProgressBar />
        <CursorAura />
        <SurfaceCardEffects />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

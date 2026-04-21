"use client";

import { usePathname } from "next/navigation";
import CursorAura from "@/components/CursorAura";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageProgressBar from "@/components/PageProgressBar";
import PageTransition from "@/components/PageTransition";
import SurfaceCardEffects from "@/components/SurfaceCardEffects";

type AppChromeProps = {
  children: React.ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? null : (
        <>
          <PageProgressBar />
          <CursorAura />
          <SurfaceCardEffects />
          <Navbar />
        </>
      )}

      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>

      {isAdminRoute ? null : <Footer />}
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/features/chatbot/Chatbot";
import SplashScreen from "@/components/ui/SplashScreen";

// Pages where Navbar & Footer should be hidden (fullscreen features)
const FULLSCREEN_ROUTES = ["/auth/login", "/auth/register", "/admin"];

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const isFullscreen = FULLSCREEN_ROUTES.some((r) => pathname.startsWith(r));
  const isHome = pathname === "/";

  return (
    <>
      {isHome && <SplashScreen />}
      {!isFullscreen && <Navbar />}
      <main className={!isFullscreen ? "pt-16" : ""}>
        {children}
      </main>
      {!isFullscreen && <Footer />}
      {!isFullscreen && <Chatbot />}
    </>
  );
}

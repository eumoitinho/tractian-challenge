"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUTM, captureLandingPage, trackPageView } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    captureUTM();
    captureLandingPage();
  }, []);

  useEffect(() => {
    trackPageView(
      pathname,
      typeof document !== "undefined" ? document.title : ""
    );
  }, [pathname]);

  return <>{children}</>;
}

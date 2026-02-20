import type { LeadRecord, LeadEnrichment } from "./types";
import type { FormAnalyticsData } from "../analytics/types";
import { getUTM, getLandingPage } from "../analytics/utm";

function detectDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function enrichLead(
  lead: LeadRecord,
  formAnalytics: FormAnalyticsData | null,
  locale: string
): LeadEnrichment {
  const landing = getLandingPage();

  return {
    utm: getUTM(),
    locale,
    referrer: typeof document !== "undefined" ? document.referrer || null : null,
    landingPage: landing?.url ?? null,
    device: {
      type: detectDeviceType(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    },
    formTiming: {
      startedAt: formAnalytics?.startedAt ?? null,
      completedAt: Date.now(),
      durationMs: formAnalytics?.startedAt
        ? Date.now() - formAnalytics.startedAt
        : null,
      fieldsInteracted: formAnalytics?.fieldsInteracted.size ?? 0,
    },
  };
}

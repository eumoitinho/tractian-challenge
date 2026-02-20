import type { UTMParams } from "./types";

const UTM_KEY = "tractian-utm-params";
const LANDING_KEY = "tractian-landing-page";

const UTM_FIELDS: (keyof UTMParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

export function captureUTM(): UTMParams | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  let hasAny = false;

  for (const field of UTM_FIELDS) {
    const value = params.get(field);
    if (value) {
      utm[field] = value;
      hasAny = true;
    }
  }

  if (hasAny) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    return utm;
  }

  return null;
}

export function getUTM(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as UTMParams) : {};
  } catch {
    return {};
  }
}

export function captureLandingPage(): void {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(LANDING_KEY)) return;

  sessionStorage.setItem(
    LANDING_KEY,
    JSON.stringify({
      url: window.location.href,
      referrer: document.referrer || null,
      timestamp: Date.now(),
    })
  );
}

export function getLandingPage(): {
  url: string;
  referrer: string | null;
  timestamp: number;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(LANDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

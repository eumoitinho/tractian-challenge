import type { ConsentCategory, ConsentState } from "./types";

export const CONSENT_KEY = "tractian-consent-state";

const DEFAULT_CONSENT: ConsentState = {
  strictly_necessary: true,
  functional: false,
  performance: false,
  targeting: false,
};

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return DEFAULT_CONSENT;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function updateConsent(state: Partial<ConsentState>): ConsentState {
  const current = getConsent();
  const next: ConsentState = {
    ...current,
    ...state,
    strictly_necessary: true,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  return next;
}

export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category];
}

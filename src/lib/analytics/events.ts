import type { ConsentCategory } from "./types";
import { dispatch } from "./dispatcher";

function track(
  event: string,
  category: ConsentCategory,
  properties?: Record<string, unknown>
): void {
  dispatch({ event, category, timestamp: Date.now(), properties });
}

export function trackPageView(url: string, title: string): void {
  track("page_view", "strictly_necessary", { url, title });
}

export function trackCTAClick(ctaId: string, ctaText: string): void {
  track("cta_click", "performance", { ctaId, ctaText });
}

export function trackFormSubmit(
  formId: string,
  properties?: Record<string, unknown>
): void {
  track("form_submit", "performance", { formId, ...properties });
}

export function trackSectionView(sectionId: string): void {
  track("section_view", "performance", { sectionId });
}

export function trackConsentUpdate(
  consent: Record<string, boolean>
): void {
  track("consent_update", "strictly_necessary", { consent });
}

export function trackFaqExpand(faqId: string): void {
  track("faq_expand", "performance", { faqId });
}

export function trackNavClick(navItem: string, href: string): void {
  track("nav_click", "performance", { navItem, href });
}

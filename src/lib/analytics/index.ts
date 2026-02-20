export type {
  ConsentCategory,
  ConsentState,
  AnalyticsEvent,
  UTMParams,
  FormAnalyticsData,
} from "./types";

export {
  CONSENT_KEY,
  getConsent,
  updateConsent,
  hasConsent,
} from "./consent";

export { pushToDataLayer } from "./data-layer";

export { dispatch, flushPendingEvents } from "./dispatcher";

export {
  trackPageView,
  trackCTAClick,
  trackFormSubmit,
  trackSectionView,
  trackConsentUpdate,
  trackFaqExpand,
  trackNavClick,
} from "./events";

export {
  captureUTM,
  getUTM,
  captureLandingPage,
  getLandingPage,
} from "./utm";

export { useSectionTracking } from "./use-section-tracking";

export { useFormAnalytics } from "./use-form-analytics";

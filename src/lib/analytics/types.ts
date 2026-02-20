export type ConsentCategory =
  | "strictly_necessary"
  | "functional"
  | "performance"
  | "targeting";

export type ConsentState = Record<ConsentCategory, boolean>;

export type AnalyticsEvent = {
  event: string;
  category: ConsentCategory;
  timestamp: number;
  properties?: Record<string, unknown>;
};

export type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type FormAnalyticsData = {
  formId: string;
  startedAt: number | null;
  fieldsInteracted: Set<string>;
  fieldTimings: Record<string, number>;
  lastFieldFocusedAt: number | null;
  submitted: boolean;
};

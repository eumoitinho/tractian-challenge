import type { UTMParams } from "../analytics/types";

export type LeadFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  plantSize?: string;
  industry?: string;
  solution?: string;
  message?: string;
  assets?: string;
};

export type LeadRecord = LeadFormData & {
  id: string;
  createdAt: number;
};

export type LeadEnrichment = {
  utm: UTMParams;
  locale: string;
  referrer: string | null;
  landingPage: string | null;
  device: {
    type: "mobile" | "tablet" | "desktop";
    userAgent: string;
  };
  formTiming: {
    startedAt: number | null;
    completedAt: number;
    durationMs: number | null;
    fieldsInteracted: number;
  };
};

export type LeadScoreBreakdown = {
  emailType: number;
  plantSize: number;
  jobTitle: number;
  utm: number;
  engagement: number;
};

export type LeadScore = {
  total: number;
  breakdown: LeadScoreBreakdown;
  tier: "hot" | "warm" | "cold";
};

export type PipelineResult = {
  success: boolean;
  lead?: LeadRecord;
  enrichment?: LeadEnrichment;
  score?: LeadScore;
  routed?: boolean;
  error?: string;
};

export type WebhookPayload = {
  idempotencyKey: string;
  lead: LeadRecord;
  enrichment: LeadEnrichment;
  score: LeadScore;
  timestamp: number;
};

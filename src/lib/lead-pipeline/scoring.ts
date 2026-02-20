import type { LeadRecord, LeadEnrichment, LeadScore, LeadScoreBreakdown } from "./types";
import { isBusinessEmail } from "./validators";

const HIGH_VALUE_TITLES = [
  "vp",
  "vice president",
  "director",
  "plant manager",
  "head of",
  "chief",
  "c-level",
  "cto",
  "coo",
  "ceo",
];

const MID_VALUE_TITLES = [
  "manager",
  "lead",
  "senior",
  "principal",
  "supervisor",
];

function scoreEmailType(email: string): number {
  return isBusinessEmail(email) ? 20 : 5;
}

function scorePlantSize(plantSize?: string | undefined): number {
  const sizeMap: Record<string, number> = {
    enterprise: 25,
    large: 20,
    "250+": 25,
    "100 - 249": 20,
    medium: 15,
    "50 - 99": 15,
    "25 - 49": 10,
    small: 10,
    "Less than 25": 5,
  };
  return plantSize ? (sizeMap[plantSize] ?? 5) : 0;
}

function scoreJobTitle(title: string): number {
  const lower = title.toLowerCase();
  if (HIGH_VALUE_TITLES.some((t) => lower.includes(t))) return 25;
  if (MID_VALUE_TITLES.some((t) => lower.includes(t))) return 15;
  return 5;
}

function scoreUTM(enrichment: LeadEnrichment): number {
  const { utm } = enrichment;
  if (!utm.utm_source) return 0;

  let score = 5;
  if (utm.utm_medium === "cpc" || utm.utm_medium === "paid") score += 5;
  if (utm.utm_campaign) score += 5;
  return Math.min(score, 15);
}

function scoreEngagement(enrichment: LeadEnrichment): number {
  const { formTiming } = enrichment;
  let score = 0;

  if (formTiming.fieldsInteracted >= 5) score += 5;
  if (formTiming.durationMs && formTiming.durationMs > 30000) score += 5;
  if (enrichment.referrer) score += 5;

  return Math.min(score, 15);
}

function determineTier(total: number): "hot" | "warm" | "cold" {
  if (total >= 70) return "hot";
  if (total >= 40) return "warm";
  return "cold";
}

export function scoreLead(
  lead: LeadRecord,
  enrichment: LeadEnrichment
): LeadScore {
  const breakdown: LeadScoreBreakdown = {
    emailType: scoreEmailType(lead.email),
    plantSize: scorePlantSize(lead.plantSize || lead.assets),
    jobTitle: scoreJobTitle(lead.jobTitle),
    utm: scoreUTM(enrichment),
    engagement: scoreEngagement(enrichment),
  };

  const total = Math.min(
    100,
    breakdown.emailType +
      breakdown.plantSize +
      breakdown.jobTitle +
      breakdown.utm +
      breakdown.engagement
  );

  return { total, breakdown, tier: determineTier(total) };
}

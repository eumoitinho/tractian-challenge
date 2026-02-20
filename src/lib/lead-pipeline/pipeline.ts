import type { LeadFormData, LeadRecord, PipelineResult } from "./types";
import type { FormAnalyticsData } from "../analytics/types";
import { trackFormSubmit } from "../analytics/events";
import { validateLeadForm } from "./validators";
import { isDuplicate, markSubmitted } from "./deduplication";
import { enrichLead } from "./enrichment";
import { scoreLead } from "./scoring";
import { routeLeadToCRM } from "./crm-router";

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function processLead(
  formData: LeadFormData,
  formAnalytics: FormAnalyticsData | null,
  locale: string
): Promise<PipelineResult> {
  const validation = validateLeadForm(formData);
  if (!validation.valid) {
    return { success: false, error: "validation_failed" };
  }

  if (isDuplicate(formData.email, formData.company)) {
    return { success: false, error: "duplicate_submission" };
  }

  const lead: LeadRecord = {
    ...formData,
    id: generateLeadId(),
    createdAt: Date.now(),
  };

  markSubmitted(lead.email, lead.company);

  const enrichment = enrichLead(lead, formAnalytics, locale);
  const score = scoreLead(lead, enrichment);

  trackFormSubmit(formAnalytics?.formId ?? "unknown", {
    leadId: lead.id,
    scoreTier: score.tier,
    scoreTotal: score.total,
  });

  const routeResult = await routeLeadToCRM(lead, enrichment, score);

  if (process.env.NODE_ENV === "development") {
    console.log("\n=== Lead Pipeline Result ===");
    console.log("Lead:", lead.firstName, lead.lastName, `<${lead.email}>`);
    console.table(score.breakdown);
    console.log(`Score: ${score.total}/100 (${score.tier})`);
    console.log("Enrichment:", enrichment);
    console.log(
      "CRM Route:",
      routeResult.success ? "SUCCESS" : "FAILED",
      `(${routeResult.attempts} attempts)`
    );
    console.log("===========================\n");
  }

  return {
    success: true,
    lead,
    enrichment,
    score,
    routed: routeResult.success,
  };
}

import type { WebhookPayload, LeadRecord, LeadEnrichment, LeadScore } from "./types";

function generateIdempotencyKey(leadId: string): string {
  return `${leadId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateWebhook(
  payload: WebhookPayload,
  attempt: number
): Promise<boolean> {
  const latency = 200 + Math.random() * 300;
  await sleep(latency);

  if (attempt === 1 && Math.random() < 0.3) {
    return false;
  }

  return true;
}

export async function routeLeadToCRM(
  lead: LeadRecord,
  enrichment: LeadEnrichment,
  score: LeadScore
): Promise<{ success: boolean; attempts: number; idempotencyKey: string }> {
  const idempotencyKey = generateIdempotencyKey(lead.id);
  const payload: WebhookPayload = {
    idempotencyKey,
    lead,
    enrichment,
    score,
    timestamp: Date.now(),
  };

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const success = await simulateWebhook(payload, attempt);

    if (success) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[CRM Router] Lead routed successfully (attempt ${attempt})`,
          { idempotencyKey }
        );
      }
      return { success: true, attempts: attempt, idempotencyKey };
    }

    if (attempt < maxAttempts) {
      const backoff = Math.pow(2, attempt) * 500;
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[CRM Router] Attempt ${attempt} failed, retrying in ${backoff}ms`
        );
      }
      await sleep(backoff);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("[CRM Router] All attempts failed", { idempotencyKey });
  }

  return { success: false, attempts: maxAttempts, idempotencyKey };
}

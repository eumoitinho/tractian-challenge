const DEDUP_WINDOW_MS = 30 * 60 * 1000;

type SubmissionRecord = {
  fingerprint: string;
  timestamp: number;
};

const submissions: SubmissionRecord[] = [];

function createFingerprint(email: string, company: string): string {
  return `${email.toLowerCase().trim()}::${company.toLowerCase().trim()}`;
}

function pruneExpired(): void {
  const cutoff = Date.now() - DEDUP_WINDOW_MS;
  let i = 0;
  while (i < submissions.length) {
    if (submissions[i].timestamp < cutoff) {
      submissions.splice(i, 1);
    } else {
      i++;
    }
  }
}

export function isDuplicate(email: string, company: string): boolean {
  pruneExpired();
  const fp = createFingerprint(email, company);
  return submissions.some((s) => s.fingerprint === fp);
}

export function markSubmitted(email: string, company: string): void {
  const fp = createFingerprint(email, company);
  submissions.push({ fingerprint: fp, timestamp: Date.now() });
}

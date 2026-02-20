import type { LeadFormData } from "./types";

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

export function validateLeadForm(
  data: LeadFormData
): { valid: true } | { valid: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) errors.firstName = "required";
  if (!data.lastName.trim()) errors.lastName = "required";
  if (!data.company.trim()) errors.company = "required";
  if (!data.jobTitle.trim()) errors.jobTitle = "required";

  if (!data.email.trim()) {
    errors.email = "required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "invalid_email";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
}

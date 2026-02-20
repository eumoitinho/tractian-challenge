"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";
import { useFormAnalytics } from "@/lib/analytics";
import { processLead } from "@/lib/lead-pipeline/pipeline";
import { z } from "zod";

/* ── Country codes ── */
type CountryCode = {
  code: string;
  dial: string;
  flag: string;
  mask: string;
  maxDigits: number;
};

const COUNTRY_CODES: CountryCode[] = [
  { code: "US", dial: "+1", flag: "🇺🇸", mask: "(###) ###-####", maxDigits: 10 },
  { code: "BR", dial: "+55", flag: "🇧🇷", mask: "(##) #####-####", maxDigits: 11 },
  { code: "MX", dial: "+52", flag: "🇲🇽", mask: "(##) ####-####", maxDigits: 10 },
  { code: "CA", dial: "+1", flag: "🇨🇦", mask: "(###) ###-####", maxDigits: 10 },
  { code: "GB", dial: "+44", flag: "🇬🇧", mask: "#### ######", maxDigits: 10 },
  { code: "DE", dial: "+49", flag: "🇩🇪", mask: "#### #######", maxDigits: 11 },
  { code: "FR", dial: "+33", flag: "🇫🇷", mask: "# ## ## ## ##", maxDigits: 9 },
  { code: "ES", dial: "+34", flag: "🇪🇸", mask: "### ### ###", maxDigits: 9 },
  { code: "AR", dial: "+54", flag: "🇦🇷", mask: "(##) ####-####", maxDigits: 10 },
  { code: "CO", dial: "+57", flag: "🇨🇴", mask: "### ### ####", maxDigits: 10 },
  { code: "CL", dial: "+56", flag: "🇨🇱", mask: "# #### ####", maxDigits: 9 },
  { code: "PE", dial: "+51", flag: "🇵🇪", mask: "### ### ###", maxDigits: 9 },
];

function getDefaultCountry(locale: string): CountryCode {
  if (locale === "pt") return COUNTRY_CODES[1];
  if (locale === "es") return COUNTRY_CODES[2];
  return COUNTRY_CODES[0];
}

function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, "");
  let result = "";
  let digitIdx = 0;
  for (let i = 0; i < mask.length && digitIdx < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[digitIdx++];
    } else {
      result += mask[i];
    }
  }
  return result;
}

function stripMask(value: string): string {
  return value.replace(/\D/g, "");
}

/* ── Zod schemas ── */
const emailSchema = z.string().min(1).email();

function validatePhone(digits: string, country: CountryCode): boolean {
  if (!digits) return true;
  return digits.length >= Math.max(country.maxDigits - 2, 7) && digits.length <= country.maxDigits + 1;
}

/* ── Types ── */
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  plantSize: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  plantSize: "",
  message: "",
};

export function DemoForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(() => getDefaultCountry(locale));
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const { trackFieldFocus, markSubmitted: markFormSubmitted, getFormData } = useFormAnalytics("demo-form");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = t("required");
    if (!data.lastName.trim()) newErrors.lastName = t("required");

    if (!data.email.trim()) {
      newErrors.email = t("required");
    } else {
      const result = emailSchema.safeParse(data.email);
      if (!result.success) newErrors.email = t("invalidEmail");
    }

    const phoneDigits = stripMask(data.phone);
    if (phoneDigits && !validatePhone(phoneDigits, selectedCountry)) {
      newErrors.phone = t("invalidPhone") || "Invalid phone number";
    }

    if (!data.company.trim()) newErrors.company = t("required");
    if (!data.jobTitle.trim()) newErrors.jobTitle = t("required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const phoneDigits = stripMask(data.phone);
    const fullPhone = phoneDigits ? `${selectedCountry.dial} ${data.phone}` : "";

    const result = await processLead(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: fullPhone,
        company: data.company,
        jobTitle: data.jobTitle,
        plantSize: data.plantSize,
        message: data.message,
      },
      getFormData(),
      locale
    );

    markFormSubmitted();
    setSubmitting(false);

    if (!result.success && process.env.NODE_ENV === "development") {
      console.warn("[DemoForm] Pipeline error:", result.error);
    }

    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      const digits = stripMask(value);
      if (digits.length <= selectedCountry.maxDigits) {
        const masked = applyMask(digits, selectedCountry.mask);
        setData((prev) => ({ ...prev, phone: masked }));
      }
    } else {
      setData((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFocus = (field: keyof FormData) => {
    trackFieldFocus(field);
  };

  const inputClasses = (field: keyof FormData) =>
    cn(
      "w-full rounded-sm border bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:px-4 sm:py-3",
      errors[field] ? "border-red-500/50" : "border-slate-200 hover:border-slate-300"
    );

  if (submitted) {
    return (
      <section id="demo-form" className="py-12 px-4 overflow-x-hidden sm:py-20 lg:py-28">
        <div className="mx-auto max-w-lg rounded-sm border border-blue-200 bg-white p-8 sm:p-12 text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
          <h3 className="mb-2 text-xl sm:text-2xl font-bold text-slate-700">{t("success")}</h3>
        </div>
      </section>
    );
  }

  return (
    <section id="demo-form" className="py-12 px-4 overflow-x-hidden sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 sm:mb-8 text-center text-[20px] sm:text-3xl font-bold text-slate-700">{t("title")}</h2>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-slate-200 bg-slate-50 p-4 sm:p-8"
          noValidate
        >
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {/* First name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("firstName")} *
              </label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onFocus={() => handleFocus("firstName")}
                className={inputClasses("firstName")}
                placeholder={t("firstName")}
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
            </div>

            {/* Last name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("lastName")} *
              </label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onFocus={() => handleFocus("lastName")}
                className={inputClasses("lastName")}
                placeholder={t("lastName")}
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("email")} *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => handleFocus("email")}
                className={inputClasses("email")}
                placeholder={t("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Phone with country code */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("phone")}
              </label>
              <div className="flex gap-0">
                <div ref={countryRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1 rounded-l-sm border border-r-0 border-slate-200 bg-white px-2 py-2.5 text-sm hover:bg-slate-50 transition-colors sm:px-3 sm:py-3"
                  >
                    <span className="text-base">{selectedCountry.flag}</span>
                    <span className="text-slate-600 text-xs sm:text-sm">{selectedCountry.dial}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 z-50 mt-1 max-h-48 w-56 overflow-y-auto rounded-sm border border-slate-200 bg-white shadow-lg">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c);
                            setData((prev) => ({ ...prev, phone: "" }));
                            setShowCountryDropdown(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors",
                            selectedCountry.code === c.code && "bg-blue-50 text-blue-700"
                          )}
                        >
                          <span>{c.flag}</span>
                          <span className="font-medium">{c.code}</span>
                          <span className="text-slate-400">{c.dial}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onFocus={() => handleFocus("phone")}
                  className={cn(
                    "flex-1 min-w-0 rounded-r-sm border bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:px-4 sm:py-3",
                    errors.phone ? "border-red-500/50" : "border-slate-200 hover:border-slate-300"
                  )}
                  placeholder={selectedCountry.mask.replace(/#/g, "0")}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("company")} *
              </label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => handleChange("company", e.target.value)}
                onFocus={() => handleFocus("company")}
                className={inputClasses("company")}
                placeholder={t("company")}
              />
              {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
            </div>

            {/* Job title */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("jobTitle")} *
              </label>
              <input
                type="text"
                value={data.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                onFocus={() => handleFocus("jobTitle")}
                className={inputClasses("jobTitle")}
                placeholder={t("jobTitle")}
              />
              {errors.jobTitle && <p className="mt-1 text-xs text-red-400">{errors.jobTitle}</p>}
            </div>

            {/* Plant size */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("plantSize")}
              </label>
              <select
                value={data.plantSize}
                onChange={(e) => handleChange("plantSize", e.target.value)}
                onFocus={() => handleFocus("plantSize")}
                className={cn(inputClasses("plantSize"), "appearance-none")}
              >
                <option value="">{t("plantSize")}</option>
                <option value="small">{t("plantSizeOptions.small")}</option>
                <option value="medium">{t("plantSizeOptions.medium")}</option>
                <option value="large">{t("plantSizeOptions.large")}</option>
                <option value="enterprise">{t("plantSizeOptions.enterprise")}</option>
              </select>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                {t("message")}
              </label>
              <textarea
                value={data.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onFocus={() => handleFocus("message")}
                rows={3}
                className={cn(inputClasses("message"), "resize-none")}
                placeholder={t("message")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 sm:mt-6 w-full rounded-sm bg-blue-600 py-3 sm:py-4 text-sm sm:text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

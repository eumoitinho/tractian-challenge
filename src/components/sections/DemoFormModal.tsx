"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useDemoModal } from "@/lib/demo-modal-context";
import { useFormAnalytics } from "@/lib/analytics";
import { processLead } from "@/lib/lead-pipeline/pipeline";
import { z } from "zod";

const JOB_TITLES = [
  "Plant Manager",
  "Maintenance Manager",
  "Reliability Engineer",
  "Maintenance Engineer",
  "Operations Manager",
  "VP of Operations",
  "Director of Maintenance",
  "Facilities Manager",
  "Other",
];

const INDUSTRIES = [
  "Manufacturing",
  "Food & Beverage",
  "Automotive & Parts",
  "Mining & Metals",
  "Chemicals",
  "Oil & Gas",
  "Facilities",
  "Heavy Equipment",
  "Mills & Agriculture",
  "Fleet",
  "Other",
];

const SOLUTIONS = [
  "Condition Monitoring",
  "CMMS",
  "OEE",
  "All Solutions",
];

const ASSET_OPTIONS = ["Less than 25", "25 - 49", "50 - 99", "100 - 249", "250+", "N/A"];

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
  if (locale === "pt") return COUNTRY_CODES[1]; // BR
  if (locale === "es") return COUNTRY_CODES[2]; // MX
  return COUNTRY_CODES[0]; // US
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

const emailSchema = z.string().min(1).email();
const nameSchema = z.string().min(1).regex(/\s/, "Full name required");

function validatePhone(digits: string, country: CountryCode): boolean {
  if (!digits) return true; // optional
  return digits.length >= Math.max(country.maxDigits - 2, 7) && digits.length <= country.maxDigits + 1;
}

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

export function DemoFormModal() {
  const { isOpen, close } = useDemoModal();
  const t = useTranslations("demoModal");
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { trackFieldFocus, markSubmitted, getFormData } = useFormAnalytics("demo-modal");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>(() => getDefaultCountry(locale));
  const [countryOpen, setCountryOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [solution, setSolution] = useState("");
  const [assets, setAssets] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    setCountry(getDefaultCountry(locale));
  }, [locale]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  const handlePhoneChange = (value: string) => {
    const digits = stripMask(value).slice(0, country.maxDigits);
    setPhoneRaw(digits);
    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!nameSchema.safeParse(name.trim()).success) {
      newErrors.name = name.trim().length === 0 ? "Required" : "Enter full name";
    }

    if (!emailSchema.safeParse(email.trim()).success) {
      newErrors.email = email.trim().length === 0 ? "Required" : "Invalid email";
    }

    if (phoneRaw && !validatePhone(phoneRaw, country)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const nameParts = name.trim().split(/\s+/);
    const fullPhone = phoneRaw ? `${country.dial}${phoneRaw}` : "";

    const result = await processLead(
      {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email,
        phone: fullPhone,
        company: "",
        jobTitle,
        industry,
        solution,
        assets,
      },
      getFormData(),
      locale
    );

    markSubmitted();
    setSubmitting(false);

    if (!result.success && process.env.NODE_ENV === "development") {
      console.warn("[DemoFormModal] Pipeline error:", result.error);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      close();
      setName("");
      setEmail("");
      setPhoneRaw("");
      setJobTitle("");
      setIndustry("");
      setSolution("");
      setAssets("");
      setErrors({});
    }, 2000);
  };

  if (!isOpen) return null;

  const inputBase = "w-full h-12 rounded-sm bg-white px-3 text-base text-slate-700 placeholder:text-slate-500 outline outline-1 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all";
  const inputNormal = `${inputBase} outline-slate-400`;
  const inputError = `${inputBase} outline-red-500`;
  const selectBase = `${inputNormal} pr-8 appearance-none cursor-pointer`;
  const chevronSvg = <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex min-h-full items-start justify-center overflow-y-auto p-4 pt-8 pb-8 bg-slate-900/70 sm:items-center sm:pt-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-3xl shadow-xl transition-all">
        <div className="flex flex-col rounded-sm bg-white text-left">
          <div className="w-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 md:px-16 lg:py-12">

            <button
              onClick={close}
              className="absolute right-3 top-3 z-20 flex items-center justify-center w-8 h-8 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 17L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <article className="mb-6 flex flex-col gap-y-2 text-center sm:px-5">
              <h2 className="font-semibold text-2xl sm:text-[32px] sm:leading-[40px] text-slate-700" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {t("title")}
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                {t("subtitle")}
              </p>
            </article>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-slate-700">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-3" noValidate>

                <fieldset className="flex w-full flex-col gap-1">
                  <input
                    type="text"
                    placeholder={t("name")}
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                    onFocus={() => trackFieldFocus("name")}
                    className={errors.name ? inputError : inputNormal}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </fieldset>

                <fieldset className="flex w-full flex-col gap-1">
                  <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                    onFocus={() => trackFieldFocus("email")}
                    className={errors.email ? inputError : inputNormal}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </fieldset>

                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <fieldset className="flex w-full flex-col gap-1">
                    <div className="flex relative">
                      <button
                        type="button"
                        onClick={() => setCountryOpen(!countryOpen)}
                        className="flex items-center justify-center h-12 px-2 sm:px-3 bg-white rounded-l-sm outline outline-1 outline-slate-400 outline-offset-0 text-sm text-slate-500 gap-1 cursor-pointer shrink-0 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-lg leading-none">{country.flag}</span>
                        <svg className={`w-3 h-3 transition-transform ${countryOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>
                      </button>
                      {countryOpen && (
                        <div className="absolute top-full left-0 mt-1 w-64 max-h-48 overflow-y-auto bg-white border border-slate-300 rounded-sm shadow-lg z-50">
                          {COUNTRY_CODES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountry(c); setCountryOpen(false); setPhoneRaw(""); }}
                              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${country.code === c.code ? "bg-slate-100" : ""}`}
                            >
                              <span className="text-lg leading-none">{c.flag}</span>
                              <span className="text-slate-700">{c.code}</span>
                              <span className="text-slate-400">{c.dial}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      <input
                        type="tel"
                        placeholder={country.mask.replace(/#/g, "0")}
                        value={applyMask(phoneRaw, country.mask)}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={() => { trackFieldFocus("phone"); setCountryOpen(false); }}
                        className={`w-full h-12 rounded-r-sm bg-white px-3 text-base text-slate-700 placeholder:text-slate-500 outline outline-1 outline-offset-0 -ml-px focus:outline-blue-600 focus:outline-2 transition-all ${errors.phone ? "outline-red-500" : "outline-slate-400"}`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </fieldset>

                  <fieldset className="relative flex w-full flex-col gap-2">
                    <select
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      onFocus={() => trackFieldFocus("jobTitle")}
                      className={selectBase}
                    >
                      <option value="" className="text-slate-500">{t("jobTitle")}</option>
                      {JOB_TITLES.map((j) => <option key={j} value={j}>{j}</option>)}
                    </select>
                    {chevronSvg}
                  </fieldset>
                </div>

                <fieldset className="relative flex w-full flex-col gap-2">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    onFocus={() => trackFieldFocus("industry")}
                    className={selectBase}
                  >
                    <option value="" className="text-slate-500">{t("industry")}</option>
                    {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                  {chevronSvg}
                </fieldset>

                <fieldset className="relative flex w-full flex-col gap-2">
                  <select
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    onFocus={() => trackFieldFocus("solution")}
                    className={selectBase}
                  >
                    <option value="" className="text-slate-500">{t("solution")}</option>
                    {SOLUTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {chevronSvg}
                </fieldset>

                <fieldset className="flex w-full flex-col gap-2 rounded-sm border border-slate-400 bg-white p-3">
                  <p className="text-sm font-medium text-slate-500">{t("assetsQuestion")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ASSET_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className={`cursor-pointer rounded-sm border px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 font-medium text-center transition-all ${
                          assets === opt
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="assets"
                          value={opt}
                          checked={assets === opt}
                          onChange={(e) => setAssets(e.target.value)}
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-sm bg-green-600 text-white text-base sm:text-lg font-medium text-center transition-colors hover:bg-green-900 active:bg-green-950 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? t("submitting") : t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

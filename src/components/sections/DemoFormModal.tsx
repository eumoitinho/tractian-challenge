"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useDemoModal } from "@/lib/demo-modal-context";
import { useFormAnalytics } from "@/lib/analytics";
import { processLead } from "@/lib/lead-pipeline/pipeline";

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

export function DemoFormModal() {
  const { isOpen, close } = useDemoModal();
  const t = useTranslations("demoModal");
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { trackFieldFocus, markSubmitted, getFormData } = useFormAnalytics("demo-modal");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1");
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [solution, setSolution] = useState("");
  const [assets, setAssets] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const nameParts = name.trim().split(/\s+/);
    const result = await processLead(
      {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email,
        phone,
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

    if (!result.success) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[DemoFormModal] Pipeline error:", result.error);
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      close();
      setName("");
      setEmail("");
      setPhone("+1");
      setJobTitle("");
      setIndustry("");
      setSolution("");
      setAssets("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex min-h-full items-center justify-center p-4 bg-slate-900/70"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full shadow-xl transition-all md:w-auto">
        <div className="flex max-w-3xl flex-col rounded-sm bg-white text-left">
          <div className="w-full bg-slate-50 px-6 py-8 md:px-16 lg:py-12">

            <button
              onClick={close}
              className="absolute right-3 top-3 z-20 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 17L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>


            <article className="mb-6 flex flex-col gap-y-2 px-5 text-center">
              <h2 className="font-semibold text-[32px] leading-[40px] text-slate-700" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {t("title")}
              </h2>
              <p className="text-base text-slate-500">
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
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-3">

                <fieldset className="flex w-full flex-col gap-2">
                  <input
                    type="text"
                    placeholder={t("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => trackFieldFocus("name")}
                    required
                    className="w-full h-12 rounded-sm bg-white px-3 text-base text-slate-700 placeholder:text-slate-500 outline outline-1 outline-slate-400 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all"
                  />
                </fieldset>


                <fieldset className="flex w-full flex-col gap-2">
                  <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => trackFieldFocus("email")}
                    required
                    className="w-full h-12 rounded-sm bg-white px-3 text-base text-slate-700 placeholder:text-slate-500 outline outline-1 outline-slate-400 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all"
                  />
                </fieldset>


                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <fieldset className="flex w-full flex-col gap-2">
                    <div className="flex">
                      <div className="flex items-center justify-center h-12 px-3 bg-white rounded-l-sm outline outline-1 outline-slate-400 outline-offset-0 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="text-base">🇺🇸</span>
                          <svg className="w-3 h-3" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>
                        </span>
                      </div>
                      <input
                        type="tel"
                        placeholder={t("phone")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => trackFieldFocus("phone")}
                        className="w-full h-12 rounded-r-sm bg-white px-3 text-base text-slate-700 placeholder:text-slate-500 outline outline-1 outline-slate-400 outline-offset-0 -ml-px focus:outline-blue-600 focus:outline-2 transition-all"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="relative flex w-full flex-col gap-2">
                    <select
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      onFocus={() => trackFieldFocus("jobTitle")}
                      className="w-full h-12 rounded-sm bg-white px-3 pr-8 text-base text-slate-700 appearance-none outline outline-1 outline-slate-400 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all cursor-pointer"
                    >
                      <option value="" className="text-slate-500">{t("jobTitle")}</option>
                      {JOB_TITLES.map((j) => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>
                  </fieldset>
                </div>


                <fieldset className="relative flex w-full flex-col gap-2">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    onFocus={() => trackFieldFocus("industry")}
                    className="w-full h-12 rounded-sm bg-white px-3 pr-8 text-base text-slate-700 appearance-none outline outline-1 outline-slate-400 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all cursor-pointer"
                  >
                    <option value="" className="text-slate-500">{t("industry")}</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>
                </fieldset>


                <fieldset className="relative flex w-full flex-col gap-2">
                  <select
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    onFocus={() => trackFieldFocus("solution")}
                    className="w-full h-12 rounded-sm bg-white px-3 pr-8 text-base text-slate-700 appearance-none outline outline-1 outline-slate-400 outline-offset-0 focus:outline-blue-600 focus:outline-2 transition-all cursor-pointer"
                  >
                    <option value="" className="text-slate-500">{t("solution")}</option>
                    {SOLUTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgb(100,116,139)" strokeWidth="1.5"/></svg>
                </fieldset>


                <fieldset className="flex w-full flex-col gap-2 rounded-sm border border-slate-400 bg-white p-3">
                  <p className="text-sm font-medium text-slate-500">{t("assetsQuestion")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ASSET_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className={`cursor-pointer rounded-sm border px-3 py-1.5 text-sm font-medium text-center transition-all ${
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
                  className="w-full h-12 rounded-sm bg-green-600 text-white text-lg font-medium text-center transition-colors hover:bg-green-900 active:bg-green-950 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
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

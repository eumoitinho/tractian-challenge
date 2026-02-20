"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2 } from "lucide-react";
import { useFormAnalytics } from "@/lib/analytics";
import { processLead } from "@/lib/lead-pipeline/pipeline";

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
  const { trackFieldFocus, markSubmitted: markFormSubmitted, getFormData } = useFormAnalytics("demo-form");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = t("required");
    if (!data.lastName.trim()) newErrors.lastName = t("required");
    if (!data.email.trim()) {
      newErrors.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = t("invalidEmail");
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

    const result = await processLead(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
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
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFocus = (field: keyof FormData) => {
    trackFieldFocus(field);
  };

  const inputClasses = (field: keyof FormData) =>
    cn(
      "w-full rounded-sm border bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50",
      errors[field] ? "border-red-500/50" : "border-slate-200 hover:border-slate-300"
    );

  if (submitted) {
    return (
      <section id="demo-form" className="py-20 lg:py-28">
        <div className="container-main">
          <div className="mx-auto max-w-lg rounded-sm border border-blue-200 bg-white p-12 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h3 className="mb-2 text-2xl font-bold text-slate-700">{t("success")}</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo-form" className="py-20 lg:py-28">
      <div className="container-main">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-700">{t("title")}</h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-slate-200 bg-slate-50 p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">

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
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
                )}
              </div>


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
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                )}
              </div>


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
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>


              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onFocus={() => handleFocus("phone")}
                  className={inputClasses("phone")}
                  placeholder={t("phone")}
                />
              </div>


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
                {errors.company && (
                  <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                )}
              </div>


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
                {errors.jobTitle && (
                  <p className="mt-1 text-xs text-red-400">{errors.jobTitle}</p>
                )}
              </div>


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
              className="btn-primary mt-6 w-full py-4 text-base disabled:opacity-50"
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
      </div>
    </section>
  );
}

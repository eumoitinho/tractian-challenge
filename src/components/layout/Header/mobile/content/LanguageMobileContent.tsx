"use client";

import { cn } from "@/lib/utils";
import { GlobeIcon } from "../../shared/HeaderIcons";
import { localeLabels } from "../../shared/constants";

interface LanguageMobileContentProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export function LanguageMobileContent({ locale, onLocaleChange }: LanguageMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-1">
      {Object.entries(localeLabels).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onLocaleChange(key)}
          className={cn(
            "w-full text-left py-2 text-sm rounded-sm px-3",
            locale === key ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

interface LanguageMobileTriggerProps {
  locale: string;
}

export function LanguageMobileTrigger({ locale }: LanguageMobileTriggerProps) {
  return (
    <div className="flex items-center gap-2">
      <GlobeIcon className="text-slate-500 w-5 h-5" />
      <span className="font-semibold">{localeLabels[locale]}</span>
    </div>
  );
}

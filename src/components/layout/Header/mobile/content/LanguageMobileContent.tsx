"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "../../shared/HeaderIcons";
import { localeLabels, localeFlagUrls } from "../../shared/constants";

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
            "w-full text-left py-2 text-sm rounded-sm px-3 flex items-center gap-2",
            locale === key ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600"
          )}
        >
          <Image src={localeFlagUrls[key]} alt="" width={18} height={18} unoptimized className="w-[18px] h-[18px]" />
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
    <div className="flex items-center gap-x-4">
      <GlobeIcon className="w-5 h-5 text-slate-500" />
      <p className="font-medium text-slate-500 text-sm">{localeLabels[locale]}</p>
    </div>
  );
}

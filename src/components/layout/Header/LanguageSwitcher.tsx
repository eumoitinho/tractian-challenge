"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, GlobeIcon } from "./HeaderIcons";
import { localeLabels } from "./constants";

interface LanguageSwitcherProps {
  locale: string;
  isOpen: boolean;
  onToggle: () => void;
  onLocaleChange: (locale: string) => void;
}

export function LanguageSwitcher({
  locale,
  isOpen,
  onToggle,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const handleSelect = (key: string) => {
    onLocaleChange(key);
  };

  return (
    <div className="relative items-center flex h-full">
      <button
        className="items-center gap-x-2 cursor-pointer flex h-7 px-2 text-slate-500 hover:text-blue-600 transition-colors"
        onClick={onToggle}
      >
        <GlobeIcon className="text-slate-500 hover:text-blue-600 transition-colors" />
        <ChevronDown isOpen={isOpen} className="h-3 w-3" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-slate-50 border border-slate-300 py-1 z-[60] rounded-sm">
          {Object.entries(localeLabels).map(([key, label]) => (
            <button
              key={key}
              onMouseDown={() => handleSelect(key)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm text-slate-500 transition-colors",
                locale === key ? "bg-slate-100" : "hover:bg-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

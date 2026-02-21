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
    <div
  className="items-center bottom-[-8.63rem] box-border text-slate-500 flex-col h-32 left-[0.75rem] leading-6 absolute right-[-12.88rem] top-[2.50rem] w-full flex border-2 border-slate-300 border-solid rounded-sm p-2 bg-slate-50 lg:left-[0.75rem]  lg:top-[2.00rem] lg:w-auto"
  style={{
    columnRuleWidth: "2px",
    outlineWidth: "2px",
    overflowBlock: "visible",
    overflowInline: "visible",
    textEmphasisPosition: "auto",
  }}>
      <button
        className="items-center bg-slate-200 gap-x-2 cursor-pointer text-sm h-10 leading-[1.38rem] py-2 px-3 text-center w-full flex rounded-sm lg:pt-2  lg:pb-2"
        onClick={onToggle}
      >
        <GlobeIcon className="w-5 h-5" />
        <ChevronDown isOpen={isOpen} className="h-3 w-3" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-[-8px] w-56 bg-slate-50 border border-slate-300 py-1 z-[60] rounded-sm">
          {Object.entries(localeLabels).map(([key, label]) => (
            <button
              key={key}
              onMouseDown={() => handleSelect(key)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm text-slate-500 transition-colors flex items-center gap-2",
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


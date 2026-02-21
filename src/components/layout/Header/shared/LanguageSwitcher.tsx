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
    <div className="relative">
      <button
        className="items-center gap-x-2 cursor-pointer text-sm text-slate-500 hover:text-blue-600 transition-colors flex"
        onClick={onToggle}
      >
        <GlobeIcon className="w-5 h-5" />
        <ChevronDown isOpen={isOpen} className="h-3 w-3" />
      </button>
      {isOpen && (
        <div
          className="items-center bottom-[-8.63rem] box-border text-slate-500 flex-col h-32 leading-6 absolute left-0 w-48 flex border-2 border-slate-300 border-solid rounded-sm p-2 bg-slate-50 z-50"
          style={{
            columnRuleWidth: "2px",
            outlineWidth: "2px",
            overflowBlock: "visible",
            overflowInline: "visible",
            textEmphasisPosition: "auto",
          }}
        >
          {Object.entries(localeLabels).map(([key, label]) => (
            <button
              key={key}
              onMouseDown={() => handleSelect(key)}
              className={cn(
                "items-center gap-x-2 cursor-pointer text-sm h-10 leading-[1.38rem] py-2 px-3 text-center w-44 flex rounded-sm",
                locale === key ? "bg-slate-200" : ""
              )}
              style={{
                appearance: "button",
              }}
            >
              <p className="h-6">{label}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


"use client";

import { type ReactNode } from "react";
import { ChevronDown } from "../shared/HeaderIcons";

interface MobileNavSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function MobileNavSection({ title, isOpen, onToggle, children }: MobileNavSectionProps) {
  return (
    <div className="border-b border-slate-100">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 px-4 text-lg font-semibold text-slate-700">
        {title}
        <ChevronDown isOpen={isOpen} className="w-3 h-3" />
      </button>
      {isOpen && (
        <div className="bg-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

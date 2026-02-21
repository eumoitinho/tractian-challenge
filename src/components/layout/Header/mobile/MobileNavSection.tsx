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
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 text-slate-500">
        <p className="text-base">{title}</p>
        <ChevronDown isOpen={isOpen} className="w-4 h-4 text-slate-500" />
      </button>
      {isOpen && (
        <div className="bg-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

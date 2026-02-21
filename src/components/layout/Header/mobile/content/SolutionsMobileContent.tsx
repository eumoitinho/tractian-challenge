"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { SOLUTION_ITEM_ICONS, type SolutionColumn } from "../../shared/constants";

interface SolutionsMobileContentProps {
  solutionsData: SolutionColumn[];
}

export function SolutionsMobileContent({ solutionsData }: SolutionsMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-6">
      {solutionsData.map((col, colIdx) => (
        <div key={colIdx} className="space-y-3">
          <p className="text-sm font-semibold text-slate-800 border-l-2 border-blue-600 pl-3">{col.title}</p>
          <div className="space-y-2 pl-4">
            {col.items.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 py-1"
                onClick={() => trackNavClick(item.label, "#")}
              >
                <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={16} boxClass="w-6 h-6" />
                <span className="text-sm text-slate-600">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

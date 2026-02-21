"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { SOLUTION_COL_ICONS, SOLUTION_ITEM_ICONS, type SolutionColumn } from "../../shared/constants";

interface SolutionsMobileContentProps {
  solutionsData: SolutionColumn[];
}

export function SolutionsMobileContent({ solutionsData }: SolutionsMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-8">
      {solutionsData.map((col, colIdx) => (
        <div key={colIdx} className="space-y-4">
          <a href="#" className="flex items-center gap-2" onClick={() => trackNavClick(col.title, "#")}>
            <IconBox src={SOLUTION_COL_ICONS[colIdx]} size={20} boxClass="w-8 h-8" />
            <span className="font-semibold text-slate-800">{col.title}</span>
          </a>
          <div className="space-y-3">
            {col.items.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-start gap-3 py-1"
                onClick={() => trackNavClick(item.label, "#")}
              >
                <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={20} boxClass="w-8 h-8" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

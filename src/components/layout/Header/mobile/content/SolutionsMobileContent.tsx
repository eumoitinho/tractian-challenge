"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { SOLUTION_COL_ICONS, SOLUTION_ITEM_ICONS, type SolutionColumn } from "../../shared/constants";

interface SolutionsMobileContentProps {
  solutionsData: SolutionColumn[];
}

export function SolutionsMobileContent({ solutionsData }: SolutionsMobileContentProps) {
  return (
    <div className="py-4 px-4 space-y-6">
      {solutionsData.map((col, colIdx) => (
        <div key={colIdx} className="space-y-3">
          <a href="#" className="flex items-center gap-3" onClick={() => trackNavClick(col.title, "#")}>
            <IconBox src={SOLUTION_COL_ICONS[colIdx]} size={20} boxClass="w-8 h-8 bg-white" />
            <span className="text-sm font-semibold text-slate-700">{col.title}</span>
          </a>
          <div className="ml-4 space-y-3">
            {col.items.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-3"
                onClick={() => trackNavClick(item.label, "#")}
              >
                <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={20} boxClass="w-8 h-8 bg-white" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-xs text-slate-400">{item.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

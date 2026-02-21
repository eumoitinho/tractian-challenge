"use client";

import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { HoverArrow } from "../shared/HeaderIcons";
import { IconBox } from "../shared/IconBox";
import { SOLUTION_COL_ICONS, SOLUTION_ITEM_ICONS, type SolutionColumn } from "../shared/constants";

interface DesktopSolutionsDropdownProps {
  isOpen: boolean;
  solutionsData: SolutionColumn[];
}

export function DesktopSolutionsDropdown({
  isOpen,
  solutionsData,
}: DesktopSolutionsDropdownProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 w-full z-40 transition-all duration-200 origin-top",
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}
    >
      <div className="absolute inset-0 bg-slate-50" />
      <div className="relative mx-auto w-full max-w-[80rem] px-8 pt-8 pb-12">
        <div className="flex w-full lg:justify-between">
          {solutionsData.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col border-l border-slate-300 pl-4" style={{ gap: "24px" }}>
              <a href="#" className="flex items-center gap-2 group" onClick={() => trackNavClick(col.title, "#")}>
                <IconBox src={SOLUTION_COL_ICONS[colIdx]} size={20} boxClass="w-8 h-8" />
                <span className="font-semibold text-lg leading-7 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {col.title}
                  <HoverArrow />
                </span>
              </a>
              <div className="flex flex-col gap-4">
                {col.items.map((item, i) => (
                  <a key={i} href="#" className="group flex items-start gap-2" onClick={() => trackNavClick(item.label, "#")}>
                    <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={20} boxClass="w-8 h-8" />
                    <article className="flex flex-col min-w-0">
                      <span className="text-sm leading-5 font-semibold group-hover:text-blue-600 transition-colors flex items-center gap-1">
                        {item.label}
                        <HoverArrow />
                      </span>
                      <span className="text-slate-500 text-xs leading-4">{item.desc}</span>
                    </article>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { SOLUTION_COL_ICONS } from "../../shared/constants";

interface PricingMobileContentProps {
  pricingData: string[];
}

export function PricingMobileContent({ pricingData }: PricingMobileContentProps) {
  return (
    <div className="py-4 px-4 space-y-3">
      {pricingData.map((label, i) => (
        <a
          key={i}
          href="#"
          className="flex items-center gap-3"
          onClick={() => trackNavClick(label, "#")}
        >
          <IconBox src={SOLUTION_COL_ICONS[i % 3]} size={20} boxClass="w-8 h-8 bg-white" />
          <span className="text-sm text-slate-500">{label}</span>
        </a>
      ))}
    </div>
  );
}

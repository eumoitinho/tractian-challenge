"use client";

import { trackNavClick } from "@/lib/analytics/events";

interface PricingMobileContentProps {
  pricingData: string[];
}

export function PricingMobileContent({ pricingData }: PricingMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-2">
      {pricingData.map((label, i) => (
        <a
          key={i}
          href="#"
          className="block py-1.5 text-sm text-slate-600"
          onClick={() => trackNavClick(label, "#")}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

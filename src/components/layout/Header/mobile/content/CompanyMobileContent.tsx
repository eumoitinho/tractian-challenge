"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { type CompanyData } from "../../shared/constants";

interface CompanyMobileContentProps {
  companyData: CompanyData;
}

export function CompanyMobileContent({ companyData }: CompanyMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-2">
      {[...companyData.about, ...companyData.others].map((label, i) => (
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

"use client";

import Image from "next/image";
import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { COMPANY_ABOUT_IMAGES, COMPANY_OTHER_ICONS, type CompanyData } from "../../shared/constants";

interface CompanyMobileContentProps {
  companyData: CompanyData;
}

export function CompanyMobileContent({ companyData }: CompanyMobileContentProps) {
  return (
    <div className="py-4 px-4 space-y-4">
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase">{companyData.aboutLabel}</p>
        {companyData.about.map((label, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3"
            onClick={() => trackNavClick(label, "#")}
          >
            <div className="w-8 h-8 shrink-0 rounded-sm overflow-hidden border-2 border-neutral-200">
              <Image
                src={COMPANY_ABOUT_IMAGES[i]}
                alt={label}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <span className="text-sm text-slate-500">{label}</span>
          </a>
        ))}
      </div>
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase">{companyData.othersLabel}</p>
        {companyData.others.map((label, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3"
            onClick={() => trackNavClick(label, "#")}
          >
            <IconBox src={COMPANY_OTHER_ICONS[i]} size={16} boxClass="w-8 h-8 border-2 border-neutral-200" />
            <span className="text-sm text-slate-500">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

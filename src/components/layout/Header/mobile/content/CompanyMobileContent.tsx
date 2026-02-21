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
    <div className="py-4 px-4 space-y-8">
      <div className="flex flex-col gap-4">
        <p className="uppercase text-slate-500 text-sm">{companyData.aboutLabel}</p>
        {companyData.about.map((label, i) => (
          <a
            key={i}
            href="#"
            className="group ml-4 flex flex-row items-center gap-4"
            onClick={() => trackNavClick(label, "#")}
          >
            <figure className="h-[90px] w-[160px] shrink-0 rounded-sm overflow-hidden">
              <Image
                src={COMPANY_ABOUT_IMAGES[i]}
                alt={label}
                width={1080}
                height={720}
                className="h-[90px] w-[160px] rounded-sm object-cover"
                unoptimized
              />
            </figure>
            <p className="font-medium text-slate-500 text-base">{label}</p>
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="uppercase text-slate-500 text-sm">{companyData.othersLabel}</p>
        {companyData.others.map((label, i) => (
          <a
            key={i}
            href="#"
            className="group flex items-center gap-2"
            onClick={() => trackNavClick(label, "#")}
          >
            <IconBox src={COMPANY_OTHER_ICONS[i]} size={20} boxClass="w-8 h-8 bg-white" />
            <span className="text-sm text-slate-500">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

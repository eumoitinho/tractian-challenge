"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { WHO_ICON_PATH, type IndustriesData } from "../../shared/constants";

interface WhoWeServeMobileContentProps {
  industriesData: IndustriesData;
}

export function WhoWeServeMobileContent({ industriesData }: WhoWeServeMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase">{industriesData.byRoleLabel}</p>
        {industriesData.roles.map((role, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-2 py-1"
            onClick={() => trackNavClick(role.label, "#")}
          >
            <IconBox src={`${WHO_ICON_PATH}/who-we-serve-by-role.svg`} size={14} boxClass="w-6 h-6" />
            <span className="text-sm text-slate-600">{role.label}</span>
          </a>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase">{industriesData.bySectorLabel}</p>
        {industriesData.sectors.map((sector, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-2 py-1"
            onClick={() => trackNavClick(sector.label, "#")}
          >
            <IconBox src={`${WHO_ICON_PATH}/who-we-serve-${sector.icon}.svg`} size={14} boxClass="w-6 h-6" />
            <span className="text-sm text-slate-600">{sector.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

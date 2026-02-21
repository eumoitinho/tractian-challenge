"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { RESOURCES_ICON_PATH, type ResourcesData } from "../../shared/constants";

interface ResourcesMobileContentProps {
  resourcesData: ResourcesData;
}

export function ResourcesMobileContent({ resourcesData }: ResourcesMobileContentProps) {
  return (
    <div className="pb-4 px-4 space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase">{resourcesData.centerLabel}</p>
        {resourcesData.center.map((item, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-2 py-1"
            onClick={() => trackNavClick(item.label, "#")}
          >
            <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={14} boxClass="w-6 h-6" />
            <span className="text-sm text-slate-600">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase">{resourcesData.hubLabel}</p>
        {resourcesData.hub.map((item, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-2 py-1"
            onClick={() => trackNavClick(item.label, "#")}
          >
            <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={14} boxClass="w-6 h-6" />
            <span className="text-sm text-slate-600">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

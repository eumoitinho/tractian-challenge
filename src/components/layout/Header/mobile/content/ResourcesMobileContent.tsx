"use client";

import { trackNavClick } from "@/lib/analytics/events";
import { IconBox } from "../../shared/IconBox";
import { RESOURCES_ICON_PATH, type ResourcesData } from "../../shared/constants";

interface ResourcesMobileContentProps {
  resourcesData: ResourcesData;
}

export function ResourcesMobileContent({ resourcesData }: ResourcesMobileContentProps) {
  return (
    <div className="py-4 px-4 space-y-4">
      <div className="space-y-3">
        <p className="uppercase text-slate-500 text-sm">{resourcesData.centerLabel}</p>
        {resourcesData.center.map((item, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3"
            onClick={() => trackNavClick(item.label, "#")}
          >
            <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={16} boxClass="w-8 h-8 bg-white" />
            <span className="text-sm text-slate-500">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="space-y-3">
        <p className="uppercase text-slate-500 text-sm">{resourcesData.hubLabel}</p>
        {resourcesData.hub.map((item, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3"
            onClick={() => trackNavClick(item.label, "#")}
          >
            <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={16} boxClass="w-8 h-8 bg-white" />
            <span className="text-sm text-slate-500">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

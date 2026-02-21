"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { HoverArrow } from "./HeaderIcons";
import { IconBox } from "./IconBox";
import {
  WHO_ICON_PATH,
  RESOURCES_ICON_PATH,
  COMPANY_ABOUT_IMAGES,
  COMPANY_OTHER_ICONS,
  SOLUTION_COL_ICONS,
  type IndustriesData,
  type ResourcesData,
  type CompanyData,
} from "./constants";

const DROPDOWN_OPEN = "opacity-100 translate-y-0 pointer-events-auto visible";
const DROPDOWN_CLOSED = "opacity-0 -translate-y-2 pointer-events-none invisible";
const DROPDOWN_BASE = "absolute top-full z-40 transition-all duration-200 origin-top";
const CENTERED_DROPDOWN = `${DROPDOWN_BASE} left-1/2 -translate-x-1/2`;
const FULL_WIDTH_DROPDOWN = `${DROPDOWN_BASE} left-0 w-full`;

function handleNavClick(label: string, href: string) {
  trackNavClick(label, href);
}

interface WhoDropdownProps {
  isOpen: boolean;
  industriesData: IndustriesData;
}

export function WhoDropdown({ isOpen, industriesData }: WhoDropdownProps) {
  const sectorColCount = industriesData.sectors.length <= 6 ? 3 : 4;

  return (
    <div className={cn(FULL_WIDTH_DROPDOWN, isOpen ? DROPDOWN_OPEN : DROPDOWN_CLOSED)}>
      <div className="absolute inset-0 bg-slate-50 h-full w-full" />
      <div className="relative mx-auto w-full max-w-6xl px-8 py-8">
        <div className="flex">
          <div className="pr-10 min-w-[200px] border-l border-slate-300 pl-4">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{industriesData.byRoleLabel}</h3>
            <div className="flex flex-col gap-3">
              {industriesData.roles.map((role, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-3"
                  onClick={() => handleNavClick(role.label, "#")}
                >
                  <IconBox src={`${WHO_ICON_PATH}/who-we-serve-by-role.svg`} size={16} boxClass="w-7 h-7" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {role.label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="pl-10 flex-1 border-l border-slate-300">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{industriesData.bySectorLabel}</h3>
            <div
              className="grid gap-x-8 gap-y-3"
              style={{ gridTemplateColumns: `repeat(${sectorColCount}, minmax(0, 1fr))` }}
            >
              {industriesData.sectors.map((sector, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-3"
                  onClick={() => handleNavClick(sector.label, "#")}
                >
                  <IconBox src={`${WHO_ICON_PATH}/who-we-serve-${sector.icon}.svg`} size={16} boxClass="w-7 h-7" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {sector.label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResourcesDropdownProps {
  isOpen: boolean;
  resourcesData: ResourcesData;
}

export function ResourcesDropdown({ isOpen, resourcesData }: ResourcesDropdownProps) {
  return (
    <div className={cn(CENTERED_DROPDOWN, isOpen ? DROPDOWN_OPEN : DROPDOWN_CLOSED)}>
      <div className="w-[60.63rem] bg-slate-50 rounded-sm">
        <div className="flex px-8 py-8">
          <div className="flex-1 border-l border-slate-300 pl-6">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{resourcesData.centerLabel}</h3>
            <div className="grid gap-x-6 gap-y-3" style={{ gridTemplateColumns: "189.734px 189.734px 189.734px" }}>
              {resourcesData.center.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-3"
                  onClick={() => handleNavClick(item.label, "#")}
                >
                  <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={16} boxClass="w-7 h-7" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {item.label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="border-l border-slate-300 pl-6 min-w-[200px]">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{resourcesData.hubLabel}</h3>
            <div className="flex flex-col gap-3">
              {resourcesData.hub.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-3"
                  onClick={() => handleNavClick(item.label, "#")}
                >
                  <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={16} boxClass="w-7 h-7" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {item.label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CompanyDropdownProps {
  isOpen: boolean;
  companyData: CompanyData;
}

export function CompanyDropdown({ isOpen, companyData }: CompanyDropdownProps) {
  return (
    <div className={cn(CENTERED_DROPDOWN, isOpen ? DROPDOWN_OPEN : DROPDOWN_CLOSED)}>
      <div className="w-[60.63rem] bg-slate-50 rounded-sm">
        <div className="flex px-8 py-8">
          <div className="flex-1 border-l border-slate-300 pl-6">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{companyData.aboutLabel}</h3>
            <div className="grid grid-cols-3 gap-5">
              {companyData.about.map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex flex-col gap-2"
                  onClick={() => handleNavClick(label, "#")}
                >
                  <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm bg-slate-100">
                    <Image
                      src={COMPANY_ABOUT_IMAGES[i]}
                      alt={label}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="border-l border-slate-300 pl-6 min-w-[220px]">
            <h3 className="text-sm text-slate-400 font-medium mb-5">{companyData.othersLabel}</h3>
            <div className="flex flex-col gap-4">
              {companyData.others.map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-3"
                  onClick={() => handleNavClick(label, "#")}
                >
                  <IconBox src={COMPANY_OTHER_ICONS[i]} size={16} boxClass="w-8 h-8" />
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {label}
                    <HoverArrow />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PricingDropdownProps {
  isOpen: boolean;
  pricingData: string[];
}

export function PricingDropdown({ isOpen, pricingData }: PricingDropdownProps) {
  return (
    <div className={cn(CENTERED_DROPDOWN, isOpen ? DROPDOWN_OPEN : DROPDOWN_CLOSED)}>
      <div className="w-[60.63rem] bg-slate-50 rounded-sm">
        <div className="flex items-center px-8 py-6">
          {pricingData.map((label, i) => (
            <a
              key={i}
              href="#"
              className={cn("group flex items-center gap-4 flex-1 py-3", "border-l border-slate-300 pl-6")}
              onClick={() => handleNavClick(label, "#")}
            >
              <IconBox src={SOLUTION_COL_ICONS[i % 3]} size={20} boxClass="w-10 h-10" />
              <span className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                {label}
                <HoverArrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { ChevronDown, GlobeIcon } from "./HeaderIcons";
import { IconBox } from "./IconBox";
import TractianLogo from "./TractianLogo";
import {
  localeLabels,
  WHO_ICON_PATH,
  RESOURCES_ICON_PATH,
  SOLUTION_ITEM_ICONS,
  type SolutionColumn,
  type IndustriesData,
  type ResourcesData,
  type CompanyData,
} from "./constants";

interface MobileMenuTranslations {
  solutions: string;
  whoWeServe: string;
  resources: string;
  company: string;
  pricing: string;
  login: string;
  getDemo: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onLocaleChange: (locale: string) => void;
  onDemoClick: () => void;
  solutionsData: SolutionColumn[];
  industriesData: IndustriesData;
  resourcesData: ResourcesData;
  companyData: CompanyData;
  pricingData: string[];
  translations: MobileMenuTranslations;
}

function handleNavClick(label: string, href: string) {
  trackNavClick(label, href);
}

export function MobileMenu({
  isOpen,
  onClose,
  locale,
  onLocaleChange,
  onDemoClick,
  solutionsData,
  industriesData,
  resourcesData,
  companyData,
  pricingData,
  translations,
}: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleToggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const handleLocaleChange = (key: string) => {
    onLocaleChange(key);
    onClose();
  };

  const handleDemoClick = () => {
    onDemoClick();
    onClose();
  };

  const handleLoginClick = () => {
    handleNavClick("login", "https://app.tractian.com");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex justify-between items-center px-4 h-16 border-b border-slate-200 shrink-0">
        <a href={`/${locale}`}>
          <TractianLogo />
        </a>
        <button className="p-2 text-blue-600" onClick={onClose} aria-label="Close Menu">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("solutions")} className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700">
            {translations.solutions}
            <ChevronDown isOpen={expandedSection === "solutions"} className="w-3 h-3" />
          </button>
          {expandedSection === "solutions" && (
            <div className="pb-4 px-4 space-y-6">
              {solutionsData.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <p className="text-sm font-semibold text-slate-800 border-l-2 border-blue-600 pl-3">{col.title}</p>
                  <div className="space-y-2 pl-4">
                    {col.items.map((item, i) => (
                      <a
                        key={i}
                        href="#"
                        className="flex items-center gap-2 py-1"
                        onClick={() => handleNavClick(item.label, "#")}
                      >
                        <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={16} boxClass="w-6 h-6" />
                        <span className="text-sm text-slate-600">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("who")} className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700">
            {translations.whoWeServe}
            <ChevronDown isOpen={expandedSection === "who"} className="w-3 h-3" />
          </button>
          {expandedSection === "who" && (
            <div className="pb-4 px-4 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400 uppercase">{industriesData.byRoleLabel}</p>
                {industriesData.roles.map((role, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 py-1"
                    onClick={() => handleNavClick(role.label, "#")}
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
                    onClick={() => handleNavClick(sector.label, "#")}
                  >
                    <IconBox src={`${WHO_ICON_PATH}/who-we-serve-${sector.icon}.svg`} size={14} boxClass="w-6 h-6" />
                    <span className="text-sm text-slate-600">{sector.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("resources")} className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700">
            {translations.resources}
            <ChevronDown isOpen={expandedSection === "resources"} className="w-3 h-3" />
          </button>
          {expandedSection === "resources" && (
            <div className="pb-4 px-4 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400 uppercase">{resourcesData.centerLabel}</p>
                {resourcesData.center.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 py-1"
                    onClick={() => handleNavClick(item.label, "#")}
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
                    onClick={() => handleNavClick(item.label, "#")}
                  >
                    <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={14} boxClass="w-6 h-6" />
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("company")} className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700">
            {translations.company}
            <ChevronDown isOpen={expandedSection === "company"} className="w-3 h-3" />
          </button>
          {expandedSection === "company" && (
            <div className="pb-4 px-4 space-y-2">
              {[...companyData.about, ...companyData.others].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="block py-1.5 text-sm text-slate-600"
                  onClick={() => handleNavClick(label, "#")}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("pricing")} className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700">
            {translations.pricing}
            <ChevronDown isOpen={expandedSection === "pricing"} className="w-3 h-3" />
          </button>
          {expandedSection === "pricing" && (
            <div className="pb-4 px-4 space-y-2">
              {pricingData.map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="block py-1.5 text-sm text-slate-600"
                  onClick={() => handleNavClick(label, "#")}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("language")} className="w-full flex items-center justify-between py-4 px-4 text-slate-700">
            <div className="flex items-center gap-2">
              <GlobeIcon className="text-slate-500 w-5 h-5" />
              <span className="font-semibold">{localeLabels[locale]}</span>
            </div>
            <ChevronDown isOpen={expandedSection === "language"} className="w-3 h-3" />
          </button>
          {expandedSection === "language" && (
            <div className="pb-4 px-4 space-y-1">
              {Object.entries(localeLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleLocaleChange(key)}
                  className={cn(
                    "w-full text-left py-2 text-sm rounded-sm px-3",
                    locale === key ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 space-y-3 pb-8 shrink-0">
        <a
          href="https://app.tractian.com"
          className="block w-full text-center py-3 text-blue-600 font-medium border-2 border-blue-600 rounded-sm"
          onClick={handleLoginClick}
        >
          {translations.login}
        </a>
        <button onClick={handleDemoClick} className="block w-full py-3 text-white font-medium bg-blue-600 rounded-sm">
          {translations.getDemo}
        </button>
      </div>
    </div>
  );
}

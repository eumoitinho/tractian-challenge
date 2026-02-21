"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { ChevronDown } from "../shared/HeaderIcons";
import TractianLogo from "../shared/TractianLogo";
import {
  type SolutionColumn,
  type IndustriesData,
  type ResourcesData,
  type CompanyData,
} from "../shared/constants";
import { MobileNavSection } from "./MobileNavSection";
import {
  SolutionsMobileContent,
  WhoWeServeMobileContent,
  ResourcesMobileContent,
  CompanyMobileContent,
  PricingMobileContent,
  LanguageMobileContent,
  LanguageMobileTrigger,
} from "./content";

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
    trackNavClick("login", "https://app.tractian.com");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex justify-between items-center px-4 h-16 border-b border-slate-200 shrink-0 bg-slate-100 sticky top-0 z-10">
        <a href={`/${locale}`}>
          <TractianLogo />
        </a>
        <button className="p-2 text-slate-500" onClick={onClose} aria-label="Close Menu">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <MobileNavSection title={translations.solutions} isOpen={expandedSection === "solutions"} onToggle={() => handleToggleSection("solutions")}>
          <SolutionsMobileContent solutionsData={solutionsData} />
        </MobileNavSection>

        <MobileNavSection title={translations.whoWeServe} isOpen={expandedSection === "who"} onToggle={() => handleToggleSection("who")}>
          <WhoWeServeMobileContent industriesData={industriesData} />
        </MobileNavSection>

        <MobileNavSection title={translations.resources} isOpen={expandedSection === "resources"} onToggle={() => handleToggleSection("resources")}>
          <ResourcesMobileContent resourcesData={resourcesData} />
        </MobileNavSection>

        <MobileNavSection title={translations.company} isOpen={expandedSection === "company"} onToggle={() => handleToggleSection("company")}>
          <CompanyMobileContent companyData={companyData} />
        </MobileNavSection>

        <MobileNavSection title={translations.pricing} isOpen={expandedSection === "pricing"} onToggle={() => handleToggleSection("pricing")}>
          <PricingMobileContent pricingData={pricingData} />
        </MobileNavSection>

        <div className="border-b border-slate-100">
          <button onClick={() => handleToggleSection("language")} className="w-full flex items-center justify-between px-4 py-3 text-slate-500">
            <LanguageMobileTrigger locale={locale} />
            <ChevronDown isOpen={expandedSection === "language"} className="w-4 h-4 text-slate-500" />
          </button>
          {expandedSection === "language" && (
            <div className="bg-slate-100">
              <LanguageMobileContent locale={locale} onLocaleChange={handleLocaleChange} />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 flex gap-3 pb-8 shrink-0">
        <a
          href="https://app.tractian.com"
          className="flex-1 text-center py-3 text-blue-600 font-medium border-2 border-blue-600 rounded-sm"
          onClick={handleLoginClick}
        >
          {translations.login}
        </a>
        <button onClick={handleDemoClick} className="flex-1 py-3 text-white font-medium bg-blue-600 rounded-sm">
          {translations.getDemo}
        </button>
      </div>
    </div>
  );
}

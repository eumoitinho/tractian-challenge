"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { useDemoModal } from "@/lib/demo-modal-context";
import TractianLogo from "./shared/TractianLogo";
import { ChevronDown } from "./shared/HeaderIcons";
import { DesktopSolutionsDropdown } from "./desktop/DesktopSolutionsDropdown";
import { WhoDropdown, ResourcesDropdown, CompanyDropdown, PricingDropdown } from "./desktop/DesktopDropdowns";
import { LanguageSwitcher } from "./shared/LanguageSwitcher";
import { MobileMenu } from "./mobile/MobileMenu";
import {
  type SolutionColumn,
  type IndustriesData,
  type ResourcesData,
  type CompanyData,
} from "./shared/constants";

function useHeaderDropdowns() {
  const navRef = useRef<HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { navRef, activeDropdown, setActiveDropdown, langOpen, setLangOpen, isMobileMenuOpen, setIsMobileMenuOpen };
}

interface DesktopNavItemsProps {
  activeDropdown: string | null;
  onToggle: (name: string) => void;
  items: Array<{ key: string; label: string }>;
}

function DesktopNavItems({ activeDropdown, onToggle, items }: DesktopNavItemsProps) {
  return (
    <div className="items-center flex h-full text-slate-500">
      {items.map((item) => (
        <section key={item.key} className="items-center pl-4 flex h-full xl:pl-8">
          <div
            className={cn(
              "items-center gap-x-2 cursor-pointer flex transition-colors",
              activeDropdown === item.key ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
            )}
            onClick={() => onToggle(item.key)}
          >
            <p className="font-semibold">{item.label}</p>
            <ChevronDown isOpen={activeDropdown === item.key} />
          </div>
        </section>
      ))}
    </div>
  );
}

export const Header = () => {
  const t = useTranslations("nav");
  const ht = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { open: openDemoModal } = useDemoModal();
  const { navRef, activeDropdown, setActiveDropdown, langOpen, setLangOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useHeaderDropdowns();

  const solutionsData = ht.raw("solutions") as SolutionColumn[];
  const industriesData = ht.raw("industries") as IndustriesData;
  const resourcesData = ht.raw("resources") as ResourcesData;
  const companyData = ht.raw("company") as CompanyData;
  const pricingData = ht.raw("pricing") as string[];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
    setLangOpen(false);
  };

  const handleToggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setLangOpen(false);
  };

  const handleToggleLang = () => {
    setLangOpen(!langOpen);
    setActiveDropdown(null);
  };

  const handleLoginClick = () => {
    trackNavClick("login", "https://app.tractian.com");
  };

  const navItems = [
    { key: "solutions", label: t("solutions") },
    { key: "who", label: t("whoWeServe") },
    { key: "resources", label: t("resources") },
    { key: "company", label: t("company") },
    { key: "pricing", label: t("pricing") },
  ];

  const mobileTranslations = {
    solutions: t("solutions"),
    whoWeServe: t("whoWeServe"),
    resources: t("resources"),
    company: t("company"),
    pricing: t("pricing"),
    login: t("login"),
    getDemo: t("getDemo"),
  };

  return (
    <nav ref={navRef} className="bg-slate-100 items-center border-b-2 flex-col justify-center sticky top-0 z-40 flex w-full h-20 border-slate-200 border-solid">
      <div className="items-center justify-between px-4 flex w-full h-full max-w-screen-2xl lg:pl-8 lg:pr-8">
        <div className="items-center justify-between hidden w-full h-full lg:flex">
          <section className="items-center gap-x-4 flex h-full">
            <a href={`/${locale}`} aria-label="Tractian Logo">
              <TractianLogo />
            </a>
            <DesktopNavItems activeDropdown={activeDropdown} onToggle={handleToggleDropdown} items={navItems} />
          </section>
          <section className="items-center gap-x-8 gap-y-4 flex h-full">
            <LanguageSwitcher locale={locale} isOpen={langOpen} onToggle={handleToggleLang} onLocaleChange={handleLocaleChange} />
            <a
              className="text-slate-500 font-medium text-center block lg:hidden xl:block hover:text-blue-600 transition-colors"
              href="https://app.tractian.com"
              onClick={handleLoginClick}
            >
              {t("login")}
            </a>
            <button onClick={openDemoModal} className="text-blue-600 cursor-pointer py-2 px-4 text-center w-full h-10 max-w-fit rounded-sm font-medium hover:outline-2 transition-all" style={{ outlineStyle: "solid", outlineWidth: "1px", outlineColor: "rgb(37, 99, 235)" }}>
              {t("getDemo")}
            </button>
          </section>
        </div>

        <div className="flex items-center justify-between w-full lg:hidden">
          <a href={`/${locale}`} aria-label="Tractian Logo">
            <TractianLogo />
          </a>
          <button className="p-2 text-slate-500" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={cn("fixed inset-0 top-20 bg-black/60 z-30 transition-opacity duration-200", activeDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")} onClick={() => setActiveDropdown(null)} />

      <DesktopSolutionsDropdown isOpen={activeDropdown === "solutions"} solutionsData={solutionsData} />
      <WhoDropdown isOpen={activeDropdown === "who"} industriesData={industriesData} />
      <ResourcesDropdown isOpen={activeDropdown === "resources"} resourcesData={resourcesData} />
      <CompanyDropdown isOpen={activeDropdown === "company"} companyData={companyData} />
      <PricingDropdown isOpen={activeDropdown === "pricing"} pricingData={pricingData} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        onLocaleChange={handleLocaleChange}
        onDemoClick={openDemoModal}
        solutionsData={solutionsData}
        industriesData={industriesData}
        resourcesData={resourcesData}
        companyData={companyData}
        pricingData={pricingData}
        translations={mobileTranslations}
      />
    </nav>
  );
};

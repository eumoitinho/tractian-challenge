# Header Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Decompose `Header.tsx` (~490 lines) into 3 new focused components, add analytics tracking, and reduce Header.tsx to under 150 lines.

**Architecture:** Extract MobileMenu, LanguageSwitcher, and DesktopDropdowns (4 named exports) into sibling files. Header.tsx becomes a thin orchestrator that owns hooks, data fetching, and layout composition. Body overflow lock moves into MobileMenu. `trackNavClick` from the analytics system gets wired into all navigation links.

**Tech Stack:** React 18, Next.js 14 App Router, TypeScript, Tailwind CSS 3, next-intl, `cn()` from `@/lib/utils`, `trackNavClick` from `@/lib/analytics/events`

**Verification:** No test runner is configured. Verification is done via `npm run build` (TypeScript + Next.js compilation) and `npm run lint` (ESLint). Visual verification via `npm run dev` at `http://localhost:3000/en/who-we-serve/plant-manager`.

---

### Task 1: Create LanguageSwitcher.tsx

**Files:**
- Create: `src/components/layout/Header/LanguageSwitcher.tsx`

**Step 1: Create the component file**

Create `src/components/layout/Header/LanguageSwitcher.tsx` with this exact content:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, GlobeIcon } from "./HeaderIcons";
import { localeLabels } from "./constants";

interface LanguageSwitcherProps {
  locale: string;
  isOpen: boolean;
  onToggle: () => void;
  onLocaleChange: (locale: string) => void;
}

export function LanguageSwitcher({
  locale,
  isOpen,
  onToggle,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const handleSelect = (key: string) => {
    onLocaleChange(key);
  };

  return (
    <div className="relative items-center flex h-full">
      <button
        className="items-center gap-x-2 cursor-pointer flex h-7 px-2 text-slate-500 hover:text-blue-600 transition-colors"
        onClick={onToggle}
      >
        <GlobeIcon className="text-slate-500" />
        <ChevronDown isOpen={isOpen} className="h-3 w-3" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-slate-50 border border-slate-300 py-1 z-[60] rounded-sm">
          {Object.entries(localeLabels).map(([key, label]) => (
            <button
              key={key}
              onMouseDown={() => handleSelect(key)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm text-slate-500 transition-colors",
                locale === key ? "bg-slate-100" : "hover:bg-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify it compiles**

Run: `npm run build`
Expected: Build succeeds with no errors (component is created but not yet imported)

**Step 3: Commit**

```bash
git add src/components/layout/Header/LanguageSwitcher.tsx
git commit -m "refactor(header): extract LanguageSwitcher component"
```

---

### Task 2: Create DesktopDropdowns.tsx

**Files:**
- Create: `src/components/layout/Header/DesktopDropdowns.tsx`

**Step 1: Create the component file**

Create `src/components/layout/Header/DesktopDropdowns.tsx` with this exact content:

```tsx
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
```

**Step 2: Verify it compiles**

Run: `npm run build`
Expected: Build succeeds (component created but not yet imported)

**Step 3: Commit**

```bash
git add src/components/layout/Header/DesktopDropdowns.tsx
git commit -m "refactor(header): extract desktop dropdown components with analytics"
```

---

### Task 3: Create MobileMenu.tsx

**Files:**
- Create: `src/components/layout/Header/MobileMenu.tsx`

**Step 1: Create the component file**

Create `src/components/layout/Header/MobileMenu.tsx` with this exact content:

```tsx
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
```

**Step 2: Verify it compiles**

Run: `npm run build`
Expected: Build succeeds (component created but not yet imported)

**Step 3: Commit**

```bash
git add src/components/layout/Header/MobileMenu.tsx
git commit -m "refactor(header): extract MobileMenu component with analytics and overflow lock"
```

---

### Task 4: Rewrite Header.tsx as orchestrator

**Files:**
- Modify: `src/components/layout/Header/Header.tsx` (replace entire content)

**Step 1: Replace Header.tsx with the orchestrator version**

Replace the entire content of `src/components/layout/Header/Header.tsx` with:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { trackNavClick } from "@/lib/analytics/events";
import { useDemoModal } from "@/lib/demo-modal-context";
import TractianLogo from "./TractianLogo";
import { ChevronDown } from "./HeaderIcons";
import { DesktopSolutionsDropdown } from "./DesktopSolutionsDropdown";
import { WhoDropdown, ResourcesDropdown, CompanyDropdown, PricingDropdown } from "./DesktopDropdowns";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import {
  type SolutionColumn,
  type IndustriesData,
  type ResourcesData,
  type CompanyData,
} from "./constants";

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
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
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
    <nav ref={navRef} className="bg-slate-100 items-center border-b-2 flex-col justify-center sticky top-0 z-40 flex w-full h-20 border-slate-200 border-solid overflow-x-hidden">
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
          <button className="p-2 text-blue-600" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
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
```

**Step 2: Verify it compiles and lints**

Run: `npm run build && npm run lint`
Expected: Build succeeds, lint passes with no errors

**Step 3: Commit**

```bash
git add src/components/layout/Header/Header.tsx
git commit -m "refactor(header): rewrite as thin orchestrator importing extracted components"
```

---

### Task 5: Add trackNavClick to DesktopSolutionsDropdown

**Files:**
- Modify: `src/components/layout/Header/DesktopSolutionsDropdown.tsx`

**Step 1: Add analytics import and click handlers**

At the top of `DesktopSolutionsDropdown.tsx`, add the import:

```tsx
import { trackNavClick } from "@/lib/analytics/events";
```

Add `onClick={() => trackNavClick(col.title, "#")}` to each column title `<a>` tag (line 29).

Add `onClick={() => trackNavClick(item.label, "#")}` to each item `<a>` tag (line 38).

**Step 2: Verify it compiles**

Run: `npm run build && npm run lint`
Expected: Build and lint pass

**Step 3: Commit**

```bash
git add src/components/layout/Header/DesktopSolutionsDropdown.tsx
git commit -m "feat(header): add trackNavClick analytics to solutions dropdown"
```

---

### Task 6: Clean up constants.ts comments

**Files:**
- Modify: `src/components/layout/Header/constants.ts`

**Step 1: Remove the comment divider**

Remove line 54: `// ========== TYPES ==========`

**Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: Pass

**Step 3: Commit**

```bash
git add src/components/layout/Header/constants.ts
git commit -m "refactor(header): remove comment dividers from constants"
```

---

### Task 7: Final verification

**Step 1: Full build check**

Run: `npm run build && npm run lint`
Expected: Both pass with zero errors

**Step 2: Line count verification**

Run: `wc -l src/components/layout/Header/Header.tsx`
Expected: Under 150 lines

**Step 3: Visual verification**

Run: `npm run dev`
Open: `http://localhost:3000/en/who-we-serve/plant-manager`

Verify:
- Desktop: All 5 nav dropdowns open/close correctly with same styling
- Desktop: Language switcher opens, switches locale, closes
- Desktop: Login link and Get Demo button work
- Mobile (resize to <1024px): Hamburger opens full-screen menu
- Mobile: All accordion sections expand/collapse
- Mobile: Language selection works and closes menu
- Mobile: Login and Get Demo buttons work
- Mobile: Body scroll is locked when menu is open, unlocked when closed

**Step 4: Commit any remaining fixes (if needed), otherwise skip**

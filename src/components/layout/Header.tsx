"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Locale } from "@/i18n/routing";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDemoModal } from "@/lib/demo-modal-context";

function ChevronDown({ className, isOpen }: { className?: string; isOpen?: boolean }) {
  return (
    <svg
      className={cn(
        "w-3 h-3 pointer-events-none font-medium transition-transform duration-200",
        isOpen && "rotate-180",
        className
      )}
      fill="none"
      viewBox="0 0 22 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M21.566 1.566 11 12.13.435 1.566 1.566.434 11 9.87 20.434.434z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function HoverArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "w-4 h-4 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150",
        className
      )}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.367 8.033 9.9 13.5l-.733-.733L13.434 8.5H.634v-1h12.8L9.167 3.233 9.9 2.5z"
        fill="rgb(37, 99, 235)"
      />
    </svg>
  );
}

const localeLabels: Record<string, string> = {
  pt: "Português (Brasil)",
  en: "English (United States)",
  es: "Español (México)",
};

const SOLUTIONS_ICON_PATH = "/icons/header/solutions";
const WHO_ICON_PATH = "/icons/header/who-we-serve";
const RESOURCES_ICON_PATH = "/icons/header/resources";
const COMPANY_ICON_PATH = "/icons/header/company";

const SOLUTION_COL_ICONS = [
  `${SOLUTIONS_ICON_PATH}/solutions-condition-monitoring.svg`,
  `${SOLUTIONS_ICON_PATH}/solutions-cmms.svg`,
  `${SOLUTIONS_ICON_PATH}/solutions-oee.svg`,
];

const SOLUTION_ITEM_ICONS = [
  [
    `${SOLUTIONS_ICON_PATH}/solutions-vibration-sensor-analysis.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-ai-failure-detection.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-reliability-root-cause-analysis.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-downtime-prevention-reporting.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-sensor-specifications.svg`,
  ],
  [
    `${SOLUTIONS_ICON_PATH}/solutions-troubleshooting-sops.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-work-order-management.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-parts-inventory-management.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-preventive-maintenance.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-integrations.svg`,
  ],
  [
    `${SOLUTIONS_ICON_PATH}/solutions-ai-production-tracking.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-operator-performance.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-digitized-quality.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-custom-dashboards.svg`,
    `${SOLUTIONS_ICON_PATH}/solutions-utility-process-analytics.svg`,
  ],
];

const COMPANY_OTHER_ICONS = [
  `${COMPANY_ICON_PATH}/company-contact-us.svg`,
  `${COMPANY_ICON_PATH}/company-referrals.svg`,
  `${COMPANY_ICON_PATH}/company-trust.svg`,
];

const COMPANY_ABOUT_IMAGES = [
  "https://imgix.tractian.com/website/components/navbar/general/about.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
  "https://imgix.tractian.com/website/components/navbar/general/careers.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
  "https://imgix.tractian.com/website/components/navbar/general/newsroom.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
];

interface SolutionItem { label: string; desc: string; }
interface SolutionColumn { title: string; items: SolutionItem[]; }
interface IndustryRole { label: string; }
interface IndustrySector { label: string; icon: string; }
interface IndustriesData {
  byRoleLabel: string; bySectorLabel: string;
  roles: IndustryRole[]; sectors: IndustrySector[];
}
interface ResourceItem { label: string; icon: string; }
interface ResourcesData { centerLabel: string; hubLabel: string; center: ResourceItem[]; hub: ResourceItem[]; }
interface CompanyData { aboutLabel: string; othersLabel: string; about: string[]; others: string[]; }

function TractianLogo() {
  return (
    <svg className="cursor-pointer w-32 h-6" fill="rgb(37, 99, 235)" height="25" viewBox="0 0 177 25">
      <path
        d="M62.458 0.843088L72.7058 23.9849H65.8867L64.0604 19.4754L62.16 14.6309L59.1789 7.21453L56.1977 14.6309L54.2973 19.4754L52.471 23.9849H45.7631L56.011 0.843088H62.458ZM42.4099 13.8112C43.1926 12.5437 43.6018 11.0909 43.6018 9.41432C43.6018 7.7377 43.1541 6.1723 42.3344 4.8678C41.4775 3.56331 40.2842 2.59523 38.7573 1.88669C37.1919 1.17814 35.3656 0.843088 33.3169 0.843088H22.734V5.98555H32.9077C34.2122 5.98555 35.2558 6.28353 35.9629 6.87948C36.6344 7.47543 37.0065 8.33227 37.0065 9.37587C37.0065 10.4195 36.6344 11.2763 35.9629 11.8723C35.2544 12.4682 34.2492 12.7291 32.9077 12.7291H22.734V23.9464H29.2921V17.7974H32.8692L37.0807 23.9464H44.0865L39.0566 16.7181C40.4724 16.0096 41.5901 15.0786 42.4099 13.8112ZM176.492 0.843088H170.082L170.045 7.4768L176.455 15.2283L176.492 0.843088ZM81.3869 6.54443C82.3934 6.02263 83.5112 5.72465 84.7786 5.72465C86.9029 5.72465 88.7292 6.65565 90.219 8.44487L94.3934 4.68106C93.2757 3.30241 91.8599 2.18466 90.1449 1.43904C88.4312 0.693414 86.5307 0.321289 84.4065 0.321289C81.9471 0.321289 79.7858 0.843088 77.8483 1.88669C75.9478 2.93028 74.4195 4.34601 73.3018 6.13523C72.184 7.9986 71.6622 10.0487 71.6622 12.3584C71.6622 14.668 72.184 16.7552 73.3018 18.5815C74.4195 20.3707 75.9478 21.7864 77.8483 22.793C79.7487 23.8366 81.9471 24.3213 84.4065 24.3213C86.5307 24.3213 88.3941 23.9492 90.1449 23.2035C91.8215 22.4579 93.2386 21.3772 94.3934 19.9615L90.219 16.1977C88.6907 18.024 86.8644 18.9179 84.7786 18.9179C83.5112 18.9179 82.3934 18.657 81.3869 18.0982C80.3804 17.5764 79.6348 16.7937 79.1143 15.7871C78.5939 14.7806 78.3316 13.6258 78.3316 12.3213C78.3316 11.0168 78.5925 9.86197 79.1143 8.89252C79.6361 7.886 80.4188 7.1033 81.3869 6.54443ZM0 6.02263H7.11844V23.9849H13.6766V6.02263H20.7566V0.843088H0V6.02263ZM154.505 23.9849H160.915L160.952 17.0532L154.542 8.89252L154.505 23.9849ZM136.356 0.843088L126.145 23.9849H132.816L134.642 19.4754L136.542 14.6309L139.524 7.21453L142.505 14.6309L144.405 19.4754L146.231 23.9849H153.05L142.803 0.843088H136.356ZM170.082 13.1781L159.871 0.843088H154.468V3.93543L160.877 11.6869L171.088 24.0219H176.492V21.3388L170.082 13.1781ZM118.133 23.9849H124.691V0.843088H118.133V23.9849ZM95.437 6.02263H102.518V23.9849H109.077V6.02263H116.157V0.843088H95.437V6.02263Z"
        fill="rgb(37, 99, 235)"
      />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} fill="none" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_12332_4743)" fill="none">
        <path d="M10.0002 0.625C4.8335 0.625 0.666834 4.79167 0.666834 9.95833C0.666834 15.125 4.8335 19.2917 10.0002 19.2917C10.5835 19.2917 11.1668 19.2083 11.6668 19.125L11.4168 17.875C10.9168 17.9583 10.4168 18.0417 9.91683 18.0417C9.3335 18.0417 8.50017 17.0417 7.91683 14.7917C9.0835 14.5417 10.2502 14.4583 11.3335 14.625L11.5835 13.375C10.2502 13.125 8.91683 13.2083 7.66683 13.5417C7.5835 12.625 7.50017 11.625 7.41683 10.625H19.3335V9.95833C19.3335 4.79167 15.1668 0.625 10.0002 0.625ZM10.0002 5.375C9.3335 5.375 8.66683 5.29167 8.00017 5.125C8.50017 3.04167 9.3335 1.875 10.0002 1.875C10.6668 1.875 11.5002 3.04167 12.0002 5.125C11.3335 5.29167 10.6668 5.375 10.0002 5.375ZM12.2502 6.29167C12.4168 7.20833 12.5002 8.20833 12.5002 9.29167H7.41683C7.41683 8.20833 7.5835 7.20833 7.66683 6.29167C8.50017 6.54167 9.25017 6.625 10.0002 6.625C10.7502 6.625 11.5002 6.54167 12.2502 6.29167ZM6.8335 4.70833C6.16683 4.45833 5.50017 4.04167 4.91683 3.625C5.8335 2.95833 6.75017 2.45833 7.8335 2.125C7.41683 2.79167 7.0835 3.70833 6.8335 4.70833ZM12.1668 2.125C13.2502 2.45833 14.2502 2.95833 15.0835 3.625C14.5002 4.04167 13.9168 4.45833 13.2502 4.70833C12.9168 3.70833 12.5835 2.79167 12.1668 2.125ZM4.00017 4.45833C4.75017 5.125 5.5835 5.625 6.50017 5.95833C6.3335 7.04167 6.16683 8.20833 6.16683 9.375H1.91683C2.0835 7.45833 2.8335 5.79167 4.00017 4.45833ZM5.00017 16.375C5.5835 15.9583 6.16683 15.5417 6.8335 15.2917C7.0835 16.2917 7.41683 17.125 7.8335 17.7917C6.75017 17.4583 5.8335 17.0417 5.00017 16.375ZM6.5835 14.0417C5.66683 14.375 4.8335 14.875 4.0835 15.5417C2.8335 14.2083 2.0835 12.5417 1.91683 10.625H6.25017C6.25017 11.7083 6.3335 12.875 6.5835 14.0417ZM13.8335 9.29167C13.8335 8.125 13.6668 6.95833 13.5002 5.875C14.4168 5.54167 15.2502 5.04167 16.0002 4.375C17.1668 5.70833 18.0002 7.375 18.1668 9.29167H13.8335Z" fill="currentColor" />
        <path d="M10.0002 0.625C15.1668 0.625 19.3335 4.79167 19.3335 9.95833C19.3335 15.125 15.1668 19.2917 10.0002 19.2917C9.41683 19.2917 8.83268 19.2083 8.33268 19.125L8.58268 17.875C9.08268 17.9583 9.58268 18.0417 10.0827 18.0417C10.666 18.0417 11.4993 17.0417 12.0827 14.7917C10.916 14.5417 9.74935 14.4583 8.66602 14.625L8.41602 13.375C9.74935 13.125 11.0827 13.2083 12.3327 13.5417C12.416 12.625 12.4994 11.625 12.5827 10.625H0.666016L0.666834 9.95833C0.666834 4.79167 4.8335 0.625 10.0002 0.625ZM10.0002 5.375C10.6668 5.375 11.3335 5.29167 12.0002 5.125C11.5002 3.04167 10.6668 1.875 10.0002 1.875C9.3335 1.875 8.50017 3.04167 8.00017 5.125C8.66683 5.29167 9.3335 5.375 10.0002 5.375ZM7.74935 6.29167C7.58268 7.20833 7.49935 8.20833 7.49935 9.29167H12.5827C12.5827 8.20833 12.416 7.20833 12.3327 6.29167C11.4993 6.54167 10.7502 6.625 10.0002 6.625C9.25017 6.625 8.49935 6.54167 7.74935 6.29167ZM13.166 4.70833C13.8327 4.45833 14.5002 4.04167 15.0835 3.625C14.1668 2.95833 13.2502 2.45833 12.1668 2.125C12.5835 2.79167 12.916 3.70833 13.166 4.70833ZM7.8335 2.125C6.75017 2.45833 5.75017 2.95833 4.91683 3.625C5.50017 4.04167 6.08268 4.45833 6.74935 4.70833C7.08268 3.70833 7.41683 2.79167 7.8335 2.125ZM15.9993 4.45833C15.2493 5.125 14.416 5.625 13.4993 5.95833C13.666 7.04167 13.8327 8.20833 13.8327 9.375H18.0827C17.916 7.45833 17.166 5.79167 15.9993 4.45833ZM14.9993 16.375C14.416 15.9583 13.8327 15.5417 13.166 15.2917C12.916 16.2917 12.5827 17.125 12.166 17.7917C13.2493 17.4583 14.166 17.0417 14.9993 16.375ZM13.416 14.0417C14.3327 14.375 15.166 14.875 15.916 15.5417C17.166 14.2083 17.916 12.5417 18.0827 10.625H13.7493C13.7493 11.7083 13.666 12.875 13.416 14.0417ZM6.16602 9.29167C6.16602 8.125 6.33268 6.95833 6.49935 5.875C5.58268 5.54167 4.74935 5.04167 3.99935 4.375C2.83268 5.70833 1.99935 7.375 1.83268 9.29167H6.16602Z" fill="currentColor" />
      </g>
      <defs fill="none">
        <rect className="w-5 h-5" fill="rgb(255, 255, 255)" height="20" />
      </defs>
    </svg>
  );
}

function IconBox({ src, size = 20, boxClass }: { src: string; size?: number; boxClass?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 border border-neutral-200 rounded-sm",
        boxClass || "w-8 h-8"
      )}
    >
      <Image src={src} alt="" width={size} height={size} className="opacity-70" />
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const ht = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { open: openDemoModal } = useDemoModal();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const solutionsData = ht.raw("solutions") as SolutionColumn[];
  const industriesData = ht.raw("industries") as IndustriesData;
  const resourcesData = ht.raw("resources") as ResourcesData;
  const companyData = ht.raw("company") as CompanyData;
  const pricingData = ht.raw("pricing") as string[];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
    setLangOpen(false);
  };

  const navItems = [
    { key: "solutions", label: t("solutions") },
    { key: "who", label: t("whoWeServe") },
    { key: "resources", label: t("resources") },
    { key: "company", label: t("company") },
    { key: "pricing", label: t("pricing") },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setLangOpen(false);
  };

  const toggleMobileSection = (key: string) => {
    setMobileExpanded(mobileExpanded === key ? null : key);
  };

  const sectorColCount = industriesData.sectors.length <= 6 ? 3 : 4;

  return (
    <nav
      ref={navRef}
      className="bg-slate-100 items-center border-b-2 flex-col justify-center sticky top-0 z-40 flex w-full h-20 border-slate-200 border-solid"
    >
      <div className="items-center justify-between px-4 flex w-full h-full max-w-screen-2xl lg:pl-8 lg:pr-8">
        <div className="items-center justify-between hidden w-full h-full lg:flex">
          <section className="items-center gap-x-4 flex h-full">
            <a href={`/${locale}`} aria-label="Tractian Logo">
              <TractianLogo />
            </a>
            <div className="items-center flex h-full text-slate-500">
              {navItems.map((item) => (
                <section key={item.key} className="items-center pl-4 flex h-full xl:pl-8">
                  <div
                    className={cn(
                      "items-center gap-x-2 cursor-pointer flex transition-colors",
                      activeDropdown === item.key ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
                    )}
                    onClick={() => toggleDropdown(item.key)}
                  >
                    <p className="font-semibold">{item.label}</p>
                    <ChevronDown isOpen={activeDropdown === item.key} />
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="items-center gap-x-8 gap-y-4 flex h-full">
            <div className="relative items-center flex h-full">
              <button
                onClick={() => { setLangOpen(!langOpen); setActiveDropdown(null); }}
                className="items-center gap-x-2 cursor-pointer flex h-7 px-2 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <GlobeIcon className="text-slate-500 hover:text-blue-600 transition-colors" />
                <ChevronDown isOpen={langOpen} className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-50 border border-slate-300 lg:border-1 py-1 z-[60] rounded-sm">
                  {Object.entries(localeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onMouseDown={() => handleLocaleChange(key)}
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

            <a
              className="text-slate-500 font-medium text-center block lg:hidden xl:block hover:text-blue-600 transition-colors"
              href="https://app.tractian.com"
            >
              {t("login")}
            </a>

            <button
              onClick={openDemoModal}
              className="text-blue-600 cursor-pointer py-2 px-4 text-center w-full h-10 max-w-fit rounded-sm font-medium hover:outline-2 transition-all"
              style={{ outlineStyle: "solid", outlineWidth: "1px", outlineColor: "rgb(37, 99, 235)" }}
            >
              {t("getDemo")}
            </button>
          </section>
        </div>

        <div className="flex items-center justify-between w-full lg:hidden">
          <a href={`/${locale}`} aria-label="Tractian Logo">
            <TractianLogo />
          </a>
          <button
            className="p-2 text-blue-600"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop overlay */}
      <div
        className={cn(
          "fixed inset-0 top-20 bg-black/60 z-30 transition-opacity duration-200",
          activeDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setActiveDropdown(null)}
      />

      {/* Desktop Solutions dropdown */}
      <div className={cn(
        "absolute top-full left-0 w-full z-40 transition-all duration-200 origin-top",
        activeDropdown === "solutions" ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}>
        <div className="absolute inset-0 bg-slate-50" />
        <div className="relative mx-auto w-full max-w-[80rem] px-8 pt-8 pb-12">
          <div className="flex w-full lg:justify-between">
            {solutionsData.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col border-l border-slate-300 pl-4" style={{ gap: "24px" }}>
                <a href="#" className="flex items-center gap-2 group">
                  <IconBox src={SOLUTION_COL_ICONS[colIdx]} size={20} boxClass="w-8 h-8" />
                  <span className="font-semibold text-lg leading-7 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    {col.title}
                    <HoverArrow />
                  </span>
                </a>
                <div className="flex flex-col gap-4">
                  {col.items.map((item, i) => (
                    <a key={i} href="#" className="group flex items-start gap-2">
                      <IconBox src={SOLUTION_ITEM_ICONS[colIdx][i]} size={20} boxClass="w-8 h-8" />
                      <article className="flex flex-col min-w-0">
                        <span className="text-sm leading-5 font-semibold group-hover:text-blue-600 transition-colors flex items-center gap-1">
                          {item.label}
                          <HoverArrow />
                        </span>
                        <span className="text-slate-500 text-xs leading-4">{item.desc}</span>
                      </article>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Who We Serve dropdown */}
      <div className={cn(
        "absolute top-full left-0 w-full z-40 transition-all duration-200 origin-top",
        activeDropdown === "who" ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}>
        <div className="absolute inset-0 bg-slate-50 h-full w-full" />
        <div className="relative mx-auto w-full max-w-6xl px-8 py-8">
          <div className="flex">
            <div className="pr-10 min-w-[200px] border-l border-slate-300 pl-4">
              <h3 className="text-sm text-slate-400 font-medium mb-5">{industriesData.byRoleLabel}</h3>
              <div className="flex flex-col gap-3">
                {industriesData.roles.map((role, i) => (
                  <a key={i} href="#" className="group flex items-center gap-3">
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
              <div className="grid gap-x-8 gap-y-3" style={{ gridTemplateColumns: `repeat(${sectorColCount}, minmax(0, 1fr))` }}>
                {industriesData.sectors.map((sector, i) => (
                  <a key={i} href="#" className="group flex items-center gap-3">
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

      {/* Desktop Resources dropdown */}
      <div className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 z-40 transition-all duration-200 origin-top",
        activeDropdown === "resources" ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}>
        <div className="w-[60.63rem] bg-slate-50 rounded-sm">
          <div className="flex px-8 py-8">
            <div className="flex-1 border-l border-slate-300 pl-6">
              <h3 className="text-sm text-slate-400 font-medium mb-5">{resourcesData.centerLabel}</h3>
              <div className="grid gap-x-6 gap-y-3" style={{ gridTemplateColumns: "189.734px 189.734px 189.734px" }}>
                {resourcesData.center.map((item, i) => (
                  <a key={i} href="#" className="group flex items-center gap-3">
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
                  <a key={i} href="#" className="group flex items-center gap-3">
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

      {/* Desktop Company dropdown */}
      <div className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 z-40 transition-all duration-200 origin-top",
        activeDropdown === "company" ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}>
        <div className="w-[60.63rem] bg-slate-50 rounded-sm">
          <div className="flex px-8 py-8">
            <div className="flex-1 border-l border-slate-300 pl-6">
              <h3 className="text-sm text-slate-400 font-medium mb-5">{companyData.aboutLabel}</h3>
              <div className="grid grid-cols-3 gap-5">
                {companyData.about.map((label, i) => (
                  <a key={i} href="#" className="group flex flex-col gap-2">
                    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm bg-slate-100">
                      <Image src={COMPANY_ABOUT_IMAGES[i]} alt={label} fill className="object-cover" unoptimized
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
                  <a key={i} href="#" className="group flex items-center gap-3">
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

      {/* Desktop Pricing dropdown */}
      <div className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 z-40 transition-all duration-200 origin-top",
        activeDropdown === "pricing" ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
      )}>
        <div className="w-[60.63rem] bg-slate-50 rounded-sm">
          <div className="flex items-center px-8 py-6">
            {pricingData.map((label, i) => (
              <a key={i} href="#" className={cn("group flex items-center gap-4 flex-1 py-3", "border-l border-slate-300 pl-6")}>
                <IconBox src={SOLUTION_COL_ICONS[i]} size={20} boxClass="w-10 h-10" />
                <span className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {label}
                  <HoverArrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center px-4 h-16 border-b border-slate-200 shrink-0">
          <a href={`/${locale}`}>
            <TractianLogo />
          </a>
          <button
            className="p-2 text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Solutions */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("solutions")}
              className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700"
            >
              {t("solutions")}
              <ChevronDown isOpen={mobileExpanded === "solutions"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "solutions" && (
              <div className="pb-4 px-4 space-y-6">
                {solutionsData.map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800 border-l-2 border-blue-600 pl-3">{col.title}</p>
                    <div className="space-y-2 pl-4">
                      {col.items.map((item, i) => (
                        <a key={i} href="#" className="flex items-center gap-2 py-1">
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

          {/* Who We Serve */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("who")}
              className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700"
            >
              {t("whoWeServe")}
              <ChevronDown isOpen={mobileExpanded === "who"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "who" && (
              <div className="pb-4 px-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase">{industriesData.byRoleLabel}</p>
                  {industriesData.roles.map((role, i) => (
                    <a key={i} href="#" className="flex items-center gap-2 py-1">
                      <IconBox src={`${WHO_ICON_PATH}/who-we-serve-by-role.svg`} size={14} boxClass="w-6 h-6" />
                      <span className="text-sm text-slate-600">{role.label}</span>
                    </a>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase">{industriesData.bySectorLabel}</p>
                  {industriesData.sectors.map((sector, i) => (
                    <a key={i} href="#" className="flex items-center gap-2 py-1">
                      <IconBox src={`${WHO_ICON_PATH}/who-we-serve-${sector.icon}.svg`} size={14} boxClass="w-6 h-6" />
                      <span className="text-sm text-slate-600">{sector.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("resources")}
              className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700"
            >
              {t("resources")}
              <ChevronDown isOpen={mobileExpanded === "resources"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "resources" && (
              <div className="pb-4 px-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase">{resourcesData.centerLabel}</p>
                  {resourcesData.center.map((item, i) => (
                    <a key={i} href="#" className="flex items-center gap-2 py-1">
                      <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={14} boxClass="w-6 h-6" />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </a>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase">{resourcesData.hubLabel}</p>
                  {resourcesData.hub.map((item, i) => (
                    <a key={i} href="#" className="flex items-center gap-2 py-1">
                      <IconBox src={`${RESOURCES_ICON_PATH}/${item.icon}.svg`} size={14} boxClass="w-6 h-6" />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Company */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("company")}
              className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700"
            >
              {t("company")}
              <ChevronDown isOpen={mobileExpanded === "company"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "company" && (
              <div className="pb-4 px-4 space-y-2">
                {[...companyData.about, ...companyData.others].map((label, i) => (
                  <a key={i} href="#" className="block py-1.5 text-sm text-slate-600">{label}</a>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("pricing")}
              className="w-full flex items-center justify-between py-4 px-4 font-semibold text-slate-700"
            >
              {t("pricing")}
              <ChevronDown isOpen={mobileExpanded === "pricing"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "pricing" && (
              <div className="pb-4 px-4 space-y-2">
                {pricingData.map((label, i) => (
                  <a key={i} href="#" className="block py-1.5 text-sm text-slate-600">{label}</a>
                ))}
              </div>
            )}
          </div>

          {/* Language selector in mobile */}
          <div className="border-b border-slate-100">
            <button
              onClick={() => toggleMobileSection("language")}
              className="w-full flex items-center justify-between py-4 px-4 text-slate-700"
            >
              <div className="flex items-center gap-2">
                <GlobeIcon className="text-slate-500 w-5 h-5" />
                <span className="font-semibold">{localeLabels[locale]}</span>
              </div>
              <ChevronDown isOpen={mobileExpanded === "language"} className="w-3 h-3" />
            </button>
            {mobileExpanded === "language" && (
              <div className="pb-4 px-4 space-y-1">
                {Object.entries(localeLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { handleLocaleChange(key); setIsMobileMenuOpen(false); }}
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
          >
            {t("login")}
          </a>
          <button onClick={() => { openDemoModal(); setIsMobileMenuOpen(false); }} className="block w-full py-3 text-white font-medium bg-blue-600 rounded-sm">
            {t("getDemo")}
          </button>
        </div>
      </div>
    </nav>
  );
}

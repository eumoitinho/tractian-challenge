export const localeLabels: Record<string, string> = {
  pt: "Português (Brasil)",
  en: "English (United States)",
  es: "Español (México)",
};

export const localeFlagUrls: Record<string, string> = {
  pt: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e7-1f1f7.svg",
  en: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1f8.svg",
  es: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f2-1f1fd.svg",
};

export const SOLUTIONS_ICON_PATH = "/icons/header/solutions";
export const WHO_ICON_PATH = "/icons/header/who-we-serve";
export const RESOURCES_ICON_PATH = "/icons/header/resources";
export const COMPANY_ICON_PATH = "/icons/header/company";

export const SOLUTION_COL_ICONS = [
  `${SOLUTIONS_ICON_PATH}/solutions-condition-monitoring.svg`,
  `${SOLUTIONS_ICON_PATH}/solutions-custom-dashboards.svg`,
  `${SOLUTIONS_ICON_PATH}/solutions-oee.svg`,
];

export const SOLUTION_ITEM_ICONS = [
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

export const COMPANY_OTHER_ICONS = [
  `${COMPANY_ICON_PATH}/company-contact-us.svg`,
  `${COMPANY_ICON_PATH}/company-referrals.svg`,
  `${COMPANY_ICON_PATH}/company-trust.svg`,
];

export const COMPANY_ABOUT_IMAGES = [
  "https://imgix.tractian.com/website/components/navbar/general/about.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
  "https://imgix.tractian.com/website/components/navbar/general/careers.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
  "https://imgix.tractian.com/website/components/navbar/general/newsroom.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=400",
];

export interface SolutionItem {
  label: string;
  desc: string;
}

export interface SolutionColumn {
  title: string;
  items: SolutionItem[];
}

export interface IndustryRole {
  label: string;
}

export interface IndustrySector {
  label: string;
  icon: string;
}

export interface IndustriesData {
  byRoleLabel: string;
  bySectorLabel: string;
  roles: IndustryRole[];
  sectors: IndustrySector[];
}

export interface ResourceItem {
  label: string;
  icon: string;
}

export interface ResourcesData {
  centerLabel: string;
  hubLabel: string;
  center: ResourceItem[];
  hub: ResourceItem[];
}

export interface CompanyData {
  aboutLabel: string;
  othersLabel: string;
  about: string[];
  others: string[];
}

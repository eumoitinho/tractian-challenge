import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "pt", "es"] as const,
  defaultLocale: "en",
  pathnames: {
    "/who-we-serve/plant-manager": {
      en: "/who-we-serve/plant-manager",
      pt: "/solucoes-para-gerentes-industriais",
      es: "/es/who-we-serve/plant-manager",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

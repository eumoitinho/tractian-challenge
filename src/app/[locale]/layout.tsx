import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { DemoModalProvider } from "@/lib/demo-modal-context";
import { PrivacyModalProvider } from "@/lib/privacy-modal-context";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: "TRACTIAN",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-slate-700 antialiased">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
            <DemoModalProvider>
              <PrivacyModalProvider>
                {children}
              </PrivacyModalProvider>
            </DemoModalProvider>
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

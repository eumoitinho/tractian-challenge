import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

function resolveLocale(raw?: string): Locale {
  if (!raw) {
    return routing.defaultLocale;
  }
  const normalized = raw.toLowerCase();
  if (routing.locales.some((l) => l === normalized)) {
    return normalized as Locale;
  }
  return routing.defaultLocale;
}

const messagesCache = new Map<Locale, Record<string, string>>();

async function loadMessages(locale: Locale) {
  const cached = messagesCache.get(locale);
  if (cached) {
    return cached;
  }
  try {
    const localeModule = await import(`../../messages/${locale}.json`);
    messagesCache.set(locale, localeModule.default);
    return localeModule.default;
  } catch {
    const fallback = routing.defaultLocale;
    const fallbackModule = await import(`../../messages/${fallback}.json`);
    messagesCache.set(fallback, fallbackModule.default);
    return fallbackModule.default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = await requestLocale;
  const locale = resolveLocale(raw);

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});

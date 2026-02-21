"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { updateConsent, flushPendingEvents, trackConsentUpdate } from "@/lib/analytics";

interface CookieBannerProps {
  onOpenSettings: () => void;
}

export function CookieBanner({ onOpenSettings }: CookieBannerProps) {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("tractian-cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("tractian-cookies-accepted", "true");
    const consent = updateConsent({
      strictly_necessary: true,
      functional: true,
      performance: true,
      targeting: true,
    });
    trackConsentUpdate(consent);
    flushPendingEvents();
    setVisible(false);
  };

  const handleSettings = () => {
    onOpenSettings();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[2147483645] bg-slate-50 shadow-[0_-4px_18px_0_rgba(0,0,0,0.15)] overflow-hidden  border border-slate-500 sm:bottom-8 sm:left-4 sm:right-auto sm:max-w-[700px] sm:rounded-sm sm:shadow-[0_0_18px_0_rgba(0,0,0,0.2)]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <button
        onClick={handleAccept}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer sm:top-0 sm:right-0 sm:w-11 sm:h-11"
        aria-label="Close"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M1 11L11 1" stroke="rgb(85,85,85)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="px-[15px] pt-5 pb-[10px] pr-12 sm:px-[30px] sm:pt-[16px] sm:pb-[10px] sm:pr-[30px]">
        <p className="text-[11.38px] leading-[17.07px] text-slate-600 text-left sm:text-[13px] sm:leading-[19.5px]">
          {t("bannerText")}
        </p>
      </div>

      <div className="px-5 flex flex-col gap-1 sm:px-[30px] sm:pt-[10px] sm:pb-[4px] sm:flex-row sm:items-start sm:justify-end sm:gap-1">
        <button
          onClick={handleSettings}
          className="h-auto w-auto rounded-[64px] border border-slate-500 bg-slate-50 text-slate-600 text-[12px] font-semibold cursor-pointer hover:bg-slate-100 transition-colors px-[6px] py-[6px] mb-1 sm:h-[42px] sm:w-auto sm:pr-[15px] sm:pl-[15px] sm:mr-[13px] sm:mb-[4px] sm:rounded-sm sm:border-slate-500 sm:text-slate-500 sm:text-[13px] sm:min-w-[175px]"
        >
          {t("settingsButton")}
        </button>
        <button
          onClick={handleAccept}
          className="h-auto w-auto rounded-[64px] border border-blue-800 bg-blue-800 text-white text-[12px] font-semibold cursor-pointer hover:bg-blue-900 transition-colors px-[6px] py-[6px] mb-4 sm:h-[42px] sm:w-auto sm:pr-[15px] sm:pl-[15px] sm:mb-4 sm:rounded-sm sm:text-[13px] sm:min-w-[143px]"
        >
          {t("acceptButton")}
        </button>
      </div>
    </div>
  );
}

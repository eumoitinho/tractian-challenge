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
      className="fixed bottom-8 left-4 right-4 z-[2147483645] max-w-[700px] rounded-sm bg-slate-50 shadow-[0_0_18px_0_rgba(0,0,0,0.2)] overflow-hidden mx-auto"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <button
        onClick={handleAccept}
        className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center cursor-pointer"
        style={{ margin: "-10px -10px 0 0" }}
        aria-label="Close"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M1 11L11 1" stroke="rgb(85,85,85)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="px-[30px] pt-[16px] pb-[10px]">
        <p className="text-[13px] leading-[19.5px] text-slate-700 text-left">
          {t("bannerText")}
        </p>
      </div>

      <div className="px-[30px] pt-[10px] pb-[4px] flex items-center">
        <button
          onClick={handleSettings}
          className="h-[42px] px-[10px] mr-[13px] mb-4 rounded-sm border border-slate-500 bg-slate-50 text-slate-500 text-[13px] font-semibold cursor-pointer hover:bg-slate-100 transition-colors"
          style={{ minWidth: 175 }}
        >
          {t("settingsButton")}
        </button>
        <button
          onClick={handleAccept}
          className="h-[42px] px-[10px] mb-4 rounded-sm border border-blue-800 bg-blue-800 text-white text-[13px] font-semibold cursor-pointer hover:bg-blue-900 transition-colors"
          style={{ minWidth: 143 }}
        >
          {t("acceptButton")}
        </button>
      </div>
    </div>
  );
}

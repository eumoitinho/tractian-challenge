"use client";

import { useState } from "react";
import { useTranslations, useMessages } from "next-intl";

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.35364L7 7.35364L1 13.3536" fill="none" stroke="currentColor" strokeMiterlimit="10" />
    </svg>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const messages = useMessages();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqItems = (messages.faq as Record<string, unknown>)?.items as Record<string, string>[] || [];
  const totalItems = faqItems.length;

  return (
    <div className="bg-slate-100 py-12 w-full lg:pt-16 lg:pb-16">
      <section className="items-center flex-col px-4 flex max-w-2xl gap-16 m-auto lg:max-w-6xl">
        <article className="items-center flex-col flex w-full gap-4">
          <p className="text-blue-600 text-center uppercase">{t("sectionLabel")}</p>
          <h2 className="text-[2.50rem] leading-none font-bold text-center">{t("title")}</h2>
        </article>

        <div className="flex-col gap-y-6 flex">
          {Array.from({ length: totalItems }, (_, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className={`cursor-pointer text-center w-full border-2 border-slate-300 border-solid rounded-sm p-4 ${
                  isOpen ? "h-36" : "h-14"
                }`}
              >
                <div className={`items-center justify-between flex w-full gap-3 ${isOpen ? "mb-2" : ""}`}>
                  <h3 className={`font-medium text-left ${isOpen ? "text-blue-600" : ""}`}>
                    {t(`items.${i}.question`)}
                  </h3>
                  <ChevronRight className={`w-2 h-3.5 flex-shrink-0 ${isOpen ? "text-blue-600" : "text-slate-400"}`} />
                </div>
                {isOpen && (
                  <p className="text-slate-500 overflow-hidden text-left">
                    {t(`items.${i}.answer`)}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

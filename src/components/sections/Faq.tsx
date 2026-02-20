"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useMessages } from "next-intl";

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.35364L7 7.35364L1 13.3536" fill="none" stroke="currentColor" strokeMiterlimit="10" />
    </svg>
  );
}

function FaqAnswer({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(isOpen ? ref.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? `${height}px` : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div ref={ref} className="pt-2 pb-1">{children}</div>
    </div>
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
      <section className="items-center flex-col px-4 flex max-w-2xl gap-12 m-auto lg:max-w-6xl lg:gap-16">
        <article className="items-center flex-col flex w-full gap-4">
          <p className="text-blue-600 text-center uppercase text-sm font-medium">{t("sectionLabel")}</p>
          <h2 className="text-[20px] leading-tight font-bold text-center min-[375px]:text-[2.50rem] min-[375px]:leading-none">{t("title")}</h2>
        </article>

        <div className="flex-col gap-y-3 flex w-full sm:gap-y-4">
          {Array.from({ length: totalItems }, (_, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="cursor-pointer text-left w-full border border-slate-300 rounded-sm px-4 py-4 sm:px-6 sm:py-5 transition-colors hover:border-slate-400"
              >
                <div className="items-center justify-between flex w-full gap-4">
                  <h3 className={`font-medium text-left text-sm sm:text-base transition-colors ${isOpen ? "text-blue-600" : "text-slate-700"}`}>
                    {t(`items.${i}.question`)}
                  </h3>
                  <ChevronRight className={`w-2.5 h-3.5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "text-blue-600 rotate-90" : "text-slate-400"}`} />
                </div>
                <FaqAnswer isOpen={isOpen}>
                  <p className="text-slate-500 text-left text-sm sm:text-base leading-relaxed">
                    {t(`items.${i}.answer`)}
                  </p>
                </FaqAnswer>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

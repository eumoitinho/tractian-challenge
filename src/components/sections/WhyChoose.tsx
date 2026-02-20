"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useMessages } from "next-intl";

interface WhyChooseMessages {
  whyChoose?: {
    tabs?: Record<string, { image?: string }>;
  };
}

const tabKeys = ["roi", "downtime", "team", "compliance"] as const;

function CheckIcon() {
  return (
    <svg className="w-5 h-3.5" fill="none" height="14" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.02344 11.5L10.0234 19.5M2.02344 11.5L10.0234 19.5" fill="none" stroke="#ffffff" />
      <path d="M9.02344 19.5L23.0234 5.5" fill="none" stroke="#ffffff" />
    </svg>
  );
}

function AccordionContent({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? `${height}px` : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div ref={contentRef} className="pt-1 pb-2">
        {children}
      </div>
    </div>
  );
}

export function WhyChoose() {
  const t = useTranslations("whyChoose");
  const messages = useMessages() as unknown as WhyChooseMessages;
  const [active, setActive] = useState<string>(tabKeys[0]);

  const getTabImage = (key: string): string => {
    const tabs = messages.whyChoose?.tabs;
    return tabs?.[key]?.image || "";
  };

  return (
    <section className="bg-slate-100 py-12 px-4 w-full lg:pt-16 lg:pb-16">
      <div className="flex-col flex w-full max-w-2xl gap-10 sm:gap-16 m-auto lg:max-w-6xl">
        <article className="flex-col flex w-full gap-3">
          <p className="text-blue-600 uppercase text-sm font-medium">{t("label")}</p>
          <h2 className="text-[1.75rem] leading-tight font-bold min-[375px]:text-[2.50rem] min-[375px]:leading-none">{t("title")}</h2>
        </article>

        <div className="items-start flex-col flex w-full gap-8 lg:min-h-[22.50rem] lg:flex-row lg:justify-between">

          <div className="border-l-2 flex-col flex w-full border-slate-300 border-solid gap-6 min-[425px]:h-auto">
            {tabKeys.map((key) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`border-l-2 cursor-pointer px-4 text-left w-full -ml-[2px] border-solid transition-colors duration-300 ${
                    isActive ? "border-blue-500" : "border-slate-300"
                  }`}
                >
                  <div className="items-center flex w-full mb-2 gap-3 lg:justify-between">
                    <figure
                      className={`items-center justify-center flex w-6 h-6 transition-colors duration-300 ${
                        isActive ? "bg-blue-600" : "bg-slate-400"
                      }`}
                    >
                      <CheckIcon />
                    </figure>
                    <h3
                      className={`flex-grow text-xl font-semibold w-full text-left transition-colors duration-300 ${
                        isActive ? "" : "text-slate-400"
                      }`}
                    >
                      {t(`tabs.${key}.title`)}
                    </h3>
                  </div>
                  <AccordionContent isOpen={isActive}>
                    <div className="flex-col flex text-left text-slate-500">
                      {t(`tabs.${key}.content`)}
                    </div>
                  </AccordionContent>
                </button>
              );
            })}
          </div>


          <figure className="justify-center flex w-full h-full rounded-sm lg:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="object-contain w-full h-full max-w-full rounded-sm transition-opacity duration-300"
              src={getTabImage(active)}
              alt={t(`tabs.${active}.title`)}
              key={active}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { useTranslations, useMessages } from "next-intl";

interface FeaturesMessages {
  features?: {
    tabs?: Record<string, { image?: string; items?: string[] }>;
  };
}

const tabKeys = ["reports", "oversight", "multisite", "labor"] as const;

export function Features() {
  const t = useTranslations("features");
  const messages = useMessages() as unknown as FeaturesMessages;
  const [active, setActive] = useState<string>(tabKeys[0]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const prevIndexRef = useRef(0);

  const getTabImage = (key: string): string => {
    const tabs = messages.features?.tabs;
    return tabs?.[key]?.image || "";
  };

  const getTabItems = (key: string): string[] => {
    const tabs = messages.features?.tabs;
    return tabs?.[key]?.items || [];
  };

  const handleTabChange = (key: string) => {
    if (key === active) return;
    const newIndex = tabKeys.indexOf(key as typeof tabKeys[number]);
    const direction = newIndex > prevIndexRef.current ? "right" : "left";
    setSlideDirection(direction);
    setIsAnimating(true);

    setTimeout(() => {
      setActive(key);
      prevIndexRef.current = newIndex;
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  const slideClass = isAnimating
    ? slideDirection === "right"
      ? "translate-x-8 opacity-0"
      : "-translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <section className="bg-white py-12 px-4 relative w-full overflow-x-hidden lg:pl-16 lg:pr-16 lg:pt-20 lg:pb-20\">
      <div className="items-center flex-col flex max-w-xl gap-8 sm:gap-12 m-auto lg:max-w-6xl">
        <article className="items-start flex-col flex w-full text-[20px] font-bold min-[375px]:text-4xl lg:items-center">
          <h2 className="text-center w-full">{t("title")}</h2>
        </article>

        <section className="w-full">
          <div className="flex-col flex w-full gap-12 m-auto">

            <div className="flex-col py-1 relative flex w-full mt-0 mx-auto sm:flex-row sm:pt-0 sm:pb-0">
              {tabKeys.map((key) => {
                const isActive = active === key;
                return (
                  <div
                    key={key}
                    className={`items-center border-b-2 justify-center px-1 py-1 flex w-full border-solid col-span-1 transition-all duration-300 sm:p-0 ${
                      isActive
                        ? "border-b-blue-600 font-bold"
                        : "border-b-slate-300 text-slate-500"
                    }`}
                  >
                    <button
                      onClick={() => handleTabChange(key)}
                      className={`cursor-pointer py-1.5 px-4 text-center text-sm sm:text-base w-full h-12 sm:h-14 transition-transform duration-200 lg:pl-2 lg:pr-2 sm:w-auto sm:items-start sm:p-4 xl:pl-4 xl:pr-4 2xl:pl-6 2xl:pr-6 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                    >
                      {t(`tabs.${key}.label`)}
                    </button>
                  </div>
                );
              })}
            </div>


            <article className="justify-between flex w-full">
              <div className={`items-center flex-col justify-between flex w-full gap-8 sm:gap-16 transition-all duration-300 ease-in-out ${slideClass} lg:min-h-[27.31rem] lg:flex-row`}>

                <div className="flex-col flex w-full lg:max-w-[23.88rem]">
                  <article className="items-center flex-col flex gap-4 lg:max-w-[23.88rem] lg:items-start">
                    <h2 className="text-xl font-bold">
                      {t(`tabs.${active}.title`)}
                    </h2>
                    <p className="text-slate-500">
                      {t(`tabs.${active}.description`)}
                    </p>
                    <ul className="flex-col flex list-disc w-full ml-4 gap-1 text-slate-500">
                      {getTabItems(active).map((_, i) => (
                        <li key={i} className="list-item">
                          {t(`tabs.${active}.items.${i}`)}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>


                <figure className="w-full rounded-sm">
                  <div className="relative">
                    {getTabImage(active) && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className="object-contain w-[44.13rem] h-auto max-w-full"
                        src={getTabImage(active)}
                        alt={t(`tabs.${active}.label`)}
                      />
                    )}
                  </div>
                </figure>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";

export function Steps() {
  const t = useTranslations("steps");

  return (
    <section className="bg-slate-100 py-12 px-4 overflow-x-hidden lg:pt-16 lg:pb-16">
      <div className="items-start flex-col flex w-full max-w-2xl gap-8 sm:gap-12 m-auto lg:max-w-6xl lg:items-center">
        <h2 className="text-xl leading-8 font-bold text-left sm:text-center sm:text-4xl sm:leading-none lg:mb-4">{t("title")}</h2>

        <div className="flex-col flex w-full gap-8 sm:gap-16 lg:flex-row lg:justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-col flex w-full h-full gap-3 sm:gap-4">
              <span className="text-white bg-blue-600 items-center text-lg justify-center flex w-7 h-7 rounded-sm lg:h-8 lg:w-8 lg:text-xl">
                {t(`items.${i}.step`)}
              </span>
              <article className="flex-col flex w-full gap-2 sm:gap-4">
                <h3 className="text-xl font-bold">{t(`items.${i}.title`)}</h3>
                <p className="text-slate-500 text-sm leading-[1.38rem] sm:text-base sm:leading-normal">{t(`items.${i}.description`)}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

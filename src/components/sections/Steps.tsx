"use client";

import { useTranslations } from "next-intl";

export function Steps() {
  const t = useTranslations("steps");

  return (
    <section className="bg-slate-100 py-12 px-4 lg:pt-16 lg:pb-16">
      <div className="items-start flex-col flex w-full max-w-2xl gap-12 m-auto lg:max-w-6xl lg:items-center">
        <h2 className="text-[1.75rem] font-bold text-center min-[375px]:text-4xl lg:mb-4">{t("title")}</h2>

        <div className="flex-col flex w-full gap-16 lg:flex-row lg:justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-col flex w-full h-full gap-4">
              <span className="text-white bg-blue-600 items-center text-xl justify-center flex w-7 h-7 rounded-sm lg:h-8 lg:w-8">
                {t(`items.${i}.step`)}
              </span>
              <article className="flex-col flex w-full gap-4">
                <h3 className="text-xl font-bold">{t(`items.${i}.title`)}</h3>
                <p className="text-slate-500">{t(`items.${i}.description`)}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

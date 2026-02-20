"use client";

import { useTranslations, useMessages } from "next-intl";

type LogoItem = {
  name: string;
  src: string;
};

export function LogoCarousel() {
  const t = useTranslations("logos");
  const messages = useMessages();
  const logos = (messages.logos as Record<string, unknown>)?.items as LogoItem[] || [];

  return (
    <section className="pt-4 w-full overflow-hidden lg:pl-4 lg:pr-4 lg:pb-16">
      <div className="items-center flex-col flex w-full max-w-full gap-12 m-auto">
        <h2 className="text-slate-500 px-4 text-center max-w-2xl m-auto lg:pl-0 lg:pr-0">
          {t("title")}
        </h2>

        <div className="flex-wrap justify-center hidden w-full gap-8 m-auto lg:grid lg:max-w-6xl lg:grid-cols-6 lg:items-center lg:justify-center">
          {logos.map((logo, i) => (
            <div key={i} className="items-center justify-center flex w-full">
              <div className="inline-flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="object-contain h-8 max-w-[120px]"
                  src={logo.src}
                  alt={logo.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

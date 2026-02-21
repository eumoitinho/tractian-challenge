"use client";

import { useTranslations } from "next-intl";
import { useDemoModal } from "@/lib/demo-modal-context";

export function Hero() {
  const t = useTranslations("hero");
  const { open: openDemoModal } = useDemoModal();
  const heroImage = t("heroImage");
  const heroImageMobile = t("heroImageMobile");

  return (
    <>
      <section className="relative w-full 3xl:min-h-[675px] 4xl:min-h-[695px]">
        <div
          className="absolute inset-0 hidden bg-cover bg-right bg-no-repeat 2xl:bg-right-top md:block"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 flex w-full max-w-full justify-end bg-blue-950 bg-opacity-100 px-4 pb-12 pt-14 md:max-w-[50%] md:items-center md:bg-opacity-80 md:px-8 lg:px-8 lg:py-16 xl:py-20 xl:pl-16 xl:pr-24 2xl:pl-20 3xl:min-h-[675px] 4xl:min-h-[695px]">
          <div className="flex w-full flex-col items-center gap-8 md:w-fit md:max-w-md lg:max-w-lg md:items-start">
            <article className="relative z-20 flex w-full flex-col items-center gap-4 md:items-start">
              <p className="text-center text-sm leading-[1.38rem] font-light text-white md:text-base md:leading-normal md:text-center">{t("label")}</p>
              <h1 className="text-center text-2xl leading-8 font-bold text-white md:text-[2.50rem] md:leading-[3.25rem] md:text-left">
                {t("title")}
              </h1>
              <p className="text-center text-sm leading-[1.38rem] font-light text-white md:text-base md:leading-normal md:text-left">
                {t("subtitle")}
              </p>
            </article>
            <button onClick={openDemoModal} className="max-w-fit rounded-sm w-full transition ease-in-out duration-150 disabled:cursor-not-allowed text-center bg-blue-600 text-white text-sm leading-[1.38rem] font-medium px-4 py-2 hover:bg-blue-900 active:bg-blue-950 disabled:bg-slate-300 relative z-30 mx-auto flex items-center justify-center gap-2 md:mx-0 md:text-base md:leading-normal">
              <p className="text-white">{t("cta")}</p>
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3671 8.03333L9.90046 13.5L9.16712 12.7667L13.4338 8.5H0.633789V7.5H13.4338L9.16712 3.23333L9.90046 2.5L15.3671 8.03333Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 mx-auto hidden w-full items-center justify-end lg:flex 2xl:right-8 2xl:mr-0">
          <div className="flex w-full max-w-[240px] flex-col gap-4 rounded-bl-sm rounded-tl-sm bg-white px-4 py-4 h-auto lg:py-6 2xl:max-w-[280px] 2xl:rounded-sm 2xl:px-5 3xl:max-w-[320px] 3xl:px-6 3xl:py-7 4xl:max-w-[335px]">
            <p className="text-slate-500 text-sm leading-[1.38rem] h-auto w-52 2xl:text-base 4xl:text-lg">{t("quote")}</p>
            <article className="flex w-full flex-col h-auto">
              <p className="text-[13px] font-bold h-5 leading-5 w-52 2xl:text-sm 4xl:text-base">{t("quoteAuthor")}</p>
              <p className="text-[13px] h-5 leading-5 w-52 2xl:text-sm 4xl:text-base">{t("quoteRole")}</p>
              <p className="text-[13px] font-bold h-5 leading-5 w-52 2xl:text-sm 4xl:text-base">{t("quoteCompany")}</p>
            </article>
          </div>
        </div>

        <figure className="relative h-80 w-full sm:h-[290px] md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageMobile}
            alt=""
            className="h-full w-full object-cover object-center sm:object-right"
          />
        </figure>
      </section>
    </>
  );
}


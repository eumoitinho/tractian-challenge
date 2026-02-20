"use client";

import { useTranslations } from "next-intl";
import { useDemoModal } from "@/lib/demo-modal-context";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const { open: openDemoModal } = useDemoModal();
  const heroImage = t("heroImage");
  const heroImageMobile = t("heroImageMobile");

  return (
    <>
      {/* Mobile hero - split layout */}
      <section className="md:hidden overflow-x-hidden">
        <div className="bg-blue-950 w-full px-4 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
            <p className="text-blue-300 font-medium text-xs tracking-widest uppercase text-center">{t("label")}</p>
            <h1 className="text-white text-[24px] leading-[32px] font-bold text-center min-[375px]:text-[2.25rem] min-[375px]:leading-[2.75rem]">
              {t("title")}
            </h1>
            <p className="text-blue-200 font-light text-center text-sm leading-relaxed">
              {t("subtitle")}
            </p>
            <button onClick={openDemoModal} className="items-center bg-blue-600 text-white cursor-pointer font-medium h-11 justify-center py-2 px-6 text-center flex rounded-sm gap-2 hover:bg-blue-700 transition-colors">
              <p>{t("cta")}</p>
              <svg className="w-4 h-4 overflow-hidden" fill="none" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3671 8.03333L9.90046 13.5L9.16712 12.7667L13.4338 8.5H0.633789V7.5H13.4338L9.16712 3.23333L9.90046 2.5L15.3671 8.03333Z" fill="rgb(255, 255, 255)" />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-64 sm:h-80 relative overflow-hidden">
          <Image
            src={heroImageMobile}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Desktop hero - original layout */}
      <section
        className="bg-no-repeat bg-cover relative w-full h-[32.25rem] hidden md:block min-[2100px]:min-h-[42.19rem] min-[2460px]:min-h-[43.44rem]"
        style={{ backgroundImage: `url("${heroImage}")`, backgroundPosition: "100% 0px" }}
      >
        <div className="items-center bg-blue-950/[0.8] h-[32.25rem] justify-end pb-12 px-4 pt-14 relative w-full flex md:max-w-[50%] md:items-center lg:pl-12 lg:pr-12 lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20 xl:pl-16 xl:pr-24 min-[2100px]:min-h-[42.19rem] min-[2460px]:min-h-[43.44rem]">
          <div className="items-center flex-col w-full flex gap-8 md:w-fit md:items-start">
            <article className="items-center flex-col relative w-full flex gap-4 md:items-start md:max-w-[30.63rem]">
              <p className="text-blue-300 font-medium text-xs tracking-widest uppercase">{t("label")}</p>
              <h1 className="text-white text-[2.50rem] font-bold leading-[3.25rem] text-left">
                {t("title")}
              </h1>
              <p className="text-blue-200 font-light text-left">
                {t("subtitle")}
              </p>
            </article>
            <button onClick={openDemoModal} className="items-center bg-blue-600 text-white cursor-pointer font-medium h-10 justify-center max-w-fit py-2 px-4 relative text-center w-full flex rounded-sm gap-2 m-auto md:ml-0 md:mr-0 hover:bg-blue-700 transition-colors">
              <p>{t("cta")}</p>
              <svg className="w-4 h-4 overflow-hidden" fill="none" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3671 8.03333L9.90046 13.5L9.16712 12.7667L13.4338 8.5H0.633789V7.5H13.4338L9.16712 3.23333L9.90046 2.5L15.3671 8.03333Z" fill="rgb(255, 255, 255)" />
              </svg>
            </button>
          </div>
        </div>

        <div className="items-center h-[32.25rem] justify-end absolute top-0 right-[2.00rem] w-full hidden m-auto lg:flex 2xl:right-[2.00rem] 2xl:mr-0">
          <div className="bg-white flex-col max-w-[17.50rem] w-full flex rounded-sm gap-4 p-4 lg:pt-6 lg:pb-6 2xl:max-w-[17.50rem] 2xl:pl-5 2xl:pr-5 min-[2100px]:max-w-xs min-[2100px]:pl-6 min-[2100px]:pr-6 min-[2100px]:pt-7 min-[2100px]:pb-7 min-[2460px]:max-w-[20.94rem]">
            <p className="text-slate-500">{t("quote")}</p>
            <article className="flex-col flex w-full text-sm">
              <p className="font-bold">{t("quoteAuthor")}</p>
              <p>{t("quoteRole")}</p>
              <p className="font-bold">{t("quoteCompany")}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

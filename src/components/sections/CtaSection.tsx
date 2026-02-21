"use client";

import { useTranslations } from "next-intl";
import { useDemoModal } from "@/lib/demo-modal-context";

export function CtaSection() {
  const t = useTranslations("cta");
  const { open: openDemoModal } = useDemoModal();

  return (
    <section
      className='bg-[url("https://tractian-webpage.s3.us-east-1.amazonaws.com/website/pages/who-we-serve/maintenance-engineer/en/more-than-machines.png")] bg-no-repeat bg-cover w-full overflow-x-hidden text-white 2xl:min-h-[29.69rem] min-[2100px]:min-h-[32.81rem] min-[2460px]:min-h-[35.00rem]'
      style={{ backgroundPosition: "100% 50%" }}
    >
      <div className="bg-blue-950/[0.95] justify-center py-12 px-4 flex w-full max-w-full md:bg-blue-950/[0.8] md:max-w-[50%] md:justify-end lg:pl-12 lg:pr-12 lg:pt-16 lg:pb-16 xl:pl-16 xl:pr-0 xl:pt-20 xl:pb-20 2xl:min-h-[29.69rem] 2xl:items-center 2xl:pl-16 min-[2100px]:min-h-[32.81rem] min-[2100px]:pl-12 min-[2460px]:min-h-[35.00rem]">
        <div className="items-center flex-col flex w-full max-w-full gap-6 sm:gap-8 md:max-w-[19.88rem] md:items-start lg:max-w-full xl:max-w-xl">
          <article className="items-center flex-col flex w-full text-2xl leading-8 font-bold md:text-[2.50rem] md:leading-none md:items-start">
            <h2>
              {t("titleLine1")} <br /> {t("titleLine2")}
            </h2>
          </article>
          <button onClick={openDemoModal} className="bg-blue-600 cursor-pointer text-sm leading-[1.38rem] font-medium py-2 px-4 text-center w-full h-10 max-w-fit rounded-sm m-auto hover:bg-blue-700 transition-colors md:ml-0 md:mr-0">
            {t("button")}
          </button>
        </div>
      </div>
    </section>
  );
}

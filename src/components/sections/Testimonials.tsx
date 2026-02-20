"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useMessages } from "next-intl";

const AUTO_ADVANCE_MS = 6000;

function QuoteIcon() {
  return (
    <svg className="w-8 h-8" fill="none" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.667 4C24.2487 4 20.667 7.58172 20.667 12H18.0003C18.0003 6.10896 22.776 1.33333 28.667 1.33333V4Z" fill="rgb(37, 99, 235)" />
      <path d="M30 30.6667H18V12.0001H30V30.6667Z" fill="rgb(37, 99, 235)" />
      <path d="M12.667 4C8.24871 4 4.66699 7.58172 4.66699 12H2.00033C2.00033 6.10896 6.77595 1.33333 12.667 1.33333V4Z" fill="rgb(37, 99, 235)" />
      <path d="M14 30.6667H2V12.0001H14V30.6667Z" fill="rgb(37, 99, 235)" />
    </svg>
  );
}

function G2Badge() {
  return (
    <svg className="w-6 h-6" fill="none" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect className="w-6 h-6" fill="rgb(255, 73, 44)" height="24" rx="11.6" />
      <path d="M14.1371 15.0019C14.6538 15.904 15.1646 16.7959 15.6751 17.6868C13.4146 19.4281 9.89763 19.6386 7.29408 17.6332C4.29797 15.3237 3.80553 11.3829 5.40961 8.54623C7.25452 5.28339 10.707 4.56179 12.9298 5.09091C12.8697 5.22232 11.5384 8.00145 11.5384 8.00145C11.5384 8.00145 11.4331 8.00841 11.3736 8.00957C10.7166 8.03759 10.2272 8.19142 9.70269 8.46429C8.5342 9.07786 7.74408 10.2343 7.59312 11.5517C7.51553 12.2097 7.60599 12.8768 7.85585 13.4898C8.06712 14.0081 8.36596 14.4684 8.7666 14.857C9.38118 15.4538 10.1125 15.8233 10.9603 15.9456C11.7631 16.0615 12.5352 15.9467 13.2587 15.5809C13.53 15.4439 13.7609 15.2926 14.0307 15.085C14.0651 15.0626 14.0956 15.0342 14.1371 15.0019Z" fill="rgb(255, 255, 255)" />
      <path d="M14.1422 7.09051C14.011 6.96065 13.8894 6.84083 13.7684 6.72025C13.6962 6.64836 13.6267 6.57357 13.5527 6.50342C13.5262 6.4781 13.4951 6.44351 13.4951 6.44351C13.4951 6.44351 13.5203 6.38979 13.531 6.36776C13.6726 6.08194 13.8944 5.87304 14.1575 5.70684C14.4485 5.52171 14.7875 5.4274 15.1316 5.4361C15.572 5.44479 15.9815 5.55514 16.327 5.85236C16.5821 6.0717 16.7129 6.34998 16.7359 6.68218C16.7743 7.2426 16.5439 7.67181 16.0862 7.97135C15.8173 8.14759 15.5273 8.28383 15.2365 8.4452C15.0761 8.53429 14.939 8.61255 14.7823 8.77372C14.6444 8.93547 14.6377 9.08795 14.6377 9.08795L16.7209 9.08524V10.0188H13.5053V9.92859C13.493 9.46981 13.5462 9.03809 13.755 8.62144C13.947 8.23919 14.2455 7.95937 14.6041 7.74389C14.8802 7.57789 15.171 7.43662 15.4478 7.2714C15.6185 7.16955 15.7391 7.02017 15.7382 6.80354C15.7382 6.61763 15.6037 6.4524 15.4117 6.4008C14.9588 6.2779 14.4979 6.47405 14.2582 6.89108C14.2232 6.95195 14.1875 7.01244 14.1422 7.09051Z" fill="rgb(255, 255, 255)" />
      <path d="M18.1715 14.0096L16.4159 10.959H12.9417L11.1748 14.0411H14.6745L16.4015 17.0773L18.1715 14.0096Z" fill="rgb(255, 255, 255)" />
    </svg>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const messages = useMessages();
  const rawItems = (messages.testimonials as Record<string, unknown>)?.items as Record<string, string>[] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const touchStartRef = useRef(0);

  const items = rawItems.map((_, i) => ({
    quote: t(`items.${i}.quote`),
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    company: t(`items.${i}.company`),
    image: rawItems[i]?.image || "",
  }));

  const total = items.length;

  const goTo = useCallback((idx: number) => {
    const next = ((idx % total) + total) % total;
    setActiveIndex(next);
    setProgress(0);
    if (scrollRef.current) {
      const child = scrollRef.current.children[next] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
      }
    }
  }, [total]);

  useEffect(() => {
    const interval = 50;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + (interval / AUTO_ADVANCE_MS) * 100;
        if (next >= 100) {
          setActiveIndex((prev) => {
            const nextIdx = (prev + 1) % total;
            if (scrollRef.current) {
              const child = scrollRef.current.children[nextIdx] as HTMLElement;
              if (child) {
                scrollRef.current.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
              }
            }
            return nextIdx;
          });
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / (clientWidth * 0.85));
    if (idx !== activeIndex && idx >= 0 && idx < total) {
      setActiveIndex(idx);
      setProgress(0);
    }
  };

  return (
    <section className="bg-white py-12 w-full sm:pl-4 sm:pr-4 lg:pt-16 lg:pb-16 xl:pl-0 xl:pr-0">
      <div className="items-center flex-col flex w-full max-w-2xl gap-8 m-auto lg:max-w-6xl lg:gap-12">
        <h2 className="text-[20px] font-bold px-4 text-center min-[375px]:text-4xl sm:pl-0 sm:pr-0">
          {t("title")}
        </h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex w-full overflow-x-auto gap-6 px-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:gap-12 lg:flex lg:flex-row lg:justify-between"
        >
          {items.map((item, i) => (
            <div key={i} className="flex-col flex min-w-[280px] w-[85vw] shrink-0 snap-start h-auto gap-4 sm:w-full sm:min-w-0 sm:shrink">
              <div className="items-center flex w-full text-blue-600">
                <QuoteIcon />
                {i === 1 && <G2Badge />}
              </div>
              <p className="text-slate-500 text-sm italic h-full">
                {item.quote}
              </p>
              <div className="items-center flex gap-3 lg:justify-between">
                <figure className="items-center justify-center flex w-12 h-12 min-w-[3rem] rounded-full overflow-hidden lg:h-14 lg:w-14 lg:min-w-[3.5rem] bg-slate-200">
                  {item.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      className="object-cover w-12 h-12 rounded-full lg:w-14 lg:h-14"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                  )}
                </figure>
                <article className="flex-col flex-grow flex w-full text-sm">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.role}</p>
                  <p className="font-bold">{item.company}</p>
                </article>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full gap-1.5 px-4 sm:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-1 flex-1 rounded-full bg-slate-200 overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-all duration-100"
                style={{
                  width: i === activeIndex ? `${progress}%` : i < activeIndex ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

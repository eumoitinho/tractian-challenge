"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "./events";

const VISIBILITY_THRESHOLD = 0.5;
const MIN_VISIBLE_MS = 1000;

export function useSectionTracking(sectionId: string): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  const tracked = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || tracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          timerRef.current = setTimeout(() => {
            if (!tracked.current) {
              tracked.current = true;
              trackSectionView(sectionId);
            }
          }, MIN_VISIBLE_MS);
        } else if (!entry.isIntersecting && timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      },
      { threshold: VISIBILITY_THRESHOLD }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sectionId]);

  return ref;
}

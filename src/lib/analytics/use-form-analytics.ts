"use client";

import { useRef, useCallback, useEffect } from "react";
import type { FormAnalyticsData } from "./types";
import { dispatch } from "./dispatcher";

export function useFormAnalytics(formId: string) {
  const data = useRef<FormAnalyticsData>({
    formId,
    startedAt: null,
    fieldsInteracted: new Set(),
    fieldTimings: {},
    lastFieldFocusedAt: null,
    submitted: false,
  });

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      const now = Date.now();
      const d = data.current;

      if (!d.startedAt) {
        d.startedAt = now;
        dispatch({
          event: "form_start",
          category: "performance",
          timestamp: now,
          properties: { formId },
        });
      }

      if (d.lastFieldFocusedAt && d.fieldsInteracted.size > 0) {
        const lastField = Array.from(d.fieldsInteracted).pop()!;
        d.fieldTimings[lastField] =
          (d.fieldTimings[lastField] || 0) + (now - d.lastFieldFocusedAt);
      }

      d.fieldsInteracted.add(fieldName);
      d.lastFieldFocusedAt = now;

      dispatch({
        event: "form_field_focus",
        category: "performance",
        timestamp: now,
        properties: { formId, fieldName },
      });
    },
    [formId]
  );

  const markSubmitted = useCallback(() => {
    data.current.submitted = true;
  }, []);

  const getFormData = useCallback((): FormAnalyticsData => {
    return {
      ...data.current,
      fieldsInteracted: new Set(data.current.fieldsInteracted),
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const d = data.current;
      if (d.startedAt && !d.submitted) {
        dispatch({
          event: "form_abandonment",
          category: "performance",
          timestamp: Date.now(),
          properties: {
            formId,
            fieldsInteracted: d.fieldsInteracted.size,
            durationMs: Date.now() - d.startedAt,
          },
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formId]);

  return { trackFieldFocus, markSubmitted, getFormData };
}

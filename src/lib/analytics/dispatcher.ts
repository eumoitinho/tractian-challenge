import type { AnalyticsEvent } from "./types";
import { hasConsent } from "./consent";
import { pushToDataLayer } from "./data-layer";

let pendingEvents: AnalyticsEvent[] = [];

export function dispatch(event: AnalyticsEvent): void {
  if (hasConsent(event.category)) {
    pushToDataLayer({
      event: event.event,
      ...event.properties,
      _consentCategory: event.category,
    });
    return;
  }

  pendingEvents.push(event);
}

export function flushPendingEvents(): void {
  const queued = [...pendingEvents];
  pendingEvents = [];

  for (const event of queued) {
    if (hasConsent(event.category)) {
      pushToDataLayer({
        event: event.event,
        ...event.properties,
        _consentCategory: event.category,
      });
    }
  }
}

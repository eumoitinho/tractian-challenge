declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function ensureDataLayer(): Record<string, unknown>[] {
  if (typeof window === "undefined") return [];
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushToDataLayer(payload: Record<string, unknown>): void {
  const dataLayer = ensureDataLayer();
  const entry = { ...payload, _timestamp: Date.now() };
  dataLayer.push(entry);

  if (process.env.NODE_ENV === "development") {
    console.log(`[DataLayer] ${String(payload.event)}`, entry);
  }
}

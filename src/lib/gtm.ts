/**
 * GTM dataLayer helpers. Ensure window.dataLayer exists before pushing.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

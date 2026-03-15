"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushToDataLayer } from "@/lib/gtm";

/**
 * Pushes a virtual page_view to the dataLayer on every client-side route change
 * so GA4 (and other tags in GTM) receive page views for Next.js App Router navigation.
 */
export function GtmPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    pushToDataLayer({
      event: "page_view",
      page_path: pathname,
      page_title: typeof document !== "undefined" ? document.title : "",
      page_location:
        typeof window !== "undefined" ? window.location.href : "",
    });
  }, [pathname]);

  return null;
}

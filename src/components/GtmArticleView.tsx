"use client";

import { useEffect } from "react";
import { pushToDataLayer } from "@/lib/gtm";

interface GtmArticleViewProps {
  slug: string;
  title: string;
  category?: string;
}

/**
 * Pushes an article_view (GA4-style view_item for content) to the dataLayer
 * when the user lands on a post page. Rendered once per article from the post page.
 */
export function GtmArticleView({ slug, title, category }: GtmArticleViewProps) {
  useEffect(() => {
    pushToDataLayer({
      event: "article_view",
      content_type: "article",
      item_id: slug,
      item_name: title,
      ...(category && { category }),
    });
  }, [slug, title, category]);

  return null;
}

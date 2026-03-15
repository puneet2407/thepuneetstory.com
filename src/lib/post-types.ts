export type Category =
  | "insurance"
  | "taxes"
  | "real-estate"
  | "immigration"
  | "tech"
  | "life";

export type PostStatus = "published" | "trending" | "live";

export interface ResourceLink {
  label: string;
  url: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  readTime?: number;
  status?: PostStatus;
  reelUrl?: string;
  videoUrl?: string;
  image?: string;
  isDashboard?: boolean;
  dashboardSrc?: string;
  resources?: ResourceLink[];
  notionPageId?: string;
  /** Notion block tree (synced by script); avoids live Notion API at request time */
  contentBlocks?: unknown[];
}

export const categories: { value: Category; label: string }[] = [
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes" },
  { value: "real-estate", label: "Real Estate" },
  { value: "immigration", label: "Immigration" },
  { value: "tech", label: "Tech" },
  { value: "life", label: "Life in Canada" },
];

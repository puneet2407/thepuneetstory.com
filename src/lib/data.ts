export type Category =
  | "insurance"
  | "taxes"
  | "real-estate"
  | "immigration"
  | "tech"
  | "life";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  reelUrl?: string;
  image?: string;
  isDashboard?: boolean;
}

export const categories: { value: Category; label: string }[] = [
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes" },
  { value: "real-estate", label: "Real Estate" },
  { value: "immigration", label: "Immigration" },
  { value: "tech", label: "Tech" },
  { value: "life", label: "Life in Canada" },
];

export const posts: Post[] = [
  {
    id: "1",
    slug: "ontario-car-insurance-dashboard",
    title: "Ontario Car Insurance Rate Comparison",
    description:
      "Interactive dashboard comparing car insurance rates across Ontario cities. Find the best rates for your location.",
    category: "insurance",
    date: "2026-03-01",
    reelUrl: "https://tiktok.com/@thepuneetstory",
    isDashboard: true,
  },
  {
    id: "2",
    slug: "first-time-home-buyer-tax-credits",
    title: "First-Time Home Buyer Tax Credits Explained",
    description:
      "Everything you need to know about FTHB tax credits in Canada. Save thousands on your first home purchase.",
    category: "taxes",
    date: "2026-02-28",
    reelUrl: "https://tiktok.com/@thepuneetstory",
  },
  {
    id: "3",
    slug: "gta-rent-vs-buy-calculator",
    title: "GTA Rent vs Buy Calculator 2026",
    description:
      "Should you rent or buy in the Greater Toronto Area? Use this calculator to make an informed decision.",
    category: "real-estate",
    date: "2026-02-25",
    reelUrl: "https://tiktok.com/@thepuneetstory",
    isDashboard: true,
  },
  {
    id: "4",
    slug: "pr-timeline-tracker",
    title: "PR Application Timeline Tracker",
    description:
      "Track your Permanent Residence application timeline. See average processing times and what to expect.",
    category: "immigration",
    date: "2026-02-20",
    reelUrl: "https://tiktok.com/@thepuneetstory",
    isDashboard: true,
  },
  {
    id: "5",
    slug: "tech-salaries-canada-2026",
    title: "Tech Salaries in Canada: 2026 Report",
    description:
      "Comprehensive breakdown of tech salaries across Canada. Find out what you should be earning.",
    category: "tech",
    date: "2026-02-15",
    reelUrl: "https://tiktok.com/@thepuneetstory",
  },
  {
    id: "6",
    slug: "indian-groceries-toronto-guide",
    title: "Best Places for Indian Groceries in Toronto",
    description:
      "Complete guide to finding authentic Indian groceries in Toronto. Save money and eat well.",
    category: "life",
    date: "2026-02-10",
    reelUrl: "https://tiktok.com/@thepuneetstory",
  },
  {
    id: "7",
    slug: "rrsp-tfsa-comparison",
    title: "RRSP vs TFSA: Which One for Newcomers?",
    description:
      "Understand the difference between RRSP and TFSA accounts. Make the right choice for your financial future.",
    category: "taxes",
    date: "2026-02-05",
    reelUrl: "https://tiktok.com/@thepuneetstory",
  },
  {
    id: "8",
    slug: "winter-driving-insurance-tips",
    title: "Winter Driving & Insurance: What You Need to Know",
    description:
      "Essential tips for winter driving in Canada and how it affects your insurance premiums.",
    category: "insurance",
    date: "2026-01-30",
    reelUrl: "https://tiktok.com/@thepuneetstory",
  },
  {
    id: "9",
    slug: "express-entry-crs-calculator",
    title: "Express Entry CRS Score Calculator",
    description:
      "Calculate your Comprehensive Ranking System score for Express Entry. Know where you stand.",
    category: "immigration",
    date: "2026-01-25",
    reelUrl: "https://tiktok.com/@thepuneetstory",
    isDashboard: true,
  },
];

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((post) => post.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return posts.slice(0, 3);
}

export function getLatestPosts(limit: number = 6): Post[] {
  return posts.slice(0, limit);
}


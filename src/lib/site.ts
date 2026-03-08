/**
 * Site content and branding — edit this file to customize the whole site.
 * See CONTENT_CHECKLIST.md for what each field is used for.
 */

export const site = {
  /** Live site URL (no trailing slash). Used in sitemap, OG, canonicals, RSS. */
  url: "https://thepuneetstory.com",

  /** Brand name shown in nav, footer, titles, OG. */
  brandName: "The Puneet Story",

  /** Short tagline (e.g. hero badge, footer). */
  tagline: "Real Canada. Real Talk.",

  /** Default meta description and similar uses. */
  description:
    "Real Canada. Real Talk. Guides on insurance, taxes, real estate, immigration, tech, and daily life for the Indian-Canadian community.",
} as const;

export const person = {
  /** First name (or display name) for "Hi, I'm X", JSON-LD, About. */
  name: "Puneet",

  /** One-line bio (About hero, meta, JSON-LD). */
  bio: "Indian immigrant. Content creator. Your guide to real life in Canada.",

  /** Longer bio for schema/SEO. */
  bioLong:
    "Indian immigrant and content creator helping the Indian-Canadian community navigate life in Canada.",

  /** Optional: e.g. "Shot on Sony A7III" under hero image. Leave empty to hide. */
  heroImageCredit: "Shot on Sony A7III",

  /** Your main profile/hero image URL (high quality). */
  imageUrl:
    "https://images.unsplash.com/photo-1758788505847-d0d2b1bf8d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  /** Alt text for that image. */
  imageAlt: "Puneet - Content Creator",
} as const;

export const social = {
  /** Twitter/X handle for Twitter card (no @). */
  twitterHandle: "thepuneetstory",

  links: [
    { platform: "TikTok" as const, followers: "300+", url: "https://tiktok.com/@thepuneetstory" },
    { platform: "Instagram" as const, followers: "100K+", url: "https://instagram.com/thepuneetstory" },
  ],
} as const;

/** Home page hero and trust section. */
export const home = {
  /** Badge text above the hero headline (e.g. tagline or category). */
  heroBadge: "Real Canada. Real Talk.",
  heroTitle: "Insurance, Taxes, Real Estate—Without the Jargon",
  heroSubtext:
    "I'm an Indian immigrant who learned the hard way. Now I break down what actually matters for life in Canada—so you can make decisions with confidence. Backed by real experience, powered by community.",
  topicsIntro:
    "Real, useful topics for the Indian-Canadian community. Each video links to deeper content, dashboards, and tools.",
  trustTitle: "Why Trust The Puneet Story?",
  trustParagraph:
    "I'm an Indian immigrant living in Canada, creating content on what actually matters. Every video is backed by research, real experience, and conversations with professionals. I'm not a financial advisor—I'm someone who's been through it and wants to help others do the same.",
} as const;

/** About page — My Story (paragraphs). */
export const about = {
  storyParagraphs: [
    "I moved to Canada from India with big dreams, a suitcase full of clothes, and absolutely no idea how car insurance worked here. Or taxes. Or how to buy a house. Or navigate the immigration system while helping my family back home understand what PR actually means.",
    "The first few years were tough. I made expensive mistakes—overpaying for insurance because I didn't know better, missing out on tax credits, and spending hours Googling basic questions that had no clear answers for someone in my situation.",
    "That's when I realized: there was no single place where the Indian-Canadian community could get real, practical, trustworthy information. No one was talking about the stuff that actually matters when you're trying to build a life here.",
    "So I started creating content. What began as simple TikTok videos about insurance has grown into a community of hundreds of thousands of people who trust me to break down complex topics into something digestible, actionable, and real.",
  ],
  quote:
    "I'm not a financial advisor, immigration lawyer, or tax expert. I'm just someone who's been through it, learned the hard way, and wants to help others avoid the same mistakes.",
  /** What I Do — 4 cards: title + description. */
  whatIDo: [
    {
      title: "Content Creation",
      description:
        "I create short-form videos on TikTok and Instagram covering insurance, taxes, real estate, immigration, tech careers, and daily life in Canada. Shot on my Sony A7III with real production value.",
    },
    {
      title: "Deep Dives",
      description:
        "Each video links to in-depth articles and interactive dashboards on this website. Want to compare insurance rates? Calculate your CRS score? It's all here.",
    },
    {
      title: "Community Building",
      description:
        "Through my newsletter and social channels, I'm building a community of Indian-Canadians who support each other, share knowledge, and navigate life here together.",
    },
    {
      title: "Local Focus",
      description:
        "Based in Ontario, I focus on Canada-wide topics with special attention to GTA life, Toronto resources, and provincial nuances that matter.",
    },
  ],
  values: [
    { title: "Real Over Perfect", description: "I'd rather give you honest, practical advice than perfectly polished corporate speak. This is real life, not a brochure." },
    { title: "Community First", description: "Everything I create is for the Indian-Canadian community. Your questions shape my content. Your feedback makes it better." },
    { title: "Always Learning", description: "I'm not an expert in everything. I'm a researcher, a storyteller, and someone who talks to professionals so you don't have to. If I don't know something, I'll tell you." },
    { title: "No BS", description: "I'll never sell you something just because it pays well. If a product or service is worth recommending, I'll explain why. If it's not, I'll stay silent." },
  ],
} as const;

/** Newsletter page. */
export const newsletter = {
  subscriberCount: "100+",
  welcomeTitle: "You're In! 🎉",
  welcomeMessage:
    "Welcome to The Puneet Story community. Check your inbox for a confirmation email. Your first newsletter will arrive next week with fresh insights on life in Canada.",
  heroSubtext:
    "Join thousands of Indian-Canadians getting weekly tips on insurance, taxes, real estate, immigration, and life in the Great White North.",
  sendDay: "Sundays",
} as const;

/** Legal pages: jurisdiction and contact note. */
export const legal = {
  /** e.g. "Province of Ontario, Canada" */
  governingLaw: "Province of Ontario, Canada",
  /** Short note for contact sections. */
  contactNote: "Please reach out via the contact information on the website or through social media channels.",
} as const;

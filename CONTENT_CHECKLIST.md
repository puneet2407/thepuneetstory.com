# Content checklist — what to provide to replace template content

Edit **`src/lib/site.ts`** with your details. Use this list as a guide.

---

## 1. Site & brand

| Field | Where it's used | Example |
|-------|------------------|---------|
| **site.url** | Sitemap, OG images, canonicals, RSS, legal pages | `https://thepuneetstory.com` |
| **site.brandName** | Nav, footer, page titles, OG, legal | `The Puneet Story` |
| **site.tagline** | Hero badge, footer | `Real Canada. Real Talk.` |
| **site.description** | Default meta description, RSS, JSON-LD | One sentence about your site |

---

## 2. You (person)

| Field | Where it's used | Example |
|-------|------------------|---------|
| **person.name** | "Hi, I'm X", About, JSON-LD, post author | `Puneet` |
| **person.bio** | About hero, meta description | One line: immigrant, creator, guide… |
| **person.bioLong** | JSON-LD / SEO | 1–2 sentences about you |
| **person.heroImageCredit** | Text under hero image (optional) | `Shot on Sony A7III` or leave empty |
| **person.imageUrl** | Hero image on home + About (use a real URL) | Your photo URL |
| **person.imageAlt** | Alt text for that image | `Puneet - Content Creator` |

---

## 3. Social

| Field | Where it's used | Example |
|-------|------------------|---------|
| **social.twitterHandle** | Twitter card `creator` | `thepuneetstory` (no @) |
| **social.links** | Footer, About, home hero | Array of `{ platform, followers, url }` for TikTok, Instagram, etc. |

---

## 4. Home page

| Field | Where it's used |
|-------|------------------|
| **home.heroTitle** | Main headline |
| **home.heroSubtext** | Paragraph under the headline |
| **home.topicsIntro** | "What I Cover" section intro |
| **home.trustTitle** | "Why Trust…" heading |
| **home.trustParagraph** | "Why Trust…" body text |

---

## 5. About page

| Field | Where it's used |
|-------|------------------|
| **about.storyParagraphs** | "My Story" — array of 4 paragraphs |
| **about.quote** | Pull quote in a box |
| **about.whatIDo** | Four cards: title + description (Content Creation, Deep Dives, Community Building, Local Focus) |
| **about.values** | Four value blocks: title + description |

You can change the **Local Focus** text (e.g. city/region) and **What I Do** descriptions to match your real setup (camera, tools, location).

---

## 6. Newsletter page

| Field | Where it's used |
|-------|------------------|
| **newsletter.subscriberCount** | e.g. "12,000+ subscribers" |
| **newsletter.welcomeTitle** | Success state title, e.g. "You're In! 🎉" |
| **newsletter.welcomeMessage** | Success state message |
| **newsletter.heroSubtext** | Under the main newsletter headline |
| **newsletter.sendDay** | e.g. "Weekly on Sundays" |

---

## 7. Legal

| Field | Where it's used |
|-------|------------------|
| **legal.governingLaw** | Terms of Use (e.g. "Province of Ontario, Canada") |
| **legal.contactNote** | Disclaimer / Privacy / Terms contact line |

---

## 8. Sitemap base URL

- **`next-sitemap.config.js`** — Set `siteUrl` to match **`site.url`** in `site.ts` (e.g. `https://thepuneetstory.com`) so generated sitemap and robots.txt use the correct domain.

## 9. Blog/topics (optional)

- **`src/lib/data.ts`** — Update **posts** (titles, slugs, descriptions, dates, **reelUrl** to your TikTok/Instagram) and **categories** if you want different topic names.

---

## Quick copy-paste template (fill and then put into `site.ts`)

```
Site URL: 
Brand name: 
Tagline: 
Default meta description: 

Your name: 
Short bio (one line): 
Longer bio (1–2 sentences): 
Hero image credit (or leave blank): 
Hero image URL: 
Hero image alt text: 

Twitter handle (no @): 
TikTok URL: 
TikTok followers (e.g. 125K+): 
Instagram URL: 
Instagram followers (e.g. 89K+): 

Home hero title: 
Home hero subtext: 
Home “Why Trust” title: 
Home “Why Trust” paragraph: 

About story (4 paragraphs): 
About quote: 
About “Local Focus” description (city/region): 
Newsletter subscriber count: 
Newsletter send day: 
Legal governing law: 
```

Once you have this filled, you can paste the values into `src/lib/site.ts` (and update `data.ts` for posts). The app is wired to use `site.ts` everywhere so one file drives the whole site.

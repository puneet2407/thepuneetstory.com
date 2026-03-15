/**
 * Sync posts from a Notion database into Prisma/Postgres.
 *
 * Usage:
 *   DATABASE_URL=... NOTION_TOKEN=... NOTION_DATABASE_ID=... npx tsx scripts/sync-notion.ts
 *
 * Expected Notion database properties:
 *   Title        (title)      → post title
 *   Slug         (rich_text)  → URL slug (required, must be unique)
 *   Description  (rich_text)  → short description
 *   Category     (select)     → one of: insurance, taxes, real-estate, immigration, tech, life
 *   Date         (date)       → publish date
 *   Read Time    (number)     → estimated read time in minutes
 *   Status       (select)     → published | trending | live
 *   Reel URL     (url)        → TikTok / Reel link
 *   Video URL    (url)        → video link
 *   Image        (url)        → cover image URL
 *   Is Dashboard (checkbox)   → whether the post has an interactive dashboard
 *   Dashboard Src(rich_text)  → path to embedded dashboard HTML
 *   Published    (checkbox)   → only sync pages where this is checked
 *
 * The Notion page ID is stored as `notionPageId`; post body content (blocks)
 * is fetched during sync and stored in `contentBlocks` so the app reads from
 * the DB only (no Notion API calls at request time).
 */

import "dotenv/config";
import {
  Category as PrismaCategory,
  Prisma,
  PostStatus as PrismaPostStatus,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const DATABASE_URL = process.env.DATABASE_URL;
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}
if (!NOTION_TOKEN) {
  console.error("NOTION_TOKEN is required.");
  process.exit(1);
}
if (!NOTION_DATABASE_ID) {
  console.error("NOTION_DATABASE_ID is required.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

async function notionFetch(
  path: string,
  body?: Record<string, unknown>,
  retries = 3
): Promise<unknown> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${NOTION_API}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (res.status === 429) {
      const waitSec = Math.max(2, parseInt(res.headers.get("Retry-After") ?? "2", 10));
      if (attempt < retries) {
        console.warn(`  Rate limited; waiting ${waitSec}s before retry...`);
        await new Promise((r) => setTimeout(r, waitSec * 1000));
        continue;
      }
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Notion API ${res.status}: ${text}`);
    }

    return res.json();
  }

  throw new Error("Notion API rate limited; max retries exceeded.");
}

interface NotionBlockListResponse {
  results: Array<{ id: string; type?: string; has_children?: boolean; [k: string]: unknown }>;
  has_more: boolean;
  next_cursor: string | null;
}

async function fetchBlocksRecursive(blockId: string): Promise<unknown[]> {
  const blocks: unknown[] = [];
  let cursor: string | undefined;

  do {
    const path = `/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`;
    const response = (await notionFetch(path)) as NotionBlockListResponse;

    for (const block of response.results) {
      const fullBlock = block as Record<string, unknown>;
      blocks.push(fullBlock);

      if (
        fullBlock.has_children === true &&
        fullBlock.type !== "child_page"
      ) {
        const children = await fetchBlocksRecursive(fullBlock.id as string);
        (fullBlock as Record<string, unknown>)._children = children;
        await new Promise((r) => setTimeout(r, 350));
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    if (cursor) await new Promise((r) => setTimeout(r, 350));
  } while (cursor);

  return blocks;
}

interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

function getRichTextPlain(
  props: Record<string, unknown>,
  key: string
): string {
  const prop = props[key] as { type?: string; rich_text?: { plain_text: string }[] } | undefined;
  if (prop?.type === "rich_text" && Array.isArray(prop.rich_text)) {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getTitlePlain(
  props: Record<string, unknown>,
  key: string
): string {
  const prop = props[key] as { type?: string; title?: { plain_text: string }[] } | undefined;
  if (prop?.type === "title" && Array.isArray(prop.title)) {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "";
}

function getSelectValue(
  props: Record<string, unknown>,
  key: string
): string | undefined {
  const prop = props[key] as { type?: string; select?: { name: string } | null } | undefined;
  if (prop?.type === "select" && prop.select) {
    return prop.select.name;
  }
  return undefined;
}

function getCheckbox(
  props: Record<string, unknown>,
  key: string
): boolean {
  const prop = props[key] as { type?: string; checkbox?: boolean } | undefined;
  if (prop?.type === "checkbox") {
    return prop.checkbox === true;
  }
  return false;
}

function getUrl(
  props: Record<string, unknown>,
  key: string
): string | undefined {
  const prop = props[key] as { type?: string; url?: string | null } | undefined;
  if (prop?.type === "url" && prop.url) {
    return prop.url;
  }
  return undefined;
}

function getNumber(
  props: Record<string, unknown>,
  key: string
): number | undefined {
  const prop = props[key] as { type?: string; number?: number | null } | undefined;
  if (prop?.type === "number" && typeof prop.number === "number") {
    return prop.number;
  }
  return undefined;
}

function getDate(
  props: Record<string, unknown>,
  key: string
): string | undefined {
  const prop = props[key] as { type?: string; date?: { start?: string } | null } | undefined;
  if (prop?.type === "date" && prop.date?.start) {
    return prop.date.start;
  }
  return undefined;
}

const categoryMap: Record<string, PrismaCategory> = {
  insurance: PrismaCategory.insurance,
  taxes: PrismaCategory.taxes,
  "real-estate": PrismaCategory.real_estate,
  "real_estate": PrismaCategory.real_estate,
  immigration: PrismaCategory.immigration,
  tech: PrismaCategory.tech,
  life: PrismaCategory.life,
};

const statusMap: Record<string, PrismaPostStatus> = {
  published: PrismaPostStatus.published,
  trending: PrismaPostStatus.trending,
  live: PrismaPostStatus.live,
};

async function syncNotionPosts() {
  let cursor: string | undefined;
  let synced = 0;
  let skipped = 0;

  do {
    const body: { start_cursor?: string; page_size: number; filter?: object } = {
      start_cursor: cursor,
      page_size: 100,
    };
    // Filter by Published only if NOTION_SYNC_PUBLISHED_ONLY=true and your DB has a "Published" checkbox
    if (process.env.NOTION_SYNC_PUBLISHED_ONLY === "true") {
      body.filter = { property: "Published", checkbox: { equals: true } };
    }
    const response: NotionQueryResponse = await notionFetch(
      `/databases/${NOTION_DATABASE_ID}/query`,
      body
    );

    for (const page of response.results) {
      const props = page.properties;
      const title = getTitlePlain(props, "Title");
      const slug = getRichTextPlain(props, "Slug").trim();

      if (!slug) {
        console.warn(`  Skipping page "${title}" — no slug.`);
        skipped++;
        continue;
      }

      const categoryRaw = getSelectValue(props, "Category")?.toLowerCase();
      const category = categoryRaw ? categoryMap[categoryRaw] : undefined;

      if (!category) {
        console.warn(`  Skipping "${slug}" — unknown category "${categoryRaw}".`);
        skipped++;
        continue;
      }

      const date = getDate(props, "Date") ?? new Date().toISOString().slice(0, 10);
      const statusRaw = getSelectValue(props, "Status")?.toLowerCase();
      const status = statusRaw ? statusMap[statusRaw] : undefined;

      const data = {
        title,
        description: getRichTextPlain(props, "Description"),
        category,
        date,
        readTime: getNumber(props, "Read Time"),
        status: status ?? null,
        reelUrl: getUrl(props, "Reel URL"),
        videoUrl: getUrl(props, "Video URL"),
        image: getUrl(props, "Image"),
        isDashboard: getCheckbox(props, "Is Dashboard"),
        dashboardSrc: getRichTextPlain(props, "Dashboard Src") || null,
        notionPageId: page.id,
        resources: Prisma.DbNull as typeof Prisma.DbNull,
      };

      await prisma.post.upsert({
        where: { slug },
        update: data,
        create: {
          id: page.id.replace(/-/g, "").slice(0, 24),
          slug,
          ...data,
        },
      });

      if (page.id) {
        try {
          const contentBlocks = await fetchBlocksRecursive(page.id);
          await prisma.post.update({
            where: { slug },
            data: { contentBlocks: contentBlocks as Prisma.InputJsonValue },
          });
        } catch (err) {
          console.warn(`  Could not fetch blocks for "${slug}":`, err);
        }
        await new Promise((r) => setTimeout(r, 400));
      }

      console.log(`  ✓ ${slug}`);
      synced++;
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  console.log(`\nDone. Synced: ${synced}, Skipped: ${skipped}.`);
}

syncNotionPosts()
  .catch((error) => {
    console.error("Notion sync failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

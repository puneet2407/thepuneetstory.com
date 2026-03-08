/**
 * One-off script: add required properties to your Notion posts database
 * and create 2 sample pages.
 *
 * Usage (from next-brand-site):
 *   NOTION_TOKEN=... npx tsx scripts/setup-notion-database.ts
 *
 * Database ID: 31de8d0a03e2809895d6f7c3977313d8
 */

import "dotenv/config";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = "31de8d0a03e2809895d6f7c3977313d8";
const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

if (!NOTION_TOKEN) {
  console.error("NOTION_TOKEN is required.");
  process.exit(1);
}

async function notionFetch(
  path: string,
  options: { method?: "GET" | "PATCH"; body?: Record<string, unknown> } = {}
) {
  const { method = "GET", body } = options;
  const res = await fetch(`${NOTION_API}${path}`, {
    method: body ? "PATCH" : "GET",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API ${res.status}: ${text}`);
  }

  return res.json();
}

async function main() {
  // 1) Get current database schema
  console.log("Fetching database...");
  const db = await notionFetch(`/databases/${NOTION_DATABASE_ID}`);
  const existingProps = Object.keys((db as { properties?: Record<string, unknown> }).properties ?? {});

  // 2) Build new properties to ADD (don't overwrite existing)
  const desired: Record<string, unknown> = {
    Slug: { rich_text: {} },
    Description: { rich_text: {} },
    Category: {
      select: {
        options: [
          { name: "insurance", color: "gray" },
          { name: "taxes", color: "brown" },
          { name: "real-estate", color: "orange" },
          { name: "immigration", color: "yellow" },
          { name: "tech", color: "green" },
          { name: "life", color: "blue" },
        ],
      },
    },
    Date: { date: {} },
    "Read Time": { number: { format: "number" } },
    Status: {
      select: {
        options: [
          { name: "published", color: "green" },
          { name: "trending", color: "blue" },
          { name: "live", color: "purple" },
        ],
      },
    },
    "Reel URL": { url: {} },
    "Video URL": { url: {} },
    Image: { url: {} },
    "Is Dashboard": { checkbox: {} },
    "Dashboard Src": { rich_text: {} },
    Published: { checkbox: {} },
  };

  // Ensure there is a Title (title) property — Notion has exactly one title; it might be "Name"
  const props = db.properties as Record<string, { type?: string }>;
  const titleKey = Object.keys(props ?? {}).find((k) => props[k]?.type === "title");
  if (titleKey && titleKey !== "Title") {
    // Rename to "Title" so sync script finds it
    (desired as Record<string, unknown>)[titleKey] = { name: "Title" };
  }
  if (titleKey) {
    delete desired["Title"];
  }

  const toAdd: Record<string, unknown> = {};
  if (titleKey && titleKey !== "Title") {
    toAdd[titleKey] = { name: "Title" };
  }
  for (const [name, schema] of Object.entries(desired)) {
    if (name === "Title" || existingProps.includes(name)) continue;
    toAdd[name] = schema;
  }

  if (Object.keys(toAdd).length > 0) {
    console.log("Adding properties:", Object.keys(toAdd).join(", "));
    await notionFetch(`/databases/${NOTION_DATABASE_ID}`, {
      method: "PATCH",
      body: { properties: toAdd },
    });
    console.log("Database schema updated.");
  } else {
    console.log("No new properties to add (all already exist).");
  }

  // 3) Create 2 sample pages
  const today = new Date().toISOString().slice(0, 10);

  const sample1 = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Title: {
        title: [{ text: { content: "My First Post" } }],
      },
      Slug: { rich_text: [{ text: { content: "my-first-post" } }] },
      Description: {
        rich_text: [{ text: { content: "A short description of the first sample post." } }],
      },
      Category: { select: { name: "tech" } },
      Date: { date: { start: today } },
      "Read Time": { number: 5 },
      Status: { select: { name: "published" } },
      Published: { checkbox: true },
    },
  };

  const sample2 = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Title: {
        title: [{ text: { content: "Understanding Taxes for Freelancers" } }],
      },
      Slug: { rich_text: [{ text: { content: "taxes-for-freelancers" } }] },
      Description: {
        rich_text: [{ text: { content: "Quick guide to tax basics when you're self-employed." } }],
      },
      Category: { select: { name: "taxes" } },
      Date: { date: { start: today } },
      "Read Time": { number: 8 },
      Status: { select: { name: "published" } },
      Published: { checkbox: true },
    },
  };

  console.log("Creating sample page 1: My First Post...");
  const res1 = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sample1),
  });
  if (!res1.ok) {
    throw new Error(`Create page 1: ${res1.status} ${await res1.text()}`);
  }
  console.log("  Created:", (await res1.json()).url);

  console.log("Creating sample page 2: Understanding Taxes for Freelancers...");
  const res2 = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sample2),
  });
  if (!res2.ok) {
    throw new Error(`Create page 2: ${res2.status} ${await res2.text()}`);
  }
  console.log("  Created:", (await res2.json()).url);

  console.log("\nDone. You can run `npm run notion:sync` to sync these into Postgres.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

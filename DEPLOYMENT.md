# Production deployment

## Environment variables

Set these in your host (Vercel, Netlify, etc.) before deploying. Copy from `.env.example` and fill in real values.

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Postgres connection string used by Prisma. Point to your VPS Postgres instance. |
| `NOTION_TOKEN` | For CMS | Notion internal integration token. Create at https://www.notion.so/my-integrations. |
| `NOTION_DATABASE_ID` | For CMS | The 32-char hex ID of your Notion posts database. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL (e.g. `https://thepuneetstory.com`). Used by sitemap and OG. Defaults to `https://thepuneetstory.com` in sitemap if unset. |
| `RESEND_API_KEY` | For newsletter | Resend API key. Without it, subscribe still returns 200 but does not add contacts. |
| `RESEND_SEGMENT_ID` | For newsletter | Prefer over `RESEND_AUDIENCE_ID`. Create a segment in Resend and paste the ID. |
| `RESEND_AUDIENCE_ID` | Optional | Legacy; use `RESEND_SEGMENT_ID` if possible. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional | reCAPTCHA v3 site key for form spam protection. |
| `RECAPTCHA_SECRET_KEY` | If using reCAPTCHA | Server-side reCAPTCHA secret. |
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). |

### VPS Postgres (209.127.14.218)

Use this format (database `thepuneetstory`, user `puneetstory`):

```
DATABASE_URL=postgresql://puneetstory:YOUR_PASSWORD@209.127.14.218:5432/thepuneetstory
```

**Remote access:** Postgres must accept connections from the internet (or at least from Vercel’s IPs). On the VPS:

1. In `postgresql.conf`: set `listen_addresses = '*'` (or your server’s IP).
2. In `pg_hba.conf`: add a line like `host thepuneetstory puneetstory 0.0.0.0/0 scram-sha-256` (or restrict to Vercel IPs for better security).
3. Restart Postgres and ensure port 5432 is open in the firewall.

Then run migrations against the VPS: `npx prisma migrate deploy` (with `DATABASE_URL` set).

## Build and run

- **Node**: 18.18+ (set in `package.json` `engines`).
- **Database**: Postgres 16+ reachable via `DATABASE_URL`.
- **Migrate**: `npx prisma migrate dev` for local development or `npx prisma migrate deploy` in production.
- **Seed**: `npx prisma db seed` (or `npm run db:seed`) to load the current post catalog from the hardcoded array.
- **Notion sync**: `npm run notion:sync` to pull published posts from your Notion database into Postgres.
- **Build**: `npm run build` (runs `next build` then `next-sitemap` for sitemap/robots).
- **Start**: `npm start` (production server).

## Notion CMS workflow

Posts are managed in a Notion database and synced into Postgres. The article body content is fetched live from Notion at render time.

### Setup

1. Create a Notion integration at https://www.notion.so/my-integrations and copy the token.
2. Create a Notion database with these properties:
   - **Title** (title) — post title
   - **Slug** (rich_text) — URL slug (required, unique)
   - **Description** (rich_text) — short description
   - **Category** (select) — insurance, taxes, real-estate, immigration, tech, life
   - **Date** (date) — publish date
   - **Read Time** (number) — estimated read time in minutes
   - **Status** (select) — published, trending, or live
   - **Reel URL** (url) — TikTok / reel link
   - **Video URL** (url) — video link
   - **Image** (url) — cover image URL
   - **Is Dashboard** (checkbox) — whether the post has an interactive dashboard
   - **Dashboard Src** (rich_text) — path to dashboard HTML
   - **Published** (checkbox) — only published pages get synced
3. Share the database with your integration (click "..." → "Connections" → add your integration).
4. Copy the database ID from the URL (32-character hex after the workspace name).
5. Set `NOTION_TOKEN` and `NOTION_DATABASE_ID` in your env.

### Syncing posts

```bash
npm run notion:sync
```

This reads all pages marked **Published** in your Notion database and upserts them into Postgres. The Notion page ID is stored so the app can fetch article content (blocks) at render time.

### Content rendering

- If a post has a `notionPageId`, the article body is rendered from Notion blocks (headings, paragraphs, lists, images, tables, code, callouts, etc.).
- If no `notionPageId` exists (e.g. seeded posts), a fallback template is shown.
- Post metadata (title, slug, category, etc.) always comes from Prisma/Postgres.

## Local Docker workflow (optional)

1. Start Postgres: `docker compose up -d db`
2. Apply schema: `npx prisma migrate dev`
3. Seed posts: `npx prisma db seed`
4. Run the app locally: `npm run dev`

## Host-specific notes

### Vercel

1. Connect the repo and set env vars in Project → Settings → Environment Variables.
2. Provision a Postgres database and set `DATABASE_URL`.
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL so sitemap and OG use it.
4. Build command: `npm run build` (default). Output: default Next.js (no `output: 'export'`).

### Netlify

1. Provision a Postgres database and set `DATABASE_URL`.
2. Build command: `npm run build`.
3. Publish directory: `.next` (use Netlify’s Next.js runtime; do not use `out` unless you switch to static export).
4. Add env vars in Site → Environment variables.

### Other hosts

- Use Node 18+.
- Use a managed Postgres instance and set `DATABASE_URL`.
- Run `npx prisma migrate deploy` before starting the app.
- Run `npm run build` then `npm start`, or use the host’s Next.js support if available.
- Ensure `NEXT_PUBLIC_*` vars are set at build time.

## Post-deploy checks

- [ ] Homepage and key routes load (/, /topics, /about, /newsletter, /post/[slug]).
- [ ] `/feed.xml` returns valid RSS.
- [ ] `/sitemap.xml` and `/robots.txt` exist (generated at build).
- [ ] Newsletter form: submit and confirm Resend receives the contact (if configured).
- [ ] OG/Twitter cards: test with [opengraph.xyz](https://www.opengraph.xyz/) or similar.

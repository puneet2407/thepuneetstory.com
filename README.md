This is the **Next.js version of The Puneet Story** personal brand website.

It lives in the `next-brand-site` folder inside your workspace.

### Run the Next.js site locally

From the project root:

```bash
cd next-brand-site
npm install        # only needed once
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Main routes

- `/` — home page (hero, topics overview, latest content, email banner)
- `/about` — your story and values
- `/topics` — all posts with category filter
- `/newsletter` — newsletter landing and signup flow
- `/post/[slug]` — individual post/detail pages powered by `src/lib/data.ts`

You can customize content and structure in:

- `src/app/page.tsx` and other files under `src/app/**`
- shared components under `src/components/**`
- post data and categories in `src/lib/data.ts`

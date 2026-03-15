import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, LayoutDashboard } from "lucide-react";
import { DashboardEmbed } from "@/components/DashboardEmbed";
import { EmailCapture } from "@/components/EmailCapture";
import { GtmArticleView } from "@/components/GtmArticleView";
import { NotionBlocks } from "@/components/NotionBlocks";
import type { NotionBlock } from "@/lib/notion";
import { getPostBySlug } from "@/lib/data";
import { categories } from "@/lib/post-types";
import { site, person } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function PostJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Person",
      name: person.name,
      url: `${site.url}/about`,
    },
    publisher: {
      "@type": "Person",
      name: person.name,
    },
    url: `${site.url}/post/${slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleDivider() {
  return (
    <div className="article-divider" aria-hidden="true">
      <span>·</span>
      <span>·</span>
      <span>·</span>
    </div>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const categoryLabel = categories.find((c) => c.value === post.category)
    ?.label;
  const initial = (person.name?.trim()?.charAt(0) || "•").toUpperCase();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = post.readTime ?? 5;

  const notionBlocks = (post.contentBlocks ?? []) as (NotionBlock & {
    _children?: NotionBlock[];
  })[];
  const hasNotionContent = notionBlocks.length > 0;

  return (
    <div className="min-h-screen bg-warm-paper">
      <PostJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={post.slug}
      />
      <GtmArticleView
        slug={post.slug}
        title={post.title}
        category={categoryLabel}
      />

      <article className="max-w-[728px] mx-auto px-6 sm:px-8 pt-10 pb-20">
        {/* Title */}
        <h1 className="font-[family-name:var(--font-serif)] text-[32px] sm:text-[40px] md:text-[46px] font-bold leading-[1.12] tracking-[-0.016em] mb-4 text-[#292929]">
          {post.title}
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] sm:text-[22px] leading-[1.44] text-[#757575] mb-8">
          {post.description}
        </p>

        {/* Author byline */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/about"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground font-semibold"
            style={{ width: 44, height: 44 }}
            aria-hidden="true"
          >
            {initial}
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                href="/about"
                className="text-base font-medium text-[#292929] hover:underline"
              >
                {person.name}
              </Link>
              {post.reelUrl && (
                <>
                  <span className="text-[#757575]">·</span>
                  <a
                    href={post.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-pine hover:underline inline-flex items-center gap-1"
                  >
                    Follow
                  </a>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[15px] text-[#757575]">
              <span>{readTime} min read</span>
              <span>·</span>
              <span>{formattedDate}</span>
              {post.isDashboard && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Interactive
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar divider */}
        <div className="border-t border-b border-[rgba(0,0,0,0.06)] py-3 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#757575]">
            <span className="text-sm uppercase tracking-wider font-medium">
              {categoryLabel}
            </span>
          </div>
          {post.reelUrl && (
            <a
              href={post.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#757575] hover:text-[#292929] transition-colors inline-flex items-center gap-1"
            >
              TikTok
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Article body */}
        <div className="prose max-w-none">
          {hasNotionContent ? (
            <NotionBlocks blocks={notionBlocks} />
          ) : (
            <>
              <p>
                This is where the in-depth article content would live. Once
                connected to Notion, the full article will render here
                automatically. Each post expands on the short-form content
                shared on TikTok and Instagram, providing detailed guides,
                step-by-step instructions, and actionable insights.
              </p>

              <ArticleDivider />

              <h2>Key Takeaways</h2>
              <ul>
                <li>Detailed analysis and research-backed information</li>
                <li>Real-world examples from the Indian-Canadian community</li>
                <li>Actionable steps you can take today</li>
                <li>Links to official resources and tools</li>
              </ul>

              <ArticleDivider />

              <h2>Who This Is For</h2>
              <p>
                Whether you&apos;re new to Canada or have been here for years,
                this content is designed to help you navigate the complexities
                of {categoryLabel?.toLowerCase()} with confidence. I break down
                complex topics into digestible, practical advice you can use
                immediately.
              </p>
            </>
          )}

          {post.isDashboard && (
            <>
              <ArticleDivider />
              <DashboardEmbed
                title="Interactive Dashboard"
                description={
                  post.dashboardSrc
                    ? "Compare Ontario auto insurer rate changes. Filter, sort, and explore the data below."
                    : "Use the tools below to calculate, compare, or track your own data"
                }
              >
                {post.dashboardSrc ? (
                  <iframe
                    src={post.dashboardSrc}
                    title="Ontario Auto Insurance Rate Comparison Dashboard"
                    className="w-full min-h-[1400px] border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="bg-[#fafafa] rounded-lg p-8 my-8">
                    <LayoutDashboard className="w-12 h-12 text-[#757575] mx-auto mb-4" />
                    <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2">
                      Interactive Tool
                    </h3>
                    <p className="text-[#757575] text-base mb-4">
                      In a production environment, this would embed your custom
                      dashboard HTML.
                    </p>
                    <ul className="text-base space-y-1 text-[#757575]">
                      <li>Real-time calculations</li>
                      <li>Data visualization with charts</li>
                      <li>Comparison tools</li>
                      <li>Downloadable reports</li>
                    </ul>
                  </div>
                )}
              </DashboardEmbed>
            </>
          )}

          <ArticleDivider />

          <h3>Additional Resources</h3>
          <ul>
            {post.resources?.map((resource) => (
              <li key={resource.url}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ArticleDivider />

        {/* Disclaimer */}
        <aside className="text-[15px] text-[#757575] leading-relaxed font-[family-name:var(--font-sans)] border-t border-[rgba(0,0,0,0.06)] pt-6 mb-10">
          The content on this page is for informational and educational
          purposes only. It is not financial, legal, tax, or immigration
          advice. Always consult with qualified professionals for your
          specific situation.
        </aside>

        {/* Author footer */}
        <div className="border-t border-[rgba(0,0,0,0.06)] pt-8 mb-8">
          <div className="flex items-start gap-4">
            <Link
              href="/about"
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground font-semibold"
              style={{ width: 72, height: 72, fontSize: 26 }}
              aria-hidden="true"
            >
              {initial}
            </Link>
            <div>
              <p className="text-base font-medium text-[#292929] mb-1">
                Written by {person.name}
              </p>
              <p className="text-[15px] text-[#757575] leading-relaxed mb-3">
                {person.bio}
              </p>
              <Link
                href="/about"
                className="inline-block text-base font-medium text-pine hover:underline"
              >
                More from {person.name}
              </Link>
            </div>
          </div>
        </div>

        <EmailCapture variant="inline" />
      </article>
    </div>
  );
}

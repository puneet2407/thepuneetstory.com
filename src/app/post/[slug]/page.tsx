import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardEmbed } from "@/components/DashboardEmbed";
import { EmailCapture } from "@/components/EmailCapture";
import { getPostBySlug, categories, posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
      name: "Puneet",
      url: "https://thepuneetstory.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Puneet",
    },
    url: `https://thepuneetstory.com/post/${slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const categoryLabel = categories.find((c) => c.value === post.category)
    ?.label;

  return (
    <div className="min-h-screen">
      <PostJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={post.slug}
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-8 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="gap-2 mb-6 -ml-4 hover:bg-transparent"
          >
            <Link href="/topics">
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </Link>
          </Button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {categoryLabel}
            </Badge>
            {post.isDashboard && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <LayoutDashboard className="w-4 h-4" />
                <span>Interactive Dashboard</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl mb-4">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-6">
            {post.description}
          </p>

          {/* Date & Social */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {post.reelUrl && (
              <a
                href={post.reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                Watch on TikTok
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none mb-12">
            {/* Main Content */}
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2>Overview</h2>
              <p>
                This is where the in-depth article content would live. In a real
                implementation, this would be pulled from MDX files or a CMS.
                Each post expands on the short-form content shared on TikTok and
                Instagram, providing detailed guides, step-by-step instructions,
                and actionable insights.
              </p>

              <h3>Key Takeaways</h3>
              <ul>
                <li>Detailed analysis and research-backed information</li>
                <li>Real-world examples from the Indian-Canadian community</li>
                <li>Actionable steps you can take today</li>
                <li>Links to official resources and tools</li>
              </ul>

              <h3>Who This Is For</h3>
              <p>
                Whether you&apos;re new to Canada or have been here for years,
                this content is designed to help you navigate the complexities of{" "}
                {categoryLabel?.toLowerCase()} with confidence. I break down
                complex topics into digestible, practical advice you can use
                immediately.
              </p>
            </div>

            {/* Dashboard Section (if applicable) */}
            {post.isDashboard && (
              <DashboardEmbed
                title="Interactive Dashboard"
                description="Use the tools below to calculate, compare, or track your own data"
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 text-center">
                  <LayoutDashboard className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2">
                    Interactive Tool
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    In a production environment, this would embed your custom
                    dashboard HTML. For now, this is a placeholder showing where
                    your interactive tools would live.
                  </p>
                  <div className="inline-block bg-card border border-border rounded-lg p-6 text-left">
                    <p className="text-sm mb-2">
                      <strong className="font-mono text-primary">
                        Example:
                      </strong>{" "}
                      Dashboard features
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Real-time calculations</li>
                      <li>• Data visualization with charts</li>
                      <li>• Comparison tools</li>
                      <li>• Downloadable reports</li>
                    </ul>
                  </div>
                </div>
              </DashboardEmbed>
            )}

            {/* Additional Resources */}
            <div className="bg-secondary/50 border-l-4 border-primary rounded-lg p-6 my-8">
              <h4 className="font-[family-name:var(--font-serif)] text-lg mb-2">
                Additional Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Official Government Resource
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Community Discussion Thread
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Related Calculator Tool
                  </a>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-muted rounded-lg p-6 text-sm">
              <p className="font-medium mb-2">Important Disclaimer</p>
              <p className="text-muted-foreground">
                The content on this page is for informational and educational
                purposes only. It is not financial, legal, tax, or immigration
                advice. Always consult with qualified professionals for your
                specific situation.
              </p>
            </div>
          </article>

          {/* Email Capture */}
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}

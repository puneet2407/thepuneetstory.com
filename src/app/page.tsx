import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { EmailCapture } from "@/components/EmailCapture";
import { getLatestPosts } from "@/lib/data";
import { person, home } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getLatestPosts(7);
  const [featuredPost, ...restPosts] = posts;
  const initial = (person.name?.trim()?.charAt(0) || "•").toUpperCase();

  return (
    <div className="min-h-screen bg-warm-paper">
      {/* Hero — single-column editorial intro */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-[728px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-[13px] font-medium text-pine uppercase tracking-widest mb-4 kinetic-fade">
            {home.heroBadge}
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[36px] sm:text-[44px] md:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] mb-5 kinetic-fade kinetic-fade-delay-1">
            {home.heroTitle}
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 kinetic-fade kinetic-fade-delay-2">
            {home.heroSubtext}
          </p>

          {/* Author line */}
          <div className="flex items-center gap-3 kinetic-fade kinetic-fade-delay-3">
            <span
              className="inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground font-semibold"
              style={{ width: 40, height: 40 }}
              aria-hidden="true"
            >
              {initial}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {person.name}
              </p>
              <p className="text-[13px] text-muted-foreground">
                {person.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured story */}
      {featuredPost && (
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[728px] mx-auto">
            <PostCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Stories feed */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[728px] mx-auto">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* More link */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[728px] mx-auto">
          <Link
            href="/topics"
            className="text-pine hover:text-pine-light text-sm font-medium transition-colors"
          >
            See all stories →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#e5e5e5]">
        <div className="max-w-[728px] mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}

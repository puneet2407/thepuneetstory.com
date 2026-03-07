import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Clock, Globe, FileText, Users } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { EmailCapture } from "@/components/EmailCapture";
import { getLatestPosts } from "@/lib/data";
import { person, home, dashboardStats } from "@/lib/site";

const statItems = [
  { label: "Total Views", value: dashboardStats.totalViews, icon: Eye },
  { label: "Engagement", value: dashboardStats.totalEngagement, icon: Heart },
  {
    label: "Avg Watch",
    value: dashboardStats.avgWatchTime,
    icon: Clock,
  },
  {
    label: "Subscribers",
    value: dashboardStats.subscriberCount,
    icon: Users,
  },
  {
    label: "Stories",
    value: dashboardStats.postsPublished,
    icon: FileText,
  },
  {
    label: "Countries",
    value: dashboardStats.countriesReached,
    icon: Globe,
  },
];

export default async function Home() {
  const posts = await getLatestPosts(7);
  const [featuredPost, ...restPosts] = posts;

  return (
    <div className="min-h-screen bg-warm-paper">
      {/* Hero — Featured Reel with serif headline overlay */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
            {/* Left — Editorial intro */}
            <div>
              <p className="text-[13px] font-medium text-pine uppercase tracking-widest mb-4 kinetic-fade">
                Canadian Creator Studio
              </p>
              <h1 className="font-[family-name:var(--font-serif)] text-[36px] sm:text-[44px] md:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] mb-5 kinetic-fade kinetic-fade-delay-1">
                {home.heroTitle}
              </h1>
              <p className="font-[family-name:var(--font-serif)] text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-6 kinetic-fade kinetic-fade-delay-2">
                {home.heroSubtext}
              </p>

              {/* Author line */}
              <div className="flex items-center gap-3 kinetic-fade kinetic-fade-delay-3">
                <Image
                  src={person.imageUrl}
                  alt={person.imageAlt}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  style={{ width: 40, height: 40 }}
                />
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

            {/* Right — Bento Grid Analytics */}
            <aside className="hidden lg:block">
              <div className="bento-grid grid-cols-2 rounded-lg border border-[#e5e5e5]">
                {statItems.map((stat) => (
                  <div key={stat.label} className="bento-cell">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <stat.icon className="w-3.5 h-3.5 text-pine" />
                      <span className="bento-label">{stat.label}</span>
                    </div>
                    <p className="bento-value">{stat.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Mobile Bento Grid */}
      <section className="lg:hidden px-4 sm:px-6 py-6 border-b border-[#e5e5e5]">
        <div className="bento-grid grid-cols-3 rounded-lg border border-[#e5e5e5] max-w-[600px] mx-auto">
          {statItems.slice(0, 3).map((stat) => (
            <div key={stat.label} className="bento-cell text-center">
              <p className="bento-value text-lg">{stat.value}</p>
              <p className="bento-label">{stat.label}</p>
            </div>
          ))}
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

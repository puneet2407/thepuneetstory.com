"use client";

import { useRef } from "react";
import Link from "next/link";
import { Play, BarChart3 } from "lucide-react";
import type { Post } from "@/lib/post-types";
import { categories } from "@/lib/post-types";
import { person } from "@/lib/site";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

function StatusBadge({ status }: { status: Post["status"] }) {
  if (status === "live") return <span className="badge-live">Live</span>;
  if (status === "trending")
    return <span className="badge-trending">Trending in Canada</span>;
  return null;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const categoryLabel = categories.find((c) => c.value === post.category)
    ?.label;
  const initial = (person.name?.trim()?.charAt(0) || "•").toUpperCase();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const readTime = post.readTime ?? 5;

  if (featured) {
    return (
      <article className="py-10 md:py-14 border-b border-border kinetic-fade">
        <Link href={`/post/${post.slug}`} className="group block">
          {/* Featured reel thumbnail */}
          {post.videoUrl && (
            <div
              ref={videoRef}
              className="video-card relative aspect-[16/9] bg-[#1a1a1a] mb-6 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-[#292929] ml-1" />
                </div>
              </div>
              <div className="video-overlay" />
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                {post.status && <StatusBadge status={post.status} />}
                {post.isDashboard && (
                  <span className="inline-flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/40 rounded-full px-2.5 py-1">
                    <BarChart3 className="w-3 h-3" />
                    Interactive
                  </span>
                )}
              </div>
              {/* Serif headline overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white drop-shadow-lg">
                  {post.title}
                </h2>
              </div>
            </div>
          )}

          {!post.videoUrl && (
            <>
              {post.status && (
                <div className="mb-3">
                  <StatusBadge status={post.status} />
                </div>
              )}
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 group-hover:text-pine transition-colors">
                {post.title}
              </h2>
            </>
          )}

          <p className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground font-semibold"
              style={{ width: 24, height: 24 }}
              aria-hidden="true"
            >
              {initial}
            </span>
            <span className="font-medium text-foreground">{person.name}</span>
            <span>·</span>
            <span>{categoryLabel}</span>
            <span>·</span>
            <span>{readTime} min read</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="py-7 border-b border-border last:border-b-0 kinetic-fade">
      <Link href={`/post/${post.slug}`} className="group flex gap-6">
        {/* Text side — left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground font-semibold"
              style={{ width: 20, height: 20, fontSize: 12 }}
              aria-hidden="true"
            >
              {initial}
            </span>
            <span className="text-[13px] font-medium text-foreground">
              {person.name}
            </span>
            {post.status && (
              <>
                <span className="text-[13px] text-muted-foreground">·</span>
                <StatusBadge status={post.status} />
              </>
            )}
          </div>

          <h3 className="font-[family-name:var(--font-serif)] text-lg md:text-xl font-bold leading-snug mb-1.5 group-hover:text-pine transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="font-[family-name:var(--font-serif)] text-muted-foreground text-[15px] leading-relaxed line-clamp-2 mb-3">
            {post.description}
          </p>

          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span>{categoryLabel}</span>
            <span>·</span>
            <span>{readTime} min read</span>
            <span>·</span>
            <span>{formattedDate}</span>
            {post.isDashboard && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Interactive
                </span>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail / video preview — right */}
        <div className="hidden sm:block shrink-0 w-[120px] h-[120px] md:w-[150px] md:h-[120px]">
          <div className="video-card relative w-full h-full bg-[#f0eeeb] rounded-sm overflow-hidden">
            {post.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            )}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <span className="font-[family-name:var(--font-serif)] text-2xl font-bold text-foreground/20">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

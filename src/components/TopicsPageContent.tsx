"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmailCapture } from "@/components/EmailCapture";
import type { Category, Post } from "@/lib/post-types";

interface TopicsPageContentProps {
  posts: Post[];
}

export function TopicsPageContent({ posts }: TopicsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className="min-h-screen bg-warm-paper">
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[728px] mx-auto">
          <h1 className="font-[family-name:var(--font-serif)] text-[36px] md:text-[44px] font-bold leading-[1.12] tracking-[-0.016em] mb-3 kinetic-fade">
            All stories
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-lg text-muted-foreground leading-relaxed kinetic-fade kinetic-fade-delay-1">
            Browse guides, dashboards, and insights by category.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[728px] mx-auto">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[728px] mx-auto">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-muted-foreground py-12 font-[family-name:var(--font-serif)]">
              No stories in this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#e5e5e5]">
        <div className="max-w-[728px] mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}

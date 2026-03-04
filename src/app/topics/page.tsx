"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmailCapture } from "@/components/EmailCapture";
import type { Category } from "@/lib/data";
import { posts } from "@/lib/data";

export default function TopicsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-4">
            All Topics
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse guides, dashboards, and insights organized by category. Each
            piece links back to the original reel on TikTok or Instagram.
          </p>
        </div>
      </section>

      {/* Filter & Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "result" : "results"}
            {selectedCategory !== "all" &&
              ` in ${selectedCategory.replace("-", " ")}`}
          </p>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No posts found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 px-4 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}


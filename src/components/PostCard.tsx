import Link from "next/link";
import { ArrowRight, LayoutDashboard, ExternalLink } from "lucide-react";
import { Post, categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const categoryLabel = categories.find((c) => c.value === post.category)
    ?.label;

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Category badge & Date */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            {categoryLabel}
          </Badge>
          {post.isDashboard && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <LayoutDashboard className="w-3 h-3" />
              <span>Dashboard</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-serif)] text-xl mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Date */}
        <p className="text-xs text-muted-foreground mb-4">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link href={`/post/${post.slug}`}>
            <Button size="sm" className="gap-2">
              Read More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          {post.reelUrl && (
            <a
              href={post.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Watch Reel
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}


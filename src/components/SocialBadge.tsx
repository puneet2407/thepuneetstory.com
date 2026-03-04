import { ExternalLink } from "lucide-react";

interface SocialBadgeProps {
  platform: "TikTok" | "Instagram";
  followers: string;
  url: string;
}

export function SocialBadge({ platform, followers, url }: SocialBadgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">As seen on</span>
        <span className="font-medium text-sm">{platform}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-mono text-sm text-primary">{followers}</span>
        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </a>
  );
}


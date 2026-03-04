import { LayoutDashboard } from "lucide-react";

interface DashboardEmbedProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DashboardEmbed({
  title,
  description,
  children,
}: DashboardEmbedProps) {
  return (
    <div className="bg-card border-2 border-primary/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-primary/20 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-serif)] text-lg">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}


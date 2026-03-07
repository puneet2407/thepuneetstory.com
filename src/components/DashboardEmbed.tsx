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
    <div className="my-10">
      <h4 className="font-[family-name:var(--font-serif)] text-lg font-bold mb-2">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      <div className="bg-secondary/50 rounded-lg overflow-hidden">{children}</div>
    </div>
  );
}

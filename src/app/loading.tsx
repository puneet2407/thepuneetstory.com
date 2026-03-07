export default function Loading() {
  return (
    <div className="min-h-screen bg-warm-paper">
      <section className="pt-12 pb-8 px-4 border-b border-border">
        <div className="max-w-[680px] mx-auto space-y-4">
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-6 w-full bg-muted rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
        </div>
      </section>
      <section className="px-4 py-10">
        <div className="max-w-[680px] mx-auto space-y-8">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-6 w-2/3 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </section>
    </div>
  );
}

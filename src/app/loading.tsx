export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-6 w-40 bg-muted rounded-full animate-pulse" />
              <div className="space-y-3">
                <div className="h-12 w-full bg-muted rounded animate-pulse" />
                <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-full bg-muted rounded animate-pulse" />
                <div className="h-5 w-5/6 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-36 bg-muted rounded-md animate-pulse" />
                <div className="h-10 w-36 bg-muted rounded-md animate-pulse" />
              </div>
            </div>
            <div className="aspect-[4/5] bg-muted rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <div className="h-10 w-48 bg-muted rounded mx-auto animate-pulse" />
            <div className="h-5 w-96 max-w-full bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-6 space-y-3"
              >
                <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

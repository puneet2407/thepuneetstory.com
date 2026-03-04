"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-serif)] text-6xl text-destructive mb-4">
            Oops
          </h1>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again, or go back to the
            home page.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-serif)] text-8xl text-primary mb-4">
            404
          </h1>
          <h2 className="font-[family-name:var(--font-serif)] text-2xl mb-2">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gap-2 w-full sm:w-auto">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
            <Link href="/topics">
              <Search className="w-4 h-4" />
              Browse Topics
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


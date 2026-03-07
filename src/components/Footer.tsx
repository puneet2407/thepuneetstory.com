import Link from "next/link";
import { site, social } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] mt-16 bg-warm-paper">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-serif)] text-xl text-foreground hover:opacity-80 transition-opacity"
            >
              {site.brandName}
            </Link>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[13px]">
            <Link
              href="/topics"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              About
            </Link>
            <Link
              href="/newsletter"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/feed.xml"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              RSS
            </Link>
            {social.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pine transition-colors"
              >
                {link.platform}
              </a>
            ))}
            <Link
              href="/disclaimer"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-muted-foreground hover:text-pine transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#e5e5e5] text-[13px] text-muted-foreground">
          <p>&copy; {currentYear} {site.brandName}</p>
          <p className="mt-1">
            Not financial, legal, or immigration advice. Consult professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}

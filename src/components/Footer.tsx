import { Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2332] text-[#faf8f5] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-[#f59e0b]" />
              <span className="font-[family-name:var(--font-serif)] text-xl">
                The Puneet Story
              </span>
            </div>
            <p className="text-[#faf8f5]/70 text-sm max-w-md">
              Real Canada. Real Talk. Helping the Indian-Canadian community
              navigate insurance, taxes, real estate, immigration, tech, and
              daily life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/topics"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  All Topics
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h4 className="font-medium mb-4">Follow Me</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://tiktok.com/@thepuneetstory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/thepuneetstory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>

            <h4 className="font-medium mb-4 mt-6">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/disclaimer"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-[#faf8f5]/70 hover:text-[#f59e0b] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#faf8f5]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#faf8f5]/60">
            <p>&copy; {currentYear} The Puneet Story. All rights reserved.</p>
            <p className="text-center md:text-right">
              <strong>Disclaimer:</strong> Not financial, legal, or immigration
              advice. Always consult professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

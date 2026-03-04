import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Home as HomeIcon,
  Plane,
  Code,
  Coffee,
} from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { SocialBadge } from "@/components/SocialBadge";
import { EmailCapture } from "@/components/EmailCapture";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/data";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export default function Home() {
  const latestPosts = getLatestPosts(6);

  const features = [
    {
      icon: Shield,
      title: "Insurance",
      description: "Navigate car, home, and health insurance",
    },
    { icon: TrendingUp, title: "Taxes", description: "Maximize returns, understand credits" },
    {
      icon: HomeIcon,
      title: "Real Estate",
      description: "Buy, rent, invest with confidence",
    },
    {
      icon: Plane,
      title: "Immigration",
      description: "PR, visas, and settlement tips",
    },
    {
      icon: Code,
      title: "Tech",
      description: "Jobs, salaries, and career growth",
    },
    {
      icon: Coffee,
      title: "Life",
      description: "Daily life in the Great White North",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-6">
                Real Canada. Real Talk.
              </div>
              <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Your Guide to Life in Canada
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                From insurance and taxes to real estate and immigration—get the
                insights you need as an Indian-Canadian. Backed by real
                experience, powered by community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                  <Link href="/topics">
                    Explore Topics
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link href="/newsletter">Join Newsletter</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <SocialBadge
                  platform="TikTok"
                  followers="125K+"
                  url="https://tiktok.com/@thepuneetstory"
                />
                <SocialBadge
                  platform="Instagram"
                  followers="89K+"
                  url="https://instagram.com/thepuneetstory"
                />
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758788505847-d0d2b1bf8d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBDYW5hZGlhbiUyMG1hbiUyMGNhbWVyYSUyMGNvbnRlbnQlMjBjcmVhdG9yfGVufDF8fHx8MTc3MjY1NTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Puneet - Content Creator"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a2332]/90 to-transparent p-6 text-white">
                  <p className="text-sm opacity-90">Shot on Sony A7III</p>
                  <p className="font-[family-name:var(--font-serif)] text-xl">
                    @thepuneetstory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-4">
              What I Cover
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real, useful topics for the Indian-Canadian community. Each video
              links to deeper content, dashboards, and tools.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-16 px-4 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-2">
                Latest Content
              </h2>
              <p className="text-muted-foreground">
                From quick reels to deep dives—always something new
              </p>
            </div>
            <div className="hidden sm:block">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/topics">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="sm:hidden">
            <Button asChild variant="outline" className="gap-2 w-full">
              <Link href="/topics">
                View All Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Email Signup Banner */}
      <EmailCapture variant="banner" />

      {/* Trust Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl mb-4">
            Why Trust The Puneet Story?
          </h2>
          <p className="text-muted-foreground mb-8">
            I&apos;m an Indian immigrant living in Canada, creating content on
            what actually matters. Every video is backed by research, real
            experience, and conversations with professionals. I&apos;m not a
            financial advisor—I&apos;m someone who&apos;s been through it and
            wants to help others do the same.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Read My Story</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


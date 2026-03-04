import type { Metadata } from "next";
import { Camera, MapPin, Heart, Target } from "lucide-react";
import { SocialBadge } from "@/components/SocialBadge";
import { EmailCapture } from "@/components/EmailCapture";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi, I'm Puneet — Indian immigrant, content creator, your guide to real life in Canada.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758788505847-d0d2b1bf8d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBDYW5hZGlhbiUyMG1hbiUyMGNhbWVyYSUyMGNvbnRlbnQlMjBjcmVhdG9yfGVufDF8fHx8MTc3MjY1NTI0N3ww&ixlib=rb-4.1.0&q=80&w=400"
              alt="Puneet"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-4">
            Hi, I&apos;m Puneet
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Indian immigrant. Content creator. Your guide to real life in
            Canada.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-[family-name:var(--font-serif)] text-3xl mb-6">
              My Story
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              I moved to Canada from India with big dreams, a suitcase full of
              clothes, and absolutely no idea how car insurance worked here. Or
              taxes. Or how to buy a house. Or navigate the immigration system
              while helping my family back home understand what PR actually
              means.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The first few years were tough. I made expensive mistakes—
              overpaying for insurance because I didn&apos;t know better,
              missing out on tax credits, and spending hours Googling basic
              questions that had no clear answers for someone in my situation.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              That&apos;s when I realized:{" "}
              <strong>
                there was no single place where the Indian-Canadian community
                could get real, practical, trustworthy information.
              </strong>{" "}
              No one was talking about the stuff that actually matters when
              you&apos;re trying to build a life here.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              So I started creating content. What began as simple TikTok videos
              about insurance has grown into a community of hundreds of
              thousands of people who trust me to break down complex topics
              into something digestible, actionable, and real.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 my-8">
              <p className="text-muted-foreground italic">
                &quot;I&apos;m not a financial advisor, immigration lawyer, or
                tax expert. I&apos;m just someone who&apos;s been through it,
                learned the hard way, and wants to help others avoid the same
                mistakes.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 px-4 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-center mb-12">
            What I Do
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Content Creation
              </h3>
              <p className="text-muted-foreground">
                I create short-form videos on TikTok and Instagram covering
                insurance, taxes, real estate, immigration, tech careers, and
                daily life in Canada. Shot on my Sony A7III with real
                production value.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Deep Dives
              </h3>
              <p className="text-muted-foreground">
                Each video links to in-depth articles and interactive
                dashboards on this website. Want to compare insurance rates?
                Calculate your CRS score? It&apos;s all here.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Community Building
              </h3>
              <p className="text-muted-foreground">
                Through my newsletter and social channels, I&apos;m building a
                community of Indian-Canadians who support each other, share
                knowledge, and navigate life here together.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Local Focus
              </h3>
              <p className="text-muted-foreground">
                Based in Ontario, I focus on Canada-wide topics with special
                attention to GTA life, Toronto resources, and provincial
                nuances that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-center mb-12">
            My Values
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-medium text-lg mb-2">Real Over Perfect</h3>
              <p className="text-muted-foreground">
                I&apos;d rather give you honest, practical advice than
                perfectly polished corporate speak. This is real life, not a
                brochure.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-medium text-lg mb-2">Community First</h3>
              <p className="text-muted-foreground">
                Everything I create is for the Indian-Canadian community. Your
                questions shape my content. Your feedback makes it better.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-medium text-lg mb-2">Always Learning</h3>
              <p className="text-muted-foreground">
                I&apos;m not an expert in everything. I&apos;m a researcher, a
                storyteller, and someone who talks to professionals so you
                don&apos;t have to. If I don&apos;t know something, I&apos;ll
                tell you.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-medium text-lg mb-2">No BS</h3>
              <p className="text-muted-foreground">
                I&apos;ll never sell you something just because it pays well.
                If a product or service is worth recommending, I&apos;ll
                explain why. If it&apos;s not, I&apos;ll stay silent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}


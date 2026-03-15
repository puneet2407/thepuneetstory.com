import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { person, social, about } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Hi, I'm ${person.name} — ${person.bio}`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const initial = (person.name?.trim()?.charAt(0) || "•").toUpperCase();
  return (
    <div className="min-h-screen bg-warm-paper">
      <section className="pt-12 pb-16 px-4">
        <div className="max-w-[680px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div
              className="flex-shrink-0 w-24 h-24 rounded-full bg-foreground/10 text-foreground font-semibold flex items-center justify-center"
              aria-hidden="true"
              style={{ fontSize: 32 }}
            >
              {initial}
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold leading-tight mb-4">
                Hi, I&apos;m {person.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {person.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                {social.links.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--link)] hover:underline"
                  >
                    {link.platform} ({link.followers})
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-8">
            My Story
          </h2>
          <div className="space-y-6">
            {about.storyParagraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <blockquote className="border-l-4 border-foreground pl-6 my-10 italic text-muted-foreground">
            &quot;{about.quote}&quot;
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-8">
            What I Do
          </h2>
          <div className="space-y-8">
            {about.whatIDo.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-8">
            My Values
          </h2>
          <div className="space-y-6">
            {about.values.map((v) => (
              <div key={v.title}>
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-[680px] mx-auto">
          <EmailCapture variant="inline" />
        </div>
      </section>
    </div>
  );
}

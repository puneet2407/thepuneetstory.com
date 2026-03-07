import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimer for The Puneet Story content. Not financial, legal, or immigration advice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[680px] mx-auto prose prose-lg">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl mb-8">
          Disclaimer
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Last updated: March 2026
        </p>

        <h2>General Information</h2>
        <p>
          The content on The Puneet Story (thepuneetstory.com), including all
          articles, videos, dashboards, calculators, and tools, is provided
          for general informational and educational purposes only. Nothing on
          this website constitutes professional financial, legal, tax,
          immigration, or any other form of advice.
        </p>

        <h2>Not Professional Advice</h2>
        <p>
          The Puneet Story is not operated by a licensed financial advisor,
          accountant, lawyer, or immigration consultant. The information shared
          is based on personal experience, publicly available data, and
          conversations with professionals. It should not be used as a
          substitute for professional advice tailored to your specific
          situation.
        </p>

        <h2>No Guarantees</h2>
        <p>
          While I strive for accuracy, I make no representations or warranties
          about the completeness, accuracy, reliability, or suitability of the
          information. Insurance rates, tax rules, real estate markets, and
          immigration policies change frequently. Always verify current
          information with official sources or qualified professionals.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This website may contain links to external websites and resources. I
          do not control and am not responsible for the content or practices of
          any third-party sites. Links do not imply endorsement.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          Some content may include affiliate links. If you make a purchase
          through these links, I may earn a small commission at no additional
          cost to you. I only recommend products and services I genuinely
          believe are valuable to my audience.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, The Puneet Story and its
          creator shall not be held liable for any losses, damages, or
          negative outcomes resulting from reliance on the information provided
          on this website.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this disclaimer, please reach out via
          the contact information on the website or through social media
          channels.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for The Puneet Story website. By using this site you agree to these terms.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl mb-8">
          Terms of Use
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Last updated: March 2026
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using The Puneet Story (thepuneetstory.com), you
          accept and agree to be bound by these Terms of Use. If you do not
          agree, please do not use this website.
        </p>

        <h2>Use of Content</h2>
        <p>
          All content on this website — including text, videos, images,
          dashboards, calculators, and other materials — is owned by The Puneet
          Story or its content creators and is protected by copyright laws.
        </p>
        <p>You may:</p>
        <ul>
          <li>View and read content for personal, non-commercial use</li>
          <li>
            Share links to our content on social media with proper attribution
          </li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>
            Copy, reproduce, or redistribute content without written permission
          </li>
          <li>Use content for commercial purposes without authorization</li>
          <li>Remove any copyright or proprietary notices</li>
          <li>Frame or embed our website without permission</li>
        </ul>

        <h2>User Conduct</h2>
        <p>When using this website, you agree not to:</p>
        <ul>
          <li>
            Use the site in any way that violates applicable laws or regulations
          </li>
          <li>Attempt to gain unauthorized access to the website or servers</li>
          <li>Introduce viruses or other malicious code</li>
          <li>Scrape or harvest data from the website</li>
          <li>
            Interfere with other users&apos; ability to use the website
          </li>
        </ul>

        <h2>Newsletter</h2>
        <p>
          By subscribing to our newsletter, you consent to receive periodic
          emails from The Puneet Story. You may unsubscribe at any time using
          the link in any email. We will not sell or share your email address
          with third parties for marketing purposes.
        </p>

        <h2>Interactive Tools & Dashboards</h2>
        <p>
          Any calculators, dashboards, or interactive tools provided on this
          website are for informational purposes only. Results are estimates
          and should not be relied upon for financial, legal, or other
          decisions. See our{" "}
          <a href="/disclaimer" className="text-primary hover:underline">
            Disclaimer
          </a>{" "}
          for more details.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This website may contain links to third-party websites. We are not
          responsible for the content, privacy practices, or terms of any
          external sites.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          The Puneet Story and its creator shall not be liable for any direct,
          indirect, incidental, consequential, or punitive damages arising
          from your use of this website or reliance on its content.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will
          be effective immediately upon posting. Continued use of the website
          constitutes acceptance of the updated terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of the Province of Ontario, Canada.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, please contact us through our social
          media channels or the website.
        </p>
      </div>
    </div>
  );
}

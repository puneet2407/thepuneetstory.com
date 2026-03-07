import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for The Puneet Story. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[680px] mx-auto prose prose-lg">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl mb-8">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Last updated: March 2026
        </p>

        <h2>Introduction</h2>
        <p>
          The Puneet Story (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          operates the website thepuneetstory.com. This privacy policy explains
          how we collect, use, disclose, and safeguard your information when
          you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>
            <strong>Email address</strong> — when you subscribe to our
            newsletter
          </li>
          <li>
            <strong>Contact information</strong> — when you reach out via forms
            or social media
          </li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>
            <strong>Usage data</strong> — pages visited, time spent, referral
            source
          </li>
          <li>
            <strong>Device data</strong> — browser type, operating system,
            screen size
          </li>
          <li>
            <strong>IP address</strong> — for analytics and security purposes
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To send you our weekly newsletter (if you subscribed)</li>
          <li>To improve our website content and user experience</li>
          <li>To understand website traffic and trends</li>
          <li>To prevent abuse and maintain security</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We may use the following third-party services:</p>
        <ul>
          <li>
            <strong>Analytics</strong> — to understand how visitors use the site
          </li>
          <li>
            <strong>Email service</strong> — to manage newsletter subscriptions
          </li>
          <li>
            <strong>Content delivery</strong> — to serve images and assets
            efficiently
          </li>
        </ul>
        <p>
          Each third-party service has its own privacy policy governing data use.
        </p>

        <h2>Cookies</h2>
        <p>
          This website may use essential cookies to ensure proper functionality.
          We do not use tracking cookies for advertising purposes.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your email address for as long as you remain subscribed to
          our newsletter. You may unsubscribe at any time using the link in any
          newsletter email.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Unsubscribe from communications at any time</li>
        </ul>

        <h2>Children&apos;s Privacy</h2>
        <p>
          This website is not intended for individuals under the age of 13. We
          do not knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. The updated
          version will be indicated by the &quot;Last updated&quot; date at the
          top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please reach out via
          social media or the contact information on our website.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Join thousands of Indian-Canadians getting weekly tips on insurance, taxes, real estate, immigration, and life in Canada.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

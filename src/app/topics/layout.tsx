import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse guides, dashboards, and insights on insurance, taxes, real estate, immigration, tech, and life in Canada.",
  alternates: { canonical: "/topics" },
};

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

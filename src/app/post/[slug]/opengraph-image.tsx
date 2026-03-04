import { ImageResponse } from "next/og";
import { getPostBySlug, categories, posts } from "@/lib/data";

export const alt = "The Puneet Story";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#1a2332",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "48px",
          }}
        >
          Post Not Found
        </div>
      ),
      { ...size }
    );
  }

  const categoryLabel =
    categories.find((c) => c.value === post.category)?.label ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #faf8f5 0%, #f9fafb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                background: "#f59e0b",
                color: "white",
                padding: "6px 16px",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {categoryLabel}
            </span>
            {post.isDashboard && (
              <span
                style={{
                  background: "#e5e7eb",
                  color: "#1a2332",
                  padding: "6px 16px",
                  borderRadius: "16px",
                  fontSize: "18px",
                }}
              >
                Interactive Dashboard
              </span>
            )}
          </div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#1a2332",
              lineHeight: 1.2,
              maxWidth: "900px",
              margin: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#6b7280",
              maxWidth: "800px",
              marginTop: "16px",
              lineHeight: 1.5,
            }}
          >
            {post.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              P
            </div>
            <span
              style={{ fontSize: "22px", fontWeight: 600, color: "#1a2332" }}
            >
              The Puneet Story
            </span>
          </div>
          <span style={{ fontSize: "18px", color: "#6b7280" }}>
            thepuneetstory.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

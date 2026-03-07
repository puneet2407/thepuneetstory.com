import { ImageResponse } from "next/og";
import { site, social } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.brandName} — Life in Canada`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const firstLetter = site.brandName.charAt(0);
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #faf8f5 0%, #f9fafb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {firstLetter}
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#1a2332",
            }}
          >
            {site.brandName}
          </span>
        </div>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#1a2332",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Your Guide to Life in Canada
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#6b7280",
            textAlign: "center",
            maxWidth: "700px",
            marginTop: "16px",
          }}
        >
          Real Canada. Real Talk. Insurance, Taxes, Real Estate, Immigration &
          more.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {social.links.map((link) => (
            <span
              key={link.platform}
              style={{
                background: "#f59e0b",
                color: "white",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {link.platform} {link.followers}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

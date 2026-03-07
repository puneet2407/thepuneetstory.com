import { NextResponse } from "next/server";

/**
 * Newsletter subscribe API — integrates with Resend Audiences/Segments.
 * All email capture forms (homepage, newsletter page, topics, about, post pages)
 * use this endpoint to add contacts to your Resend audience.
 *
 * Required env: RESEND_API_KEY
 * For audience: RESEND_SEGMENT_ID (preferred) or RESEND_AUDIENCE_ID (legacy)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const recaptchaToken =
      typeof body?.recaptchaToken === "string" ? body.recaptchaToken : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    // Verify reCAPTCHA if configured
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "reCAPTCHA validation failed" },
          {
            status: 400,
            headers: { "Cache-Control": "no-store, max-age=0" },
          }
        );
      }

      const params = new URLSearchParams();
      params.append("secret", recaptchaSecret);
      params.append("response", recaptchaToken);

      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      const recaptchaResult = (await verifyRes.json()) as {
        success?: boolean;
        score?: number;
        action?: string;
        [key: string]: unknown;
      };

      const passedScore =
        typeof recaptchaResult.score === "number"
          ? recaptchaResult.score >= 0.5
          : true;
      const actionOk =
        !recaptchaResult.action || recaptchaResult.action === "subscribe";

      if (!recaptchaResult.success || !passedScore || !actionOk) {
        console.warn("[subscribe] reCAPTCHA failed:", recaptchaResult);
        return NextResponse.json(
          { error: "reCAPTCHA validation failed" },
          {
            status: 400,
            headers: { "Cache-Control": "no-store, max-age=0" },
          }
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const segmentId = process.env.RESEND_SEGMENT_ID;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      console.warn("[subscribe] RESEND_API_KEY not set — signup skipped:", email);
      return NextResponse.json(
        { success: true },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Prefer segment (modern) over audience (legacy)
    const targetId = segmentId ?? audienceId;

    if (targetId) {
      // Create contact and add to segment/audience in one call
      const createPayload = segmentId
        ? {
            email,
            unsubscribed: false,
            segments: [{ id: segmentId }],
          }
        : {
            email,
            unsubscribed: false,
            audienceId,
          };

      const { error } = await resend.contacts.create(createPayload);

      if (error) {
        // Contact may already exist — try adding to segment
        if (segmentId && error.message?.toLowerCase().includes("already")) {
          const addResult = await resend.contacts.segments.add({
            email,
            segmentId,
          });
          if (addResult.error) {
            console.error("[subscribe] segments.add error:", addResult.error);
            return NextResponse.json(
              { error: "Failed to subscribe" },
              {
                status: 500,
                headers: { "Cache-Control": "no-store, max-age=0" },
              }
            );
          }
          return NextResponse.json(
            { success: true },
            { headers: { "Cache-Control": "no-store, max-age=0" } }
          );
        }
        console.error("[subscribe] Resend error:", error);
        return NextResponse.json(
          { error: "Failed to subscribe" },
          {
            status: 500,
            headers: { "Cache-Control": "no-store, max-age=0" },
          }
        );
      }

      return NextResponse.json(
        { success: true },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    // No segment/audience — create contact only (still stored in Resend)
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("[subscribe] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        {
          status: 500,
          headers: { "Cache-Control": "no-store, max-age=0" },
        }
      );
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }
}

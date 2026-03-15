"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { newsletter } from "@/lib/site";
import { pushToDataLayer } from "@/lib/gtm";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface EmailCaptureProps {
  variant?: "inline" | "banner";
}

export function EmailCapture({ variant = "inline" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let recaptchaToken: string | undefined;
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (
        siteKey &&
        typeof window !== "undefined" &&
        window.grecaptcha?.execute
      ) {
        try {
          recaptchaToken = await window.grecaptcha.execute(siteKey, {
            action: "subscribe",
          });
        } catch (err) {
          console.warn("[subscribe] reCAPTCHA execute error:", err);
        }
      }

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to subscribe");
      }

      pushToDataLayer({
        event: "newsletter_signup",
        form_location: variant === "banner" ? "home_banner" : "post_footer",
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const buttonLabel =
    status === "loading"
      ? "Subscribing..."
      : status === "success"
        ? "Subscribed!"
        : status === "error"
          ? "Try again"
          : "Subscribe";

  if (variant === "banner") {
    return (
      <section className="py-16 px-4 border-t border-[#e5e5e5]">
        <div className="max-w-[680px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-2">
            Get the newsletter
          </h2>
          <p className="text-muted-foreground mb-6">
            {newsletter.heroSubtext}
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="flex-1 h-11 rounded-full border-[#e5e5e5] bg-white px-4 text-[15px]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-11 px-6 rounded-full bg-pine text-white text-sm font-medium hover:bg-pine-light disabled:opacity-50 transition-colors"
            >
              {buttonLabel}
            </button>
          </form>
          {status === "error" && (
            <p className="text-sm text-red-600 mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="py-10 border-t border-[#e5e5e5]">
      <div className="max-w-md">
        <h3 className="font-[family-name:var(--font-serif)] text-[22px] font-bold mb-2 text-foreground">
          Stay updated
        </h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
          {newsletter.heroSubtext}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="flex-1 h-11 rounded-full border-[#e5e5e5] bg-white px-4 text-[15px]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-11 px-6 rounded-full bg-pine text-white text-sm font-medium hover:bg-pine-light disabled:opacity-50 shrink-0 transition-colors"
          >
            {buttonLabel}
          </button>
        </form>
        {status === "error" && (
          <p className="text-sm text-red-600 mt-3">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

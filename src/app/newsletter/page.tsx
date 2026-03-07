"use client";

import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { site, newsletter as newsletterContent } from "@/lib/site";

export default function NewsletterPage() {
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

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-[480px] text-center">
          <CheckCircle className="w-16 h-16 text-[var(--link)] mx-auto mb-6" />
          <h1 className="font-[family-name:var(--font-serif)] text-3xl font-bold mb-4">
            {newsletterContent.welcomeTitle}
          </h1>
          <p className="text-muted-foreground mb-8">
            {newsletterContent.welcomeMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign up another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-paper">
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-[480px] mx-auto text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold leading-tight mb-6">
            Get {site.brandName} in your inbox
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            {newsletterContent.heroSubtext}
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="flex-1 h-12 rounded-full border-foreground/20 bg-white"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 px-8 rounded-full bg-pine text-white text-sm font-medium hover:bg-pine-light disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600 mt-2">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              Weekly on {newsletterContent.sendDay}. Unsubscribe anytime.
            </p>
          </form>

          <p className="text-sm text-muted-foreground">
            {newsletterContent.subscriberCount} subscribers
          </p>
        </div>
      </section>
    </div>
  );
}

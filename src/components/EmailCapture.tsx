"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailCaptureProps {
  variant?: "inline" | "banner";
}

export function EmailCapture({ variant = "inline" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

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
      <section className="bg-primary py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl mb-4 text-white">
            Get Real Canada Insights
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of Indian-Canadians getting weekly tips on
            insurance, taxes, real estate, and life in Canada.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-[#1a2332] flex-1"
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              disabled={status === "loading"}
            >
              {buttonLabel}
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-serif)] text-lg mb-2">
            Stay Updated
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest guides, dashboards, and insights delivered to your
            inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={status === "loading"}>
              {status === "success" ? "Done!" : buttonLabel}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Mail,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterPage() {
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
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl mb-4">
            You&apos;re In! 🎉
          </h1>
          <p className="text-muted-foreground mb-6">
            Welcome to The Puneet Story community. Check your inbox for a
            confirmation email. Your first newsletter will arrive next week with
            fresh insights on life in Canada.
          </p>
          <Button onClick={() => setStatus("idle")} variant="outline">
            Sign Up Another Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#faf8f5] via-[#f9fafb] to-[#faf8f5] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-6">
            Get Real Canada Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of Indian-Canadians getting weekly tips on
            insurance, taxes, real estate, immigration, and life in the Great
            White North.
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12"
              />
              <Button type="submit" size="lg" className="h-12">
                Subscribe Free
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              One email per week. Unsubscribe anytime. No spam, ever.
            </p>
          </form>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>12,000+ subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Weekly on Sundays</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-center mb-12">
            What You&apos;ll Get
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Weekly Deep Dives
              </h3>
              <p className="text-muted-foreground">
                One comprehensive guide per week on topics that actually
                matter—insurance savings, tax hacks, real estate trends, and
                more.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Exclusive Tools
              </h3>
              <p className="text-muted-foreground">
                Get first access to new dashboards, calculators, and resources
                before they go live on the site.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl mb-3">
                Community Insights
              </h3>
              <p className="text-muted-foreground">
                Real stories and tips from other Indian-Canadians navigating the
                same journey you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Newsletter */}
      <section className="py-16 px-4 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-center mb-8">
            Recent Newsletter Topics
          </h2>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 px-3 py-1 rounded text-sm text-primary font-mono">
                  Issue #47
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    How I Saved $840/Year on Car Insurance (3 Simple Steps)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Breaking down exactly what I did to slash my insurance
                    premium without compromising coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 px-3 py-1 rounded text-sm text-primary font-mono">
                  Issue #46
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    RRSP vs TFSA for Newcomers: The Decision Framework
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A simple flowchart to help you decide where to invest your
                    money based on your situation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 px-3 py-1 rounded text-sm text-primary font-mono">
                  Issue #45
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    The Hidden Costs of Buying Your First Home in the GTA
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Beyond the down payment—what nobody tells you about closing
                    costs, land transfer tax, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl mb-4">
            Ready to Join?
          </h2>
          <p className="text-muted-foreground mb-8">
            No credit card. No gimmicks. Just real, useful content every Sunday
            morning.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12"
              />
              <Button type="submit" size="lg" className="h-12">
                Subscribe Free
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}


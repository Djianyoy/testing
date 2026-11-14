"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, delay: 0.15 });
      gsap.from(".hero-card", { y: 30, opacity: 0, stagger: 0.1, delay: 0.3 });
    }, root);
    return () => ctx.revert();   // wajib
  }, []);

  return (
    <section ref={root} className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="hero-title text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="hero-sub mt-4 text-muted-foreground">{subtitle}</p>
      <div className="hero-card mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">Cepat</div>
        <div className="rounded-xl border p-4">Aman</div>
        <div className="rounded-xl border p-4">Modern</div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const line1 = "Connecting ideas";
const line2 = "digitally.";

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="hero-word inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.3, defaults: { ease: "expo.out" } })
        .from(".hero-word", { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.09 })
        .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.9");
      gsap.to(".hero-inner", {
        yPercent: 25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative flex min-h-screen items-center px-5 md:px-10">
      <div className="hero-inner mx-auto w-full max-w-7xl pt-24">
        <p className="hero-fade mb-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Makura Creations · Lalitpur, Nepal · Since 2013
        </p>
        <h1 className="font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] tracking-tight">
          <Words text={line1} />
          <Words text={line2} className="italic text-crimson" />
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-lg text-white/70">
            You dream, we weave. A full-stack digital studio crafting websites, apps, brands and AI
            workflows — for twelve years and counting.
          </p>
          <div className="hero-fade flex items-center gap-4">
            <a href="#work" className="rounded-full bg-crimson px-7 py-3 font-medium text-[#fff] transition hover:scale-105">
              See our work
            </a>
            <a href="#services" className="rounded-full border border-white/30 px-7 py-3 transition hover:bg-white hover:text-ink">
              What we do
            </a>
          </div>
        </div>
        <div className="hero-fade mt-16 flex items-center gap-3 text-xs text-white/50">
          <span className="relative block h-10 w-px overflow-hidden bg-white/20">
            <span className="scroll-dot absolute inset-x-0 top-0 h-4 bg-white" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}

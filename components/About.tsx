"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

const stats = [
  { v: 7, s: "+", l: "Sample years" },
  { v: 8, s: "", l: "Sample projects" },
  { v: 2, s: "", l: "Sample studios" },
  { v: 4, s: "", l: "Sample awards" },
];

function Counter({ v, s, d = 0 }: { v: number; s: string; d?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const o = { n: 0 };
      animate(o, {
        n: v,
        duration: 2200,
        ease: "outExpo",
        onUpdate: () => (el.textContent = o.n.toFixed(d) + s),
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [v, s, d]);
  return <span ref={ref}>{(0).toFixed(d) + s}</span>;
}

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-ink/70 to-ink/30 px-5 py-28 backdrop-blur-sm md:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">About us</p>
          <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
            A calmer way of <em className="text-crimson">thinking.</em>
          </h2>
        </div>
        <div className="space-y-6 text-lg text-white/70">
          <p>
            Makura Creations Redesigned is an invented studio that sits between ambitious ideas and the
            digital products that carry them. This page exists to demonstrate a design style.
          </p>
          <p>
            The clients, places and figures shown on this site are placeholders, written for the demo
            and not drawn from any real company.
          </p>
        </div>
      </div>
      <dl className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-y-10 border-t border-white/10 pt-12 md:grid-cols-4">
        {stats.map((x) => (
          <div key={x.l}>
            <dt className="font-display text-6xl text-white md:text-8xl"><Counter {...x} /></dt>
            <dd className="mt-2 text-sm text-white/55">{x.l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

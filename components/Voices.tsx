"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const quotes = [
  { q: "A sample quote about a calm, clear process and a site that finally feels like ours.", a: "Lumen Pay (fictitious)" },
  { q: "A sample quote about a redesign that made booking simple and the brand feel confident.", a: "Trailhead Journeys (fictitious)" },
  { q: "A sample quote about a team that listened first and shipped on time.", a: "Bright Path Academy (fictitious)" },
  { q: "A sample quote about fans finding fixtures faster on a tidy, quick site.", a: "Willowbank Cricket Club (fictitious)" },
];

export default function Voices() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [i]);

  return (
    <section id="voices" className="bg-ink/60 px-5 py-28 backdrop-blur-sm md:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-gold">Sample words</p>
        <div className="relative min-h-[340px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-3xl leading-tight md:text-6xl">“{quotes[i].q}”</blockquote>
              <figcaption className="mt-8 text-white/60">— {quotes[i].a}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {quotes.map((_, n) => (
            <button key={n} aria-label={`Quote ${n + 1}`} onClick={() => setI(n)} className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/15">
              {n === i && (
                <motion.span layoutId="pip" className="absolute inset-0 bg-gradient-to-r from-crimson to-gold" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

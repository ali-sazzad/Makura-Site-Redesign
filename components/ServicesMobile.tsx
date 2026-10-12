"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

type Service = { n: string; t: string; d: string; tags: string[] };

/** Mobile "What we weave": a thread runs down the page, fills as you scroll and ties a knot at each service. Tap to unravel. */
export default function ServicesMobile({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="bg-ink/50 px-5 py-24 backdrop-blur-sm md:hidden">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">What we weave</p>
      <h2 className="font-display text-6xl leading-none">
        Six crafts, <em className="text-crimson">one thread.</em>
      </h2>
      <p className="mt-5 max-w-xs text-white/60">Tap a strand to unravel it — every discipline under one roof, in Nepal and the USA.</p>

      <div ref={list} className="relative mt-14 pl-9">
        {/* the thread */}
        <div className="absolute bottom-3 left-[11px] top-3 w-px bg-white/15" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute bottom-3 left-[10px] top-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-crimson via-gold to-crimson shadow-[0_0_14px_var(--color-crimson)]"
        />

        <ul className="space-y-3">
          {services.map((s, i) => {
            const active = open === i;
            return (
              <li key={s.n} className="relative">
                {/* the knot */}
                <motion.span
                  animate={{ scale: active ? 1 : 0.7, backgroundColor: active ? "var(--color-crimson)" : "var(--color-ink)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="absolute -left-9 top-7 z-10 block h-6 w-6 rounded-full border-2 border-crimson"
                >
                  {active && <span className="absolute inset-[-6px] animate-ping rounded-full border border-crimson/60" />}
                </motion.span>

                <motion.div
                  layout
                  animate={{ backgroundColor: active ? "color-mix(in srgb, var(--color-white) 6%, transparent)" : "transparent" }}
                  className="overflow-hidden rounded-3xl border border-white/10"
                >
                  <button
                    onClick={() => setOpen(active ? -1 : i)}
                    aria-expanded={active}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <span className="font-mono text-xs text-gold">{s.n}</span>
                    <span className={`flex-1 font-display text-[1.7rem] leading-tight transition-colors ${active ? "text-white" : "text-white/60"}`}>
                      {s.t}
                    </span>
                    <motion.span animate={{ rotate: active ? 45 : 0 }} className="text-2xl leading-none text-crimson">
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 text-white/70">{s.d}</p>
                        <ul className="flex flex-wrap gap-2 p-5 pt-4">
                          {s.tags.map((t, k) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12 + k * 0.06 }}
                              className="rounded-full border border-crimson/40 px-3 py-1 text-xs text-white/80"
                            >
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

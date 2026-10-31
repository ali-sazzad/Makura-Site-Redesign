"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

const links = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Voices", "#voices"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/40 px-5 py-4 backdrop-blur-md md:px-10"
      >
        <a href="#top" className="font-display text-xl tracking-tight">
          Makura<span className="text-crimson">.</span>
        </a>
        <nav className="hidden gap-8 text-sm text-white/70 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-white">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-gold sm:px-5">
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start your project</span>
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-2xl md:hidden">
            {open ? "×" : "≡"}
          </button>
        </div>
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-crimson to-gold"
        />
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-6 bg-ink px-8 md:hidden"
          >
            {links.map(([l, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="font-display text-5xl"
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

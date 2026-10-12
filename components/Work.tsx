"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

const work = [
  { t: "Cricket Association of Nepal", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/can.jpeg", slug: "can" },
  { t: "Lambda Payments", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/lambda-payments.jpg", slug: "lambda-payments" },
  { t: "Miss Nepal", k: "Branding & graphics", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/miss-nepal.jpg", slug: "miss-nepal" },
  { t: "Nepal Travel Adventure", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/nepal-travel-adventure.jpg", slug: "nepal-travel-adventure" },
  { t: "360 Education", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/360-education.jpeg", slug: "360-education" },
  { t: "Seed Financial Academy", k: "Digital marketing", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/seed-financial-academy.jpg", slug: "seed-financial-academy" },
  { t: "UWS Nepal", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/uws-nepal.webp", slug: "uws-nepal" },
  { t: "Varicon (Australia)", k: "Website & mobile app", img: process.env.NEXT_PUBLIC_BASE_PATH + "/work/varicon-australia.jpg", slug: "varicon-australia" },
];

function Card({ w, i }: { w: (typeof work)[number]; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <motion.a
      href={`https://makuracreations.com/portfolio/${w.slug}/`}
      target="_blank"
      rel="noreferrer"
      data-hover
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative block overflow-hidden rounded-3xl bg-white/5 md:h-[420px] ${i % 3 === 0 ? "md:col-span-2" : ""}`}
    >
      <div className="relative h-52 sm:h-72 md:absolute md:inset-0 md:h-auto">
        <Image
          src={w.img}
          alt={`${w.t} project preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/30 to-transparent md:block" />
      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/80 md:left-8 md:top-8">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="relative p-6 md:absolute md:inset-x-8 md:bottom-8 md:p-0">
        <p className="mb-2 text-sm text-white/80">{w.k}</p>
        <h3 className="font-display text-3xl leading-tight md:text-5xl">{w.t}</h3>
        <span className="mt-4 inline-block text-sm md:translate-y-3 md:opacity-0 md:transition md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          View case →
        </span>
      </div>
    </motion.a>
  );
}

/** Mobile-only: full-bleed cards that stack like a deck as you scroll; earlier cards shrink and dim beneath the next. */
function StackCard({ w, i, total }: { w: (typeof work)[number]; i: number; total: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress: out } = useScroll({ target: wrap, offset: ["start start", "end start"] });
  const { scrollYProgress: through } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const scale = useTransform(out, [0, 1], [1, i === total - 1 ? 1 : 0.88]);
  const dim = useTransform(out, [0, 1], [0, i === total - 1 ? 0 : 0.7]);
  const imgY = useTransform(through, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={wrap} className="h-[88svh]">
      <motion.a
        href={`https://makuracreations.com/portfolio/${w.slug}/`}
        target="_blank"
        rel="noreferrer"
        style={{ scale, top: `${88 + i * 8}px` }}
        className="sticky block h-[72svh] origin-top overflow-hidden rounded-[2rem] border border-white/15 bg-ink shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-x-0 top-0 h-[64%] overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-x-0 -inset-y-[8%]">
            <Image src={w.img} alt={`${w.t} project preview`} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink from-35% via-ink/40 via-60% to-transparent" />
        <span className="absolute -right-2 top-0 select-none font-display text-[9rem] italic leading-none text-white/10">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="mb-3 inline-block rounded-full border border-gold/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold">
            {w.k}
          </span>
          <h3 className="font-display text-4xl leading-[1.05]">{w.t}</h3>
          <div className="mt-5 flex items-center justify-between text-sm text-white/70">
            <span className="font-mono text-xs">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-crimson text-lg text-[#fff]">↗</span>
          </div>
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.a>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-ink/70 px-5 py-28 backdrop-blur-sm md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">Selected work</p>
        <h2 className="mb-14 max-w-3xl font-display text-6xl leading-none md:text-8xl">
          Trusted by teams <em className="text-crimson">that move.</em>
        </h2>
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {work.map((w, i) => (
            <Card key={w.t} w={w} i={i} />
          ))}
        </div>
        <div className="md:hidden">
          {work.map((w, i) => (
            <StackCard key={w.t} w={w} i={i} total={work.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

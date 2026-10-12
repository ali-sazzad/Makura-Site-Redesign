"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesMobile from "./ServicesMobile";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { n: "01", t: "Web Development", d: "WordPress, Laravel, CMS builds, landing pages and responsive sites engineered to convert.", tags: ["WordPress", "Laravel", "CMS", "Landing pages"] },
  { n: "02", t: "Digital Marketing", d: "SEO, Answer Engine Optimization, PPC, social and content — found first, remembered longest.", tags: ["SEO", "AEO", "PPC", "Social"] },
  { n: "03", t: "UI/UX Design", d: "Design systems and interfaces that feel effortless on every screen.", tags: ["Design systems", "Prototyping", "Research"] },
  { n: "04", t: "Mobile Apps", d: "Flutter, iOS and Android apps with native polish and one codebase.", tags: ["Flutter", "iOS", "Android"] },
  { n: "05", t: "AI Workflow Automation", d: "Business processes rewired with AI so your team does the thinking, not the repeating.", tags: ["Automation", "AI agents", "Integrations"] },
  { n: "06", t: "Branding & Motion", d: "Logos, guidelines, print, reels and 2D/3D animation — a brand in motion.", tags: ["Identity", "Video", "2D/3D"] },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div id="services">
    <ServicesMobile services={services} />
    <section ref={root} className="relative hidden overflow-hidden bg-ink/50 backdrop-blur-sm md:flex md:h-screen md:items-center">
      <div ref={track} className="flex w-full flex-col gap-6 px-5 md:w-max md:flex-row md:items-stretch md:gap-8 md:px-10">
        <div className="flex shrink-0 flex-col justify-center md:w-[34vw]">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">What we weave</p>
          <h2 className="font-display text-6xl leading-none md:text-8xl">
            Six crafts, <em className="text-crimson">one thread.</em>
          </h2>
          <p className="mt-6 max-w-sm text-white/60">Keep scrolling — every discipline under one roof, in Nepal and the USA.</p>
        </div>
        {services.map((s) => (
          <article
            key={s.n}
            data-hover
            className="svc-card group relative flex shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-crimson/60 hover:bg-white/[0.08] md:h-[62vh] md:w-[26vw] md:min-w-[320px]"
          >
            <span className="font-mono text-sm text-gold">{s.n}</span>
            <div>
              <h3 className="font-display text-4xl">{s.t}</h3>
              <p className="mt-4 text-white/65">{s.d}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-word", {
        yPercent: 110, stagger: 0.1, immediateRender: false, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".office", {
        y: 40, opacity: 0, stagger: 0.15, immediateRender: false, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".office", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="bg-ink/80 px-5 pb-10 pt-32 backdrop-blur-sm md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">Let&apos;s talk</p>
        <h2 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9]">
          {["Ideas", "in,"].map((w) => (
            <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-bottom"><span className="cta-word inline-block">{w}</span></span>
          ))}
          <br />
          {["products", "out."].map((w) => (
            <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-bottom italic text-crimson"><span className="cta-word inline-block">{w}</span></span>
          ))}
        </h2>
        <a href="#contact"
          className="mt-12 inline-block rounded-full bg-white px-10 py-4 text-lg font-medium text-ink transition hover:scale-105 hover:bg-gold">
          Start a sample project →
        </a>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-12 text-white/70 md:grid-cols-3">
          <div className="office">
            <h3 className="mb-3 font-display text-2xl text-white">Studio One</h3>
            <p>Level 2, Sample Court (fictitious)<br />Exampleville 00000</p>
            <p className="mt-2">+977-1-0000000<br />Placeholder number</p>
          </div>
          <div className="office">
            <h3 className="mb-3 font-display text-2xl text-white">Studio Two</h3>
            <p>100 Placeholder Ave (fictitious)<br />Anytown, ST 00000</p>
            <p className="mt-2">+1-555-010-0100<br />Placeholder number</p>
          </div>
          <div className="office">
            <h3 className="mb-3 font-display text-2xl text-white">Follow</h3>
            <ul className="space-y-1">
              {["Facebook", "Instagram", "LinkedIn", "TikTok", "Dribbble", "Behance"].map((s) => (
                <li key={s}><a className="transition hover:text-crimson" href="#contact">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-16 text-xs text-white/40">
          © {new Date().getFullYear()} Makura Creations Redesigned · A fictitious studio for a design concept. All names, addresses, numbers and projects are invented.
        </p>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollRig, SEQ_LENGTH } from "@/lib/theatre";

gsap.registerPlugin(ScrollTrigger);

const LINES = 44;
const POINTS = 140;

/** Three.js woven-thread field. Camera/twist/colour are choreographed by a Theatre.js sequence scrubbed by scroll. */
export default function ThreadScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    const crimson = new THREE.Color("#ff2e4d");
    const gold = new THREE.Color("#ffb347");
    const indigo = new THREE.Color("#6d6bff");
    const cyan = new THREE.Color("#3de0ff");

    const lines: { line: THREE.Line; pos: Float32Array; t: number }[] = [];
    for (let i = 0; i < LINES; i++) {
      const pos = new Float32Array(POINTS * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.35 + (i % 5) * 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);
      lines.push({ line, pos, t: i / (LINES - 1) });
    }

    // dust motes
    const N = 500;
    const dust = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) dust[i] = (Math.random() - 0.5) * 18;
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.03,
      color: "#ffffff",
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const points = new THREE.Points(dustGeo, dustMat);
    scene.add(points);

    // Theatre.js rig, driven by scroll
    const { sheet, scene: rig } = createScrollRig();
    let v = { camZ: 7.5, camY: 0.2, rotY: 0, twist: 0.25, mix: 0 };
    const unsub = rig.onValuesChange((n) => (v = n));
    let target = 0;
    let current = 0;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => (target = self.progress),
    });

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Light theme: additive glow is invisible on cream, so switch to normal blending with darker dust.
    const applyTheme = () => {
      const light = document.documentElement.dataset.theme === "light";
      lines.forEach(({ line }) => {
        const m = line.material as THREE.LineBasicMaterial;
        m.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        m.opacity = light ? 0.75 : 0.35 + (lines.findIndex((l) => l.line === line) % 5) * 0.1;
        m.needsUpdate = true;
      });
      dustMat.color.set(light ? "#0d0d16" : "#ffffff");
      dustMat.opacity = light ? 0.35 : 0.5;
    };
    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tmp = new THREE.Color();
    const cool = new THREE.Color();
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const time = reduce ? 0 : clock.getElapsedTime();
      current += (target - current) * 0.06;
      sheet.sequence.position = current * SEQ_LENGTH;
      pointer.sx += (pointer.x - pointer.sx) * 0.05;
      pointer.sy += (pointer.y - pointer.sy) * 0.05;

      const A = 0.6 + v.twist * 1.1;
      for (let i = 0; i < lines.length; i++) {
        const { pos, line, t } = lines[i];
        const off = (t - 0.5) * 5.5;
        for (let j = 0; j < POINTS; j++) {
          const u = j / (POINTS - 1);
          const ph = i * 0.28;
          pos[j * 3] = (u - 0.5) * 15;
          pos[j * 3 + 1] =
            off * (1 - v.twist * 0.35 * Math.sin(u * 3.14)) +
            Math.sin(u * 5 + ph + time * 0.6) * 0.35 * A;
          pos[j * 3 + 2] = Math.cos(u * 4 - ph * 1.3 + time * 0.45) * 1.4 * A;
        }
        line.geometry.attributes.position.needsUpdate = true;
        const m = line.material as THREE.LineBasicMaterial;
        tmp.copy(crimson).lerp(gold, t);
        cool.copy(indigo).lerp(cyan, t);
        m.color.copy(tmp).lerp(cool, v.mix);
      }

      group.rotation.y = v.rotY * 0.35 + pointer.sx * 0.15;
      group.rotation.x = pointer.sy * 0.1;
      group.rotation.z = Math.sin(v.rotY) * 0.15;
      points.rotation.y = time * 0.02 + v.rotY * 0.1;
      camera.position.set(pointer.sx * 0.3, v.camY, v.camZ);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      st.kill();
      unsub();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      lines.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="fixed inset-0 -z-10 bg-ink" aria-hidden />;
}

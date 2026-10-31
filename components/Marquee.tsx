const names = [
  "Willowbank Cricket Club", "Lumen Pay", "Aster Pageant", "Trailhead Journeys", "Bright Path Academy", "Cedar Wealth School", "Harbor Works", "Veridian Build",
];

export default function Marquee() {
  const row = [...names, ...names];
  return (
    <section aria-label="Sample clients" className="overflow-hidden border-y border-white/10 bg-ink/60 py-6 backdrop-blur">
      <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl text-white/60 md:text-5xl">
        {row.map((n, i) => (
          <span key={i} className="flex items-center gap-12">
            {n}
            <span className="text-crimson">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

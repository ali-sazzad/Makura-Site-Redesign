const names = [
  "360 Education", "UWS Nepal", "Lambda Payments", "Cricket Association of Nepal",
  "Miss Nepal", "Seed Financial Academy", "Varicon", "Nepal Travel Adventure",
];

export default function Marquee() {
  const row = [...names, ...names];
  return (
    <section aria-label="Clients" className="overflow-hidden border-y border-white/10 bg-ink/60 py-6 backdrop-blur">
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

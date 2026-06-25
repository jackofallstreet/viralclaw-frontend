export default function AnalyticsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Analytics
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Performance data from the Analytics Agent. Populated after content is published.
        </p>
      </div>

      {/* Empty chart area */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Channel performance
          </span>
          <span className="font-mono text-[0.44rem] tracking-[0.08em] uppercase text-[var(--dim)] border border-[var(--border)] px-2 py-[2px]">
            Coming soon
          </span>
        </div>
        <div className="bg-[var(--carbon)] flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="flex items-end gap-[3px] mb-5">
            {[3,5,4,7,6,9,8,10,9,12].map((h, i) => (
              <div
                key={i}
                className="w-[6px] bg-[var(--dim)] opacity-30"
                style={{ height: h * 5 }}
              />
            ))}
          </div>
          <p className="font-mono text-[0.57rem] tracking-[0.08em] uppercase text-[var(--low)] mb-2">
            No data yet
          </p>
          <p className="font-mono text-[0.52rem] text-[var(--dim)] leading-[1.65] max-w-[42ch]">
            Once content is published and the Analytics Agent runs its first cycle, data will appear here.
          </p>
        </div>
      </div>

      {/* What will be tracked */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            What the Analytics Agent tracks
          </span>
        </div>
        <div className="bg-[var(--carbon)] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
          {[
            {
              label: "Per-content metrics",
              items: [
                "Views at 24h / 72h / 7d",
                "Retention rate",
                "Click-through rate",
                "Engagement rate",
              ]
            },
            {
              label: "What gets updated",
              items: [
                "Brand DNA — format performance signals",
                "Qdrant — embedding updates",
                "Neo4j — audience behavior graph",
                "Content calendar signals",
              ]
            },
          ].map((col) => (
            <div key={col.label} className="p-4">
              <div className="font-mono text-[0.48rem] tracking-[0.12em] uppercase text-[var(--low)] mb-3">
                {col.label}
              </div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-mono text-[0.52rem] text-[var(--muted)]">
                    <span className="text-[var(--dim)] mt-[1px] shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

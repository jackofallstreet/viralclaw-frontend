export default function AnalyticsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Analytics
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Signal outcome tracking and intelligence performance. Populated as Signal Memory accumulates data.
        </p>
      </div>

      {/* Empty chart area */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Signal conviction accuracy
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
            No outcome data yet
          </p>
          <p className="font-mono text-[0.52rem] text-[var(--dim)] leading-[1.65] max-w-[44ch]">
            Once briefs are generated and Signal Memory runs its first outcome cycle, accuracy data will appear here.
          </p>
        </div>
      </div>

      {/* What Signal Memory tracks */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            What Signal Memory tracks
          </span>
        </div>
        <div className="bg-[var(--carbon)] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
          {[
            {
              label: "Alpha signal outcomes",
              items: [
                "Did the signal lead to price action?",
                "Window open vs actual duration",
                "Which chains rotated as predicted",
                "Conviction score accuracy at 24h / 72h",
              ],
            },
            {
              label: "Content brief outcomes",
              items: [
                "Narrative engagement vs baseline",
                "Publish window accuracy",
                "Trend saturation timing",
                "Wallet reputation model updates",
              ],
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

      {/* Pipeline health */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Pipeline health
          </span>
        </div>
        <div className="bg-[var(--carbon)] divide-y divide-[var(--border)]">
          {[
            { module: "On-Chain Scanner",        status: "Building",    color: "var(--cyan-light)" },
            { module: "Social Velocity Engine",  status: "Building",    color: "var(--cyan-light)" },
            { module: "Trend Scoring Model",     status: "Coming soon", color: "var(--amber)"      },
            { module: "Alpha Engine",            status: "Coming soon", color: "var(--amber)"      },
            { module: "Content Engine",          status: "Coming soon", color: "var(--amber)"      },
            { module: "Signal Memory",           status: "Planned",     color: "var(--dim)"        },
          ].map((row) => (
            <div key={row.module} className="px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-[0.57rem] text-[var(--body)]">{row.module}</span>
              <span
                className="font-mono text-[0.46rem] tracking-[0.1em] uppercase px-2 py-[3px] border"
                style={{ color: row.color, borderColor: row.color + "44", background: row.color + "11" }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

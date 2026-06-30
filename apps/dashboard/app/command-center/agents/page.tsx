import SignalModuleGrid from "@/components/agents/agent-status-grid";

export default function SignalsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Signal Modules
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Seven modules + Signal Orchestrator. Each has a defined role in the intelligence pipeline. None are live yet.
        </p>
      </div>

      <SignalModuleGrid />

      {/* Pipeline flow */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            How the signal pipeline flows
          </span>
        </div>
        <div className="bg-[var(--carbon)] divide-y divide-[var(--border)]">
          {[
            { label: "Signal query submitted",  detail: "Orchestrator routes to On-Chain Scanner + Social Velocity Engine simultaneously" },
            { label: "Raw signals ingested",    detail: "Trend Scoring Model receives outputs and produces ScoredSignal[] with conviction rating" },
            { label: "High-conviction signals", detail: "Threshold crossed → Alpha Engine and Content Engine both receive IntelligenceEvent" },
            { label: "Dual output generated",   detail: "AlphaBrief and ContentBrief produced simultaneously — user sees both in Briefs tab" },
            { label: "Outcome tracked",         detail: "Signal Memory logs result after window closes — feeds back into scoring model" },
          ].map((row) => (
            <div key={row.label} className="px-4 py-3 flex items-start gap-4">
              <span className="font-mono text-[0.52rem] tracking-[0.04em] text-[var(--white)] shrink-0 w-[180px]">
                {row.label}
              </span>
              <span className="font-mono text-[0.52rem] text-[var(--muted)]">
                {row.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Orchestrator log — empty state */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Signal Orchestrator log
          </span>
          <span className="font-mono text-[0.44rem] tracking-[0.08em] uppercase text-[var(--dim)] border border-[var(--border)] px-2 py-[2px]">
            Coming soon
          </span>
        </div>
        <div className="bg-[var(--carbon)] px-4 py-10 text-center">
          <p className="font-mono text-[0.52rem] text-[var(--dim)]">
            Live pipeline events will stream here once the Orchestrator is wired.
          </p>
        </div>
      </div>
    </div>
  );
}

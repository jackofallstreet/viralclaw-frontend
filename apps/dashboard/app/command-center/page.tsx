import SignalModuleGrid from "@/components/agents/agent-status-grid";
import SignalQueryInput from "@/components/agents/mission-input";

const pipeline = [
  { id: "ingest",   label: "Ingest",       sub: "On-chain + social",           state: "building", gate: false },
  { id: "score",    label: "Score",         sub: "Velocity + correlation",       state: "building", gate: false },
  { id: "interpret",label: "Interpret",     sub: "Narrative + window est.",      state: "soon",     gate: true  },
  { id: "alpha",    label: "Alpha brief",   sub: "Degen participation",          state: "soon",     gate: true  },
  { id: "content",  label: "Content brief", sub: "Creator intelligence",         state: "soon",     gate: true  },
  { id: "memory",   label: "Memory",        sub: "Outcome → model update",       state: "planned",  gate: false },
];

const stateColor = {
  building: "var(--cyan-light)",
  soon:     "var(--amber)",
  planned:  "var(--dim)",
} as const;

const stateBadge = {
  building: "text-[var(--cyan-light)] border-[var(--cyan-border)] bg-[var(--cyan-dim)]",
  soon:     "text-[var(--amber)] border-[var(--amber-border)] bg-[var(--amber-dim)]",
  planned:  "text-[var(--dim)] border-[var(--border)]",
} as const;

export default function CommandCenterPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-[4px] h-[4px] rounded-full bg-[var(--amber)] animate-[blinkA_2s_ease_infinite]" />
            <span className="font-mono text-[0.5rem] tracking-[0.16em] uppercase text-[var(--amber)]">
              Signal engine building
            </span>
          </div>
          <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
            Intelligence Layer
          </h1>
          <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
            Signal pipeline overview. Modules are being built — nothing is live yet.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-[0.48rem] tracking-[0.1em] uppercase text-[var(--dim)] border border-[var(--border)] px-3 py-2">
          <span>v0.1</span>
          <span className="text-[var(--border-md)]">·</span>
          <span>Pre-launch</span>
        </div>
      </div>

      {/* Pipeline diagram */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Signal pipeline — build progress
          </span>
        </div>
        <div className="bg-[var(--carbon)] p-5">
          {/* Desktop horizontal pipeline */}
          <div className="hidden lg:flex items-center gap-0">
            {pipeline.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1 min-w-0 relative">
                  {step.gate && (
                    <div className="absolute -top-1 right-[calc(50%-8px)] font-mono text-[0.38rem] tracking-[0.06em] uppercase text-[var(--amber)] flex items-center gap-[3px]">
                      <span>⊕</span>
                      <span>review</span>
                    </div>
                  )}
                  <div
                    className="w-[5px] h-[5px] rounded-full mb-3 mt-4"
                    style={{ background: stateColor[step.state as keyof typeof stateColor] }}
                  />
                  <div className="text-center px-1">
                    <div className="font-cond text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--white)] mb-1 leading-tight">
                      {step.label}
                    </div>
                    <div className="font-mono text-[0.44rem] text-[var(--dim)] leading-[1.5]">
                      {step.sub}
                    </div>
                    <div className={`font-mono text-[0.38rem] tracking-[0.06em] uppercase px-[5px] py-[2px] border mt-2 inline-block ${stateBadge[step.state as keyof typeof stateBadge]}`}>
                      {step.state === "building" ? "Building" : step.state === "soon" ? "Coming soon" : "Planned"}
                    </div>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="flex items-center gap-0 shrink-0 mx-1 mt-[-16px]">
                    <div className="w-8 h-px bg-[var(--border)]" />
                    <span className="text-[var(--dim)] text-[0.5rem]">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical pipeline */}
          <div className="lg:hidden space-y-0">
            {pipeline.map((step, i) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-[5px] h-[5px] rounded-full shrink-0 mt-[10px]"
                    style={{ background: stateColor[step.state as keyof typeof stateColor] }}
                  />
                  {i < pipeline.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--border)] mt-1" style={{ minHeight: 24 }} />
                  )}
                </div>
                <div className="pb-4 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-cond text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-[var(--white)]">
                      {step.label}
                    </span>
                    {step.gate && (
                      <span className="font-mono text-[0.4rem] tracking-[0.06em] uppercase text-[var(--amber)] border border-[var(--amber-border)] px-[5px] py-[2px]">
                        review gate
                      </span>
                    )}
                    <span className={`font-mono text-[0.4rem] tracking-[0.06em] uppercase px-[5px] py-[2px] border ${stateBadge[step.state as keyof typeof stateBadge]}`}>
                      {step.state === "building" ? "Building" : step.state === "soon" ? "Coming soon" : "Planned"}
                    </span>
                  </div>
                  <p className="font-mono text-[0.52rem] text-[var(--dim)] mt-1">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signal query input */}
      <SignalQueryInput />

      {/* Module status */}
      <section>
        <SignalModuleGrid />
      </section>

    </div>
  );
}

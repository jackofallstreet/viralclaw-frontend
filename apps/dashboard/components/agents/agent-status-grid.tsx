"use client";

const modules = [
  {
    id: "orchestrator",
    label: "Signal Orchestrator",
    role: "Pipeline coordination + routing",
    state: "building",
    note: "LangGraph runtime",
  },
  {
    id: "onchain",
    label: "On-Chain Scanner",
    role: "17-chain real-time indexing",
    state: "building",
    note: "ETH, SOL, BASE, ARB core chains",
  },
  {
    id: "social",
    label: "Social Velocity Engine",
    role: "Narrative momentum tracking",
    state: "building",
    note: "CT, Farcaster, Telegram",
  },
  {
    id: "scoring",
    label: "Trend Scoring Model",
    role: "Signal strength + correlation",
    state: "soon",
    note: "Depends on Scanner + Social",
  },
  {
    id: "alpha",
    label: "Alpha Engine",
    role: "Degen participation briefs",
    state: "soon",
    note: "Depends on Scoring Model",
  },
  {
    id: "content",
    label: "Content Engine",
    role: "Creator briefs + angles",
    state: "soon",
    note: "Depends on Scoring Model",
  },
  {
    id: "memory",
    label: "Signal Memory",
    role: "Outcome tracking + model feedback",
    state: "planned",
    note: "Phase 2",
  },
];

const stateConfig = {
  building: {
    label: "Building",
    dot: "bg-[var(--cyan-light)] animate-[blinkA_1.4s_ease_infinite]",
    badge: "text-[var(--cyan-light)] border-[var(--cyan-border)] bg-[var(--cyan-dim)]",
  },
  soon: {
    label: "Coming soon",
    dot: "bg-[var(--amber)]",
    badge: "text-[var(--amber)] border-[var(--amber-border)] bg-[var(--amber-dim)]",
  },
  planned: {
    label: "Planned",
    dot: "bg-[var(--dim)]",
    badge: "text-[var(--dim)] border-[var(--border-md)]",
  },
};

export default function SignalModuleGrid() {
  return (
    <div className="border border-[var(--border)] overflow-hidden">
      <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
        <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
          Signal modules — build status
        </span>
        <span className="font-mono text-[0.48rem] tracking-[0.1em] uppercase text-[var(--dim)]">
          {modules.filter(m => m.state === "building").length} in progress · {modules.filter(m => m.state === "soon").length} queued
        </span>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {modules.map((mod) => {
          const cfg = stateConfig[mod.state as keyof typeof stateConfig];
          return (
            <div
              key={mod.id}
              className="bg-[var(--carbon)] px-4 py-3 flex items-center gap-4 hover:bg-[var(--surface)] transition-colors duration-150"
            >
              <span className={`w-[5px] h-[5px] rounded-full shrink-0 ${cfg.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-cond text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-[var(--white)]">
                    {mod.label}
                  </span>
                  <span className="font-mono text-[0.48rem] text-[var(--dim)]">·</span>
                  <span className="font-mono text-[0.52rem] text-[var(--low)] truncate">{mod.role}</span>
                </div>
              </div>
              <span className="font-mono text-[0.44rem] tracking-[0.08em] uppercase text-[var(--dim)] hidden sm:block">
                {mod.note}
              </span>
              <span className={`font-mono text-[0.44rem] tracking-[0.08em] uppercase px-2 py-[3px] border shrink-0 ${cfg.badge}`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

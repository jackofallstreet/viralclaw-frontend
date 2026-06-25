import AgentStatusGrid from "@/components/agents/agent-status-grid";

export default function AgentsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Agents
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Six agents + Orchestrator. Each has a defined role and writes to shared memory. None are live yet.
        </p>
      </div>

      <AgentStatusGrid />

      {/* Architecture notes */}
      <div className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            How agents communicate
          </span>
        </div>
        <div className="bg-[var(--carbon)] divide-y divide-[var(--border)]">
          {[
            { label: "Mission submitted", detail: "Orchestrator decomposes into AgentTask[] and routes in order" },
            { label: "Each agent completes", detail: "Writes output to Supabase + updates Qdrant/Neo4j memory" },
            { label: "Review gates", detail: "Strategy, Production, and Distribution pause for human approval" },
            { label: "Distribution runs", detail: "Only publishes assets with status: approved — hard-coded, not configurable" },
            { label: "Analytics cycle", detail: "Pulls metrics at 24h/72h/7d intervals, updates Brand DNA" },
          ].map((row) => (
            <div key={row.label} className="px-4 py-3 flex items-start gap-4">
              <span className="font-mono text-[0.52rem] tracking-[0.04em] text-[var(--white)] shrink-0 w-[160px]">
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
            Orchestrator log
          </span>
          <span className="font-mono text-[0.44rem] tracking-[0.08em] uppercase text-[var(--dim)] border border-[var(--border)] px-2 py-[2px]">
            Coming soon
          </span>
        </div>
        <div className="bg-[var(--carbon)] px-4 py-10 text-center">
          <p className="font-mono text-[0.52rem] text-[var(--dim)]">
            Live task logs will stream here once the Orchestrator is wired.
          </p>
        </div>
      </div>
    </div>
  );
}

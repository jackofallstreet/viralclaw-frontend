const agents = [
  {
    n: "01",
    name: "Trend & Intelligence",
    desc: "Aggregates YouTube metrics and social signals across your niche. Interprets raw data into plain-language insights and flags opportunities before they peak.",
    dot: "crimson",
  },
  {
    n: "02",
    name: "Strategy Agent",
    desc: "Takes intelligence output and your goals, builds content plans, briefs, and execution timelines. Aligned to your Brand DNA and historical performance.",
    dot: "crimson",
  },
  {
    n: "03",
    name: "Production Agent",
    desc: "Generates scripts, threads, carousels, and Shorts. Repurposes long-form content into platform-native formats. Outputs require your review before publishing.",
    dot: "crimson",
  },
  {
    n: "04",
    name: "Distribution Agent",
    desc: "Schedules and publishes via platform APIs. Handles formatting, timing, and basic community replies using your Brand DNA. You control publish gates.",
    dot: "cyan",
  },
  {
    n: "05",
    name: "Analytics Agent",
    desc: "Processes performance data after each cycle. Updates Brand DNA and memory with what's working. The longer it runs, the more accurate its recommendations become.",
    dot: "cyan",
  },
  {
    n: "06",
    name: "Revenue Agent",
    desc: "Identifies monetization opportunities and surfaces sponsorship matches aligned to your audience. High-stakes actions always require human approval.",
    dot: "none",
  },
];

const dotClass = {
  crimson: "bg-[var(--accent)] animate-[blinkA_1.6s_ease_infinite]",
  cyan: "bg-[var(--cyan-light)] animate-[blinkA_2s_ease_infinite]",
  none: "bg-[var(--dim)]",
};

export default function AgentSwarm() {
  return (
    <section
      className="py-[clamp(4rem,10vw,7.5rem)] px-[clamp(1.25rem,5vw,2.5rem)] bg-[var(--bg-2)] border-t border-[var(--border)] border-b"
      id="agents"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[clamp(0.57rem,1.4vw,0.63rem)] tracking-[0.18em] uppercase text-[var(--text-3)] flex items-center gap-[7px] mb-5">
            // Agent swarm
          </div>
          <h2 className="font-cond text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-[var(--text-1)] mb-4">
            Six agents.<br />One <span className="text-[var(--accent)]">orchestrator.</span>
          </h2>
          <p className="text-[clamp(0.87rem,2vw,0.96rem)] text-[var(--text-2)] leading-[1.8] max-w-[52ch] mt-2">
            Each agent has a defined role and a set of tools. The Orchestrator handles task decomposition and handoffs.
            You set review gates — the system does the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {agents.map((ag) => (
            <div
              key={ag.n}
              className="bg-[var(--bg-2)] p-[clamp(1.3rem,3.5vw,1.8rem)] hover:bg-[var(--bg-4)] transition-colors duration-[0.25s]"
            >
              <div className="font-mono text-[0.54rem] tracking-[0.1em] text-[var(--text-4)] mb-4 flex items-center justify-between">
                <span>{ag.n}</span>
                <span className={`w-[6px] h-[6px] rounded-full ${dotClass[ag.dot as keyof typeof dotClass]}`} />
              </div>
              <div className="font-cond text-[clamp(0.95rem,2.5vw,1.08rem)] font-semibold uppercase tracking-[0.05em] text-[var(--text-1)] mb-2">
                {ag.name}
              </div>
              <p className="text-[clamp(0.82rem,1.8vw,0.88rem)] text-[var(--text-2)] leading-[1.7]">
                {ag.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

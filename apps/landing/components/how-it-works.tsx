const steps = [
  {
    n: "01 — Capture",
    name: "Multi-Signal Ingestion",
    desc: "Monitors on-chain activity across 17 blockchains — wallet flows, bridge volumes, DEX patterns, contract deployments — plus social velocity, narrative cycles, and sentiment across Crypto Twitter, Farcaster, and Telegram.",
    cy: false,
  },
  {
    n: "02 — Score",
    name: "Trend Velocity Engine",
    desc: "Proprietary scoring weights signal strength, wallet reputation, cross-chain correlation, and social lag. Surfaces the 0.3% of signals that matter — before they hit timelines. Every signal scored in real time.",
    cy: false,
  },
  {
    n: "03 — Interpret",
    name: "Narrative Intelligence",
    desc: "Maps why a trend is moving — not just that it is. Connects on-chain evidence to emerging narratives, identifying the story behind the signal and how long the window is likely to remain open.",
    cy: false,
  },
  {
    n: "04 — Alpha Brief",
    name: "Degen Participation",
    desc: "High-conviction signals become structured alpha briefs: what's moving, which chains, entry context, estimated window, and risk factors. Built for degens who need to act fast and with conviction.",
    cy: true,
  },
  {
    n: "05 — Content Brief",
    name: "Creator Intelligence",
    desc: "The same signal becomes a content opportunity: narrative angle, audience hook, supporting on-chain evidence, and optimal publish window. First-mover content before the narrative goes mainstream.",
    cy: true,
  },
  {
    n: "06 — Feedback Loop",
    name: "Signal Memory",
    desc: "Outcomes feed back into the intelligence layer — which signals led to real alpha, which narratives had legs, what windows closed early. The system gets sharper with every cycle.",
    cy: true,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-[clamp(4rem,10vw,7.5rem)] px-[clamp(1.25rem,5vw,2.5rem)]" id="how">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[clamp(0.57rem,1.4vw,0.63rem)] tracking-[0.18em] uppercase text-[var(--accent)] flex items-center gap-[7px] mb-5">
            // How it works
          </div>
          <h2 className="font-cond text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-[var(--text-1)] mb-4">
            Signal in.<br /><span className="text-[var(--accent)]">Alpha and content</span> out.
          </h2>
          <p className="text-[clamp(0.87rem,2vw,0.96rem)] text-[var(--text-2)] leading-[1.8] max-w-[52ch] mt-2">
            From raw on-chain data to actionable intelligence in under 400ms. One pipeline.
            Two outputs. Built for the people who need to move before the crowd.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {steps.map((step) => (
            <div
              key={step.n}
              className={`group bg-[var(--bg)] p-[clamp(1.4rem,4vw,2rem)] relative hover:bg-[var(--bg-3)] transition-colors duration-[0.25s]`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left transition-transform duration-[0.35s] ease-out group-hover:scale-x-100"
                style={{ background: step.cy ? "var(--cyan-light)" : "var(--accent)" }}
              />
              <span className="font-mono text-[0.55rem] tracking-[0.12em] text-[var(--text-4)] mb-3 block">{step.n}</span>
              <div className="font-cond text-[clamp(0.96rem,2.5vw,1.1rem)] font-semibold uppercase tracking-[0.05em] text-[var(--text-1)] mb-2">
                {step.name}
              </div>
              <p className="text-[clamp(0.82rem,1.8vw,0.88rem)] text-[var(--text-2)] leading-[1.7]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

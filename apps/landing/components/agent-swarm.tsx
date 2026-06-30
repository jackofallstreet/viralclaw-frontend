const signals = [
  {
    n: "01",
    name: "On-Chain Scanner",
    desc: "Indexes 17 blockchains in real time — wallet activity, bridge flows, DEX volumes, contract deployments, and smart money positioning. The raw intelligence layer that everything else feeds from.",
    dot: "crimson",
  },
  {
    n: "02",
    name: "Social Signal Engine",
    desc: "Tracks narrative velocity across Crypto Twitter, Farcaster, Telegram, and Reddit. Measures engagement rate, influencer alignment, and cross-platform amplification — correlated with on-chain data.",
    dot: "crimson",
  },
  {
    n: "03",
    name: "Trend Scoring Model",
    desc: "Combines on-chain signals with social velocity to score every trend in real time. Weights wallet reputation, signal recency, cross-chain correlation, and historical pattern match. Surfaces what actually matters.",
    dot: "crimson",
  },
  {
    n: "04",
    name: "Alpha Engine",
    desc: "Turns high-conviction signals into structured participation briefs. Identifies entry context, window timing, cross-ecosystem rotation vectors, and risk factors. Built for fast, informed degen decisions.",
    dot: "cyan",
  },
  {
    n: "05",
    name: "Content Intelligence",
    desc: "Transforms the same signal into creator-ready content briefs — narrative angle, audience hook, on-chain evidence links, and optimal publish window. First-mover content before the mainstream catches on.",
    dot: "cyan",
  },
  {
    n: "06",
    name: "Signal Memory",
    desc: "Tracks signal outcomes over time — which on-chain patterns led to real alpha, which narratives had staying power, which windows closed early. The intelligence layer compounds with every cycle.",
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
      id="signals"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[clamp(0.57rem,1.4vw,0.63rem)] tracking-[0.18em] uppercase text-[var(--text-3)] flex items-center gap-[7px] mb-5">
            // Signal architecture
          </div>
          <h2 className="font-cond text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-[var(--text-1)] mb-4">
            Six layers.<br />One <span className="text-[var(--accent)]">intelligence stack.</span>
          </h2>
          <p className="text-[clamp(0.87rem,2vw,0.96rem)] text-[var(--text-2)] leading-[1.8] max-w-[52ch] mt-2">
            Each module has a defined role in the signal pipeline. Raw on-chain data flows through
            scoring, interpretation, and delivery — producing alpha and content simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {signals.map((sig) => (
            <div
              key={sig.n}
              className="bg-[var(--bg-2)] p-[clamp(1.3rem,3.5vw,1.8rem)] hover:bg-[var(--bg-4)] transition-colors duration-[0.25s]"
            >
              <div className="font-mono text-[0.54rem] tracking-[0.1em] text-[var(--text-4)] mb-4 flex items-center justify-between">
                <span>{sig.n}</span>
                <span className={`w-[6px] h-[6px] rounded-full ${dotClass[sig.dot as keyof typeof dotClass]}`} />
              </div>
              <div className="font-cond text-[clamp(0.95rem,2.5vw,1.08rem)] font-semibold uppercase tracking-[0.05em] text-[var(--text-1)] mb-2">
                {sig.name}
              </div>
              <p className="text-[clamp(0.82rem,1.8vw,0.88rem)] text-[var(--text-2)] leading-[1.7]">
                {sig.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

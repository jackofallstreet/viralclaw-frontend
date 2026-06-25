const steps = [
  {
    n: "01 — Research",
    name: "Trend & Signal Detection",
    desc: "Monitors YouTube performance patterns across thousands of channels in your niche, plus social trends and narrative cycles — and interprets them into clear recommendations.",
    cy: false,
  },
  {
    n: "02 — Strategy",
    name: "Content Planning",
    desc: "Converts intelligence into structured briefs — titles, hooks, angles, timing windows — calibrated to your Brand DNA and what's actually working in your niche right now.",
    cy: false,
  },
  {
    n: "03 — Production",
    name: "Repurposing Engine",
    desc: "One input becomes many assets. Adapts your content into platform-specific formats — threads, Shorts, carousels, emails — without extra production effort from you.",
    cy: false,
  },
  {
    n: "04 — Distribution",
    name: "Intelligent Publishing",
    desc: "Schedules and publishes across platforms at optimal windows. Platform-native formatting handled automatically. You approve, the agent executes.",
    cy: true,
  },
  {
    n: "05 — Analysis",
    name: "Performance Intelligence",
    desc: "Processes results each cycle, identifies what worked and why, and feeds that understanding back into your Brand DNA — so the system gets sharper over time.",
    cy: true,
  },
  {
    n: "06 — Revenue",
    name: "Monetization Operations",
    desc: "Surfaces monetization opportunities — sponsorship matches, product timing, and deal flow — and manages basic revenue workflows without manual input.",
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
            You set the goal.<br />The <span className="text-[var(--accent)]">system</span> runs the loop.
          </h2>
          <p className="text-[clamp(0.87rem,2vw,0.96rem)] text-[var(--text-2)] leading-[1.8] max-w-[52ch] mt-2">
            Record a brain dump or set a high-level goal. The agents take it from there — researching, planning,
            producing, distributing, and learning from every cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {steps.map((step) => (
            <div
              key={step.n}
              className={`group bg-[var(--bg)] p-[clamp(1.4rem,4vw,2rem)] relative hover:bg-[var(--bg-3)] transition-colors duration-[0.25s] ${
                step.cy ? "before:bg-[var(--cyan-light)]" : "before:bg-[var(--accent)]"
              }`}
              style={{
                position: "relative",
              }}
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

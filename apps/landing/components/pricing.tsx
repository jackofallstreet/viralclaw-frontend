const tiers = [
  {
    tier: "Degen",
    tag: "For on-chain alpha hunters",
    desc: "Full signal stack — on-chain scanner, cross-ecosystem correlation, trend scoring, and structured alpha briefs delivered before the crowd arrives.",
    features: [
      "On-chain scanner — 17 chains in real time",
      "Cross-ecosystem signal correlation",
      "Trend velocity scoring engine",
      "Structured alpha briefs with entry context",
      "Sub-400ms signal delivery via webhook / Telegram",
      "Signal history and outcome tracking",
    ],
    featured: false,
  },
  {
    tier: "Creator",
    tag: "Most requested",
    desc: "Everything in Degen plus content intelligence — narrative briefs, publish-window timing, content angles, and on-chain evidence packaged for your audience.",
    features: [
      "Everything in Degen",
      "Narrative intelligence — trend-to-content pipeline",
      "Content briefs with on-chain source links",
      "Optimal publish-window recommendations",
      "Thread and post angle variants",
      "Engagement prediction per narrative",
      "Priority support",
    ],
    featured: true,
  },
  {
    tier: "Studio",
    tag: "For teams and funds",
    desc: "Multi-seat access, API integration, custom signal configuration, and private intelligence layers built to your ecosystem focus.",
    features: [
      "Everything in Creator",
      "Multi-seat team access",
      "REST API + webhook endpoints",
      "Custom chain and ecosystem filters",
      "Private intelligence layer configuration",
      "Dedicated onboarding and support",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-[clamp(4rem,10vw,7.5rem)] px-[clamp(1.25rem,5vw,2.5rem)]" id="pricing">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[clamp(0.57rem,1.4vw,0.63rem)] tracking-[0.18em] uppercase text-[var(--accent)] flex items-center gap-[7px] mb-5">
            // What's coming
          </div>
          <h2 className="font-cond text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-[var(--text-1)] mb-4">
            Three tiers.<br />
            <span className="text-[var(--accent)]">Pricing drops</span> at launch.
          </h2>
          <p className="text-[clamp(0.87rem,2vw,0.96rem)] text-[var(--text-2)] leading-[1.8] max-w-[52ch] mt-2">
            Not publishing prices yet — the product isn't live. Join the waitlist and you'll be the
            first to know. Early access cohort gets founder pricing, locked in permanently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative p-[clamp(1.6rem,4vw,2.2rem)] transition-colors duration-[0.25s] hover:bg-[var(--bg-4)] ${
                tier.featured ? "bg-[var(--bg-3)]" : "bg-[var(--bg-2)]"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
              )}

              <div className={`font-mono text-[0.57rem] tracking-[0.16em] uppercase mb-1 ${tier.featured ? "text-[var(--accent)]" : "text-[var(--text-3)]"}`}>
                {tier.tier}
              </div>
              <div className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[var(--text-4)] mb-4">
                {tier.tag}
              </div>

              <div className="font-cond text-[clamp(1.4rem,4vw,2rem)] font-bold leading-[1] text-[var(--text-4)] mb-1 uppercase tracking-[0.04em]">
                TBA at launch
              </div>
              <p className="text-[0.78rem] text-[var(--text-3)] mb-5 font-light leading-[1.55]">{tier.desc}</p>

              <ul className="list-none mb-6">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="font-mono text-[0.6rem] tracking-[0.04em] py-[0.45rem] border-b border-[var(--border)] flex items-center gap-2 text-[var(--text-2)]"
                  >
                    <span className="text-[var(--green)]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#access"
                className={`block w-full text-center font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase py-[0.8rem] no-underline transition-all duration-200 ${
                  tier.featured
                    ? "text-[var(--text-1)] bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                    : "text-[var(--text-1)] bg-[var(--bg-4)] border border-[var(--border-3)] hover:bg-[var(--bg-3)]"
                }`}
              >
                Join waitlist →
              </a>
            </div>
          ))}
        </div>

        <p className="font-mono text-[0.57rem] tracking-[0.1em] text-[var(--text-4)] text-center mt-6 uppercase">
          Waitlist members get founder pricing · Locked in permanently · No card required
        </p>
      </div>
    </section>
  );
}

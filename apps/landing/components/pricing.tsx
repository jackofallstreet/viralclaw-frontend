const tiers = [
  {
    tier: "Solo",
    tag: "For independent creators",
    desc: "Research, strategy, production, and distribution — all six agents running your content operation end to end.",
    features: [
      "Trend & Intelligence Agent",
      "Strategy Agent — content briefs & calendars",
      "Production Agent — scripts, threads, Shorts",
      "Distribution — multi-platform scheduling",
      "Analytics Agent — performance cycles",
    ],
    featured: false,
  },
  {
    tier: "Pro",
    tag: "Most requested",
    desc: "Everything in Solo plus persistent Brand DNA memory, Revenue Agent, and unlimited output volume.",
    features: [
      "Everything in Solo",
      "Brand DNA — persistent creator memory",
      "Revenue Agent — monetization & sponsorship ops",
      "Unlimited briefs, assets, and analyses",
      "Extended platform integrations",
      "Priority support",
    ],
    featured: true,
  },
  {
    tier: "Team",
    tag: "For lean content teams",
    desc: "Multi-profile support, shared memory, team review workflows, and custom agent configuration.",
    features: [
      "Everything in Pro",
      "Up to 3 creator profiles",
      "Team review & approval flows",
      "Custom agent configuration",
      "Advanced Brand DNA per profile",
      "Dedicated onboarding",
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
            We're not publishing prices yet — the product isn't live. Join the waitlist and you'll be the first
            to know. Early access cohort gets founder pricing, locked in permanently.
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

              {/* Price placeholder */}
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

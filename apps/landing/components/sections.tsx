export function Belief() {
  return (
    <div className="py-[clamp(5rem,12vw,9rem)] px-[clamp(1.25rem,5vw,2.5rem)] text-center max-w-[860px] mx-auto">
      <p className="font-mono text-[0.58rem] tracking-[0.17em] uppercase mb-5" style={{ color: "var(--text-4)" }}>
        // What we believe
      </p>
      <p className="font-cond text-[clamp(1.8rem,5vw,3.8rem)] font-semibold uppercase leading-[1.08]" style={{ color: "var(--text-1)" }}>
        The edge belongs to those<br />
        <span style={{ color: "var(--accent)" }}>who see on-chain first</span><br />
        <span className="font-light" style={{ color: "var(--text-3)" }}>and move before the crowd.</span>
      </p>
      <div className="w-px h-[46px] mx-auto my-8" style={{ background: "var(--border-2)" }} />
      <p className="font-mono text-[0.58rem] tracking-[0.17em] uppercase" style={{ color: "var(--text-4)" }}>
        ViralClaw — Multi-Signal Intelligence Layer
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-[clamp(1.3rem,4vw,1.7rem)] px-[clamp(1.25rem,5vw,2.5rem)]" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row gap-4 items-center text-center md:text-left md:justify-between">
        <div className="font-cond text-[0.9rem] font-bold tracking-[0.12em] uppercase" style={{ color: "var(--text-3)" }}>
          Viral<span style={{ color: "var(--accent)" }}>Claw</span>
        </div>
        <ul className="flex gap-6 list-none flex-wrap justify-center">
          {[
            { href: "#how",     label: "How it works" },
            { href: "#signals", label: "Signals" },
            { href: "#access",  label: "Early access" },
            { href: "/docs",    label: "Docs" },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[0.56rem] tracking-[0.1em] uppercase no-underline transition-colors"
                style={{ color: "var(--text-4)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[0.54rem] tracking-[0.06em]" style={{ color: "var(--text-4)" }}>
          © 2025 ViralClaw
        </p>
      </div>
    </footer>
  );
}

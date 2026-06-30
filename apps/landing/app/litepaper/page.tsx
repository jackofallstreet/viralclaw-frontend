"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "abstract",      label: "Abstract" },
  { id: "context",       label: "Market context" },
  { id: "problem",       label: "The problem" },
  { id: "solution",      label: "The solution" },
  { id: "pillars",       label: "Core pillars" },
  { id: "architecture",  label: "Signal architecture" },
  { id: "intelligence",  label: "Intelligence engine" },
  { id: "outputs",       label: "Dual outputs" },
  { id: "users",         label: "Who uses it" },
  { id: "moat",          label: "Competitive moat" },
  { id: "monetization",  label: "Monetization" },
  { id: "roadmap",       label: "Roadmap" },
  { id: "vision",        label: "Long-term vision" },
];

function Anchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-[80px]" />;
}

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-cond font-extrabold uppercase leading-[0.9] tracking-tight text-[var(--text-1)] mb-5"
      style={{ fontSize: "clamp(2.2rem,5.5vw,3.6rem)" }}>
      {children}
    </h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-cond text-[1.35rem] font-bold uppercase tracking-[0.04em] text-[var(--text-1)] mt-10 mb-4 flex items-center gap-3">
      <span className="w-1 h-5 bg-[var(--accent)] inline-block shrink-0" />
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.91rem] text-[var(--text-2)] leading-[1.9] mb-5">{children}</p>;
}

function S({ children }: { children: React.ReactNode }) {
  return <strong className="text-[var(--text-1)] font-semibold">{children}</strong>;
}

function HR() {
  return <div className="h-px bg-[var(--border)] my-10" />;
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-[var(--accent)] pl-6 my-8">
      <p className="font-cond text-[clamp(1.15rem,2.8vw,1.6rem)] font-semibold leading-[1.35] text-[var(--text-1)] uppercase tracking-[0.02em]">
        {children}
      </p>
    </blockquote>
  );
}

function Divider({ n }: { n: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 mt-2">
      <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[var(--text-4)]">{n}</span>
      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] my-6">
      {children}
    </div>
  );
}

function Cell({ label, children, accent = false }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`p-5 hover:bg-[var(--bg-3)] transition-colors ${accent ? "bg-[var(--bg-3)]" : "bg-[var(--bg-2)]"}`}>
      <p className={`font-mono text-[0.54rem] tracking-[0.14em] uppercase mb-3 ${accent ? "text-[var(--accent)]" : "text-[var(--text-3)]"}`}>{label}</p>
      <div className="text-[0.86rem] text-[var(--text-2)] leading-[1.75]">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-5 bg-[var(--bg-2)] border border-[var(--border)]">
      <div className="font-cond text-[clamp(2rem,5vw,3rem)] font-extrabold text-[var(--accent)] uppercase leading-none mb-2">{value}</div>
      <div className="font-mono text-[0.56rem] tracking-[0.12em] uppercase text-[var(--text-3)]">{label}</div>
    </div>
  );
}

function List({ items, color = "crimson" }: { items: string[]; color?: "crimson"|"green"|"cyan" }) {
  const dot = { crimson: "text-[var(--accent)]", green: "text-[var(--green)]", cyan: "text-[var(--teal)]" }[color];
  return (
    <ul className="space-y-2 my-4">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 text-[0.84rem] text-[var(--text-2)]">
          <span className={`${dot} shrink-0 mt-[3px] text-[0.55rem]`}>▸</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Note({ children, type = "info" }: { children: React.ReactNode; type?: "info"|"warn"|"tip" }) {
  const t = {
    info: { c: "var(--cyan-light)", b: "var(--cyan-border)", bg: "var(--cyan-dim)", l: "Note" },
    warn: { c: "var(--amber)", b: "rgba(245,158,11,0.22)", bg: "var(--amber-dim)", l: "Important" },
    tip:  { c: "var(--green)", b: "var(--green-border)", bg: "var(--green-dim)", l: "Key insight" },
  }[type];
  return (
    <div className="my-6 p-5 border" style={{ borderColor: t.b, background: t.bg }}>
      <p className="font-mono text-[0.52rem] tracking-[0.16em] uppercase mb-2" style={{ color: t.c }}>{t.l}</p>
      <div className="text-[0.88rem] text-[var(--text-2)] leading-[1.85]">{children}</div>
    </div>
  );
}

export default function LitepaperPage() {
  const [active, setActive] = useState("abstract");
  const [tocOpen, setTocOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.current?.observe(el);
    });
    return () => observer.current?.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      <header style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)", backdropFilter: "blur(20px)", borderColor: "var(--border)" }} className="sticky top-0 z-50 h-[54px] border-b flex items-center justify-between px-[clamp(1rem,4vw,2rem)]">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-cond text-[0.9rem] font-bold tracking-[0.14em] uppercase text-[var(--text-1)] no-underline flex items-center gap-2">
            <span className="text-[var(--accent)]">⌬</span>ViralClaw
          </Link>
          <span className="text-[var(--text-4)] hidden sm:block">/</span>
          <span className="hidden sm:block font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[var(--text-4)]">litepaper v0.2</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/#access" className="font-mono text-[0.57rem] tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-3 py-[6px] no-underline hover:bg-[var(--accent-hover)] transition-colors">
            Get early access →
          </Link>
          <button type="button" onClick={() => setTocOpen(o => !o)}
            className="xl:hidden font-mono text-[0.55rem] uppercase text-[var(--text-2)] border border-[var(--border-2)] px-3 py-[6px]">
            {tocOpen ? "✕" : "Contents"}
          </button>
        </div>
      </header>

      {tocOpen && (
        <div className="xl:hidden fixed top-[54px] inset-x-0 z-40 border-b max-h-[65vh] overflow-y-auto" style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}>
          {SECTIONS.map((s, i) => (
            <button key={s.id} type="button" onClick={() => jump(s.id)}
              className={`w-full text-left flex items-center gap-4 px-5 py-3 border-b border-[var(--border)] last:border-0 transition-colors ${
                active === s.id ? "bg-[var(--bg-3)] text-[var(--text-1)]" : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}>
              <span className="font-mono text-[0.48rem] text-[var(--text-4)] shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[0.63rem] tracking-[0.03em]">{s.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="max-w-[1400px] mx-auto flex">

        <aside className="hidden xl:block w-[210px] shrink-0" style={{ borderRight: "1px solid var(--border)" }}>
          <div className="sticky top-[54px] py-10 pl-6 pr-4 max-h-[calc(100vh-54px)] overflow-y-auto">
            <p className="font-mono text-[0.46rem] tracking-[0.2em] uppercase text-[var(--text-4)] mb-5">Contents</p>
            {SECTIONS.map((s, i) => (
              <button key={s.id} type="button" onClick={() => jump(s.id)}
                className={`w-full text-left flex items-center gap-3 py-[7px] mb-[1px] pl-3 border-l-2 transition-all duration-150 ${
                  active === s.id
                    ? "border-[var(--accent)] text-[var(--text-1)]"
                    : "border-transparent text-[var(--text-4)] hover:text-[var(--text-3)]"
                }`}>
                <span className="font-mono text-[0.44rem] text-[var(--text-4)] shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[0.57rem] tracking-[0.02em]">{s.label}</span>
              </button>
            ))}
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="font-mono text-[0.48rem] tracking-[0.1em] uppercase text-[var(--text-4)]">ViralClaw</p>
              <p className="font-mono text-[0.46rem] text-[var(--text-4)] mt-1">Litepaper v0.2 — 2025</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,7vw,6rem)]">
          <div className="max-w-[680px]">

            {/* Cover */}
            <div className="mb-16 pb-16 border-b border-[var(--border)]">
              <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-[var(--accent)] flex items-center gap-2 mb-8">
                <span className="w-4 h-px bg-[var(--accent)]" />
                Litepaper — v0.2 — 2025
              </p>
              <h1 className="font-cond font-extrabold uppercase tracking-tight text-[var(--text-1)] leading-[0.88] mb-6"
                style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}>
                Viral<br /><span className="text-[var(--accent)]">Claw</span>
              </h1>
              <p className="font-cond text-[clamp(1rem,2.5vw,1.4rem)] font-light text-[var(--text-3)] uppercase tracking-[0.04em] mb-8">
                Multi-signal intelligence layer<br />for alpha and content — cross-ecosystem
              </p>
              <div className="grid grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
                <Stat value="17" label="Chains monitored" />
                <Stat value="&lt;400ms" label="Signal latency" />
                <Stat value="2" label="Actionable outputs" />
              </div>
            </div>

            {/* Abstract */}
            <Anchor id="abstract" />
            <Divider n="01" />
            <H1>Abstract</H1>
            <P>
              ViralClaw is a multi-signal intelligence layer specialized in capturing viral trends
              — with on-chain analysis as its core strength. It monitors 17 blockchains, social
              platforms, and narrative cycles in real time, and delivers two distinct actionable
              outputs: <S>participation alpha for degens</S> and{" "}
              <S>content intelligence for creators</S>.
            </P>
            <P>
              The system detects signals before they surface socially, scores them by trend
              velocity and cross-chain correlation, interprets the narrative behind the movement,
              and produces structured briefs — alpha for those who want to participate, content
              for those who want to publish first.
            </P>
            <Pull>
              On-chain first. Social second. Everyone else is reacting to what ViralClaw already surfaced.
            </Pull>
            <P>
              This litepaper describes the problem, the architecture, the dual-output model,
              and the long-term vision. It is a living document updated as the system evolves.
            </P>

            <HR />

            {/* Context */}
            <Anchor id="context" />
            <Divider n="02" />
            <H1>Market<br />context</H1>
            <P>
              The on-chain economy moves faster than any individual can track manually.
              Thousands of signals fire every hour — whale movements, bridge flows, DEX
              anomalies, new protocol deployments — and most of them become narratives that
              drive both price action and content cycles before the majority notices.
            </P>
            <H2>Three structural forces</H2>
            <Grid>
              <Cell label="Signal volume is overwhelming">
                The number of meaningful on-chain events per day exceeds what any analyst
                can track manually. The signal-to-noise ratio is getting worse. The people
                who win are those with better filters, not more screen time.
              </Cell>
              <Cell label="Social lag is measurable">
                On-chain signals consistently precede social narratives by hours. The gap
                between on-chain detection and social peak is the alpha window — and it's
                shrinking as more participants figure this out.
              </Cell>
              <Cell label="Content and alpha are the same signal">
                The same on-chain trend that drives alpha also drives viral content. Degens
                and creators are responding to identical underlying signals — they just need
                different outputs from the same intelligence.
              </Cell>
              <Cell label="Cross-chain complexity has exploded">
                Liquidity, narratives, and momentum now move across 17+ ecosystems simultaneously.
                Tracking one chain means missing the rotation. Cross-chain intelligence is the
                baseline requirement, not a premium feature.
              </Cell>
            </Grid>

            <HR />

            {/* Problem */}
            <Anchor id="problem" />
            <Divider n="03" />
            <H1>The<br />problem</H1>
            <P>
              Alpha is perishable. Content windows close in hours. The problem isn't that
              the signals aren't there — it's that no existing tool surfaces them early
              enough, interprets them correctly, and delivers them in a form you can act on.
            </P>
            <H2>Four breakdowns</H2>
            {[
              {
                label: "On-chain data is raw and uninterpretable at speed",
                body: "Block explorers, on-chain dashboards, and wallet trackers give you data — not intelligence. Interpreting raw on-chain activity into a narrative and a decision requires hours of manual synthesis that most participants don't have.",
              },
              {
                label: "Social signals lag on-chain by 4–8 hours on average",
                body: "By the time a trend hits Crypto Twitter or Farcaster with enough velocity to be noticed, the alpha window is already closing. The participants who win are those who detected the signal on-chain before it became a conversation.",
              },
              {
                label: "Cross-chain correlation is invisible to single-chain tools",
                body: "A play that starts on Ethereum and rotates to Base and Arbitrum is invisible if you're only watching one chain. Cross-chain liquidity flows, narrative bridges, and correlated wallet behavior require simultaneous multi-chain intelligence that no current tool provides well.",
              },
              {
                label: "Creators are reacting to trends, not leading them",
                body: "Web3 creators track Crypto Twitter for content ideas — which means they're operating on already-saturated narratives. The creators who win are those who surface the trend on-chain before it's social, and publish while the window is still open.",
              },
            ].map(item => (
              <details key={item.label} className="border border-[var(--border)] bg-[var(--bg-2)] group mb-2">
                <summary className="px-5 py-4 cursor-pointer font-mono text-[0.65rem] tracking-[0.04em] uppercase text-[var(--text-2)] group-open:text-[var(--text-1)] select-none list-none flex items-center justify-between">
                  {item.label}
                  <span className="text-[var(--accent)] group-open:rotate-45 transition-transform inline-block">+</span>
                </summary>
                <p className="px-5 pb-5 text-[0.85rem] text-[var(--text-2)] leading-[1.85]">{item.body}</p>
              </details>
            ))}

            <HR />

            {/* Solution */}
            <Anchor id="solution" />
            <Divider n="04" />
            <H1>The<br />solution</H1>
            <P>
              ViralClaw monitors 17 blockchains and major social platforms simultaneously,
              scores every signal by trend velocity and cross-chain correlation, interprets
              the narrative behind the movement, and delivers two structured outputs in
              under 400 milliseconds.
            </P>
            <Pull>
              Same signal. Two outputs. Degens act. Creators publish. Both win.
            </Pull>
            <H2>The four layers</H2>
            <Grid>
              <Cell label="01 — Ingestion" accent>
                Real-time indexing of 17 blockchains — wallet flows, bridge volumes, DEX
                activity, contract deployments — plus social velocity across Crypto Twitter,
                Farcaster, and Telegram.
              </Cell>
              <Cell label="02 — Scoring" accent>
                Proprietary trend velocity scoring: signal strength, wallet reputation,
                cross-chain correlation, and social lag measurement. Surfaces the 0.3%
                of signals that matter.
              </Cell>
              <Cell label="03 — Interpretation" accent>
                Maps the narrative behind the signal — what's moving, why, which ecosystems
                are involved, how long the window is likely to stay open, and what pattern
                it matches historically.
              </Cell>
              <Cell label="04 — Dual output" accent>
                High-conviction signals become alpha briefs for degens and content briefs
                for creators — simultaneously, in structured format, ready to act on.
              </Cell>
            </Grid>

            <HR />

            {/* Pillars */}
            <Anchor id="pillars" />
            <Divider n="05" />
            <H1>Core<br />pillars</H1>
            {[
              {
                n: "01",
                label: "On-chain as primary source",
                color: "var(--cyan-light)",
                desc: "Social signals are derivative. On-chain activity is the primary source of truth. ViralClaw treats on-chain data as the signal origin and social velocity as confirmation — not the other way around.",
                items: [
                  "Wallet behavior precedes narrative — always track the money first",
                  "Bridge flows reveal cross-chain rotation before it becomes a discussion",
                  "DEX volume anomalies surface conviction before price moves",
                  "Smart contract deployments signal new narratives before launch",
                  "Social velocity used to time windows, not to discover signals",
                ],
              },
              {
                n: "02",
                label: "Cross-ecosystem intelligence",
                color: "var(--teal)",
                desc: "Alpha doesn't respect chain boundaries. ViralClaw monitors all major ecosystems simultaneously and correlates signals across them — because that's where the real opportunities live.",
                items: [
                  "17 chains indexed simultaneously in real time",
                  "Cross-chain correlation scoring on every signal",
                  "Liquidity rotation detection across ecosystems",
                  "Narrative bridge mapping — where a trend is heading next",
                  "Unified signal feed regardless of which chain it starts on",
                ],
              },
              {
                n: "03",
                label: "Dual output model",
                color: "var(--green)",
                desc: "The same underlying intelligence produces two distinct outputs. Degens get structured alpha briefs with participation context. Creators get content briefs with narrative angles and publish-window timing.",
                items: [
                  "Alpha briefs: signal, conviction, entry context, window estimate",
                  "Content briefs: narrative angle, audience hook, on-chain evidence, timing",
                  "Both outputs generated from the same scoring event",
                  "Delivered simultaneously via webhook, API, or in-app",
                  "Format optimized for action — not just information",
                ],
              },
            ].map(p => (
              <div key={p.n} className="mb-8 border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-4 border-b border-[var(--border)] bg-[var(--bg-2)]">
                  <span className="font-mono text-[0.48rem] text-[var(--text-4)]">{p.n}</span>
                  <span className="font-cond text-[1rem] font-bold uppercase tracking-[0.06em]" style={{ color: p.color }}>{p.label}</span>
                </div>
                <div className="p-5">
                  <P>{p.desc}</P>
                  <List items={p.items} color={p.n === "03" ? "green" : "cyan"} />
                </div>
              </div>
            ))}

            <HR />

            {/* Architecture */}
            <Anchor id="architecture" />
            <Divider n="06" />
            <H1>Signal<br />architecture</H1>
            <P>
              Six modules in the signal pipeline, each with a defined role. Raw on-chain
              data flows through ingestion, scoring, interpretation, and delivery.
              The dual output layer sits at the end — serving degens and creators
              from the same upstream intelligence.
            </P>
            <div className="my-6 overflow-x-auto border border-[var(--border)]">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="bg-[var(--bg-3)] border-b border-[var(--border)]">
                    {["Module", "Role", "Output"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-3)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "On-Chain Scanner", role: "Multi-chain real-time indexing", out: "RawSignal[]" },
                    { name: "Social Velocity Engine", role: "Narrative momentum tracking", out: "SocialSignal[]" },
                    { name: "Trend Scoring Model", role: "Signal strength + correlation", out: "ScoredSignal[]" },
                    { name: "Narrative Interpreter", role: "Context + window estimation", out: "IntelligenceEvent" },
                    { name: "Alpha Engine", role: "Degen participation brief generation", out: "AlphaBrief" },
                    { name: "Content Engine", role: "Creator brief + angle generation", out: "ContentBrief" },
                    { name: "Signal Memory", role: "Outcome tracking + model improvement", out: "SignalOutcome[]" },
                  ].map(row => (
                    <tr key={row.name} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-3)] transition-colors">
                      <td className="px-4 py-3 font-mono text-[0.65rem] text-[var(--accent)] align-top">{row.name}</td>
                      <td className="px-4 py-3 text-[0.75rem] text-[var(--text-2)] align-top">{row.role}</td>
                      <td className="px-4 py-3 font-mono text-[0.6rem] text-[var(--text-3)] align-top">{row.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Note type="tip">
              Signal Memory is what separates ViralClaw from a data feed. Every signal outcome
              — whether the alpha played out, how long the content window lasted, which chain
              the rotation went to — feeds back into the scoring model. The intelligence compounds.
            </Note>

            <HR />

            {/* Intelligence */}
            <Anchor id="intelligence" />
            <Divider n="07" />
            <H1>Intelligence<br />engine</H1>
            <P>
              The scoring model is what separates ViralClaw from a blockchain explorer or
              social aggregator. Every signal is evaluated across four dimensions before
              it reaches the output layer.
            </P>
            <H2>Scoring dimensions</H2>
            <Grid>
              <Cell label="Signal strength">Magnitude of the on-chain event — wallet size, transaction volume, bridge amount, DEX liquidity relative to historical baseline.</Cell>
              <Cell label="Wallet reputation">Smart money scoring based on historical performance. High-reputation wallets moving early carry more conviction weight than unknown addresses.</Cell>
              <Cell label="Cross-chain correlation">How many chains are showing the same pattern simultaneously. Correlated signals across 3+ ecosystems score significantly higher than single-chain anomalies.</Cell>
              <Cell label="Social lag measurement">How far ahead of social conversation the on-chain signal is. A signal that's 6h ahead of any social mention scores higher than one already circulating on CT.</Cell>
            </Grid>
            <H2>Window estimation</H2>
            <P>
              Every high-conviction signal includes an estimated participation and content window —
              how long before the signal is widely known and the opportunity closes. Window
              estimates are based on pattern matching against historical signals of similar
              type, magnitude, and cross-chain correlation.
            </P>

            <HR />

            {/* Dual outputs */}
            <Anchor id="outputs" />
            <Divider n="08" />
            <H1>Dual<br />outputs</H1>
            <P>
              The same intelligence event generates two structured outputs simultaneously.
              Both are designed to be immediately actionable — not raw data that requires
              further interpretation.
            </P>
            {[
              {
                label: "Alpha Brief — for degens",
                color: "var(--accent)",
                items: [
                  "Signal summary: what's moving and on which chains",
                  "Conviction score (1–10) with reasoning",
                  "Cross-chain correlation evidence",
                  "Estimated participation window (open/closing/closed)",
                  "Historical pattern match if applicable",
                  "Risk context: what would invalidate the signal",
                ],
              },
              {
                label: "Content Brief — for creators",
                color: "var(--teal)",
                items: [
                  "Narrative summary: the story behind the signal",
                  "3 content angle variants with hooks",
                  "On-chain evidence links (verifiable sources)",
                  "Social velocity context (how fast it's spreading)",
                  "Optimal publish window with urgency level",
                  "Audience framing: how to explain the on-chain origin",
                ],
              },
            ].map(output => (
              <div key={output.label} className="mb-8 border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-4 border-b border-[var(--border)] bg-[var(--bg-2)]">
                  <span className="font-cond text-[1rem] font-bold uppercase tracking-[0.06em]" style={{ color: output.color }}>{output.label}</span>
                </div>
                <div className="p-5">
                  <List items={output.items} color={output.color === "var(--accent)" ? "crimson" : "cyan"} />
                </div>
              </div>
            ))}

            <HR />

            {/* Users */}
            <Anchor id="users" />
            <Divider n="09" />
            <H1>Who<br />uses it</H1>
            {[
              {
                label: "On-chain degens",
                color: "var(--accent)",
                value: "Alpha hunters who need to identify high-conviction plays before the crowd arrives. ViralClaw gives them structured, scored briefs — not raw data they have to interpret under pressure.",
              },
              {
                label: "Web3 creators and analysts",
                color: "var(--teal)",
                value: "Content creators, newsletter writers, and analysts who publish on-chain narratives. ViralClaw gives them the trend before it's Twitter-native, with the evidence and angles packaged for their audience.",
              },
              {
                label: "DeFi funds and trading desks",
                color: "var(--green)",
                value: "Professional operations that need systematic cross-chain signal coverage. API integration, custom filtering, and private intelligence layers for ecosystem-specific focus.",
              },
            ].map(u => (
              <div key={u.label} className="mb-4 border border-[var(--border)] p-5 bg-[var(--bg-2)]">
                <div className="font-cond text-[0.9rem] font-bold uppercase tracking-[0.06em] mb-3" style={{ color: u.color }}>{u.label}</div>
                <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8]">{u.value}</p>
              </div>
            ))}

            <HR />

            {/* Moat */}
            <Anchor id="moat" />
            <Divider n="10" />
            <H1>Competitive<br />moat</H1>
            <P>
              The defensible advantage is Signal Memory — the compounding intelligence layer
              that improves outcome prediction over time. Competitors can copy features.
              They can't copy six months of signal outcome data.
            </P>
            <Grid>
              <Cell label="Signal memory compounds">Every outcome — whether alpha played, how long the content window lasted, which chain the rotation went to — improves the scoring model. The system gets materially better with each cycle.</Cell>
              <Cell label="Cross-chain depth">17-chain simultaneous coverage with correlation scoring is a significant infrastructure investment. Point solutions for single chains can't replicate the cross-ecosystem intelligence layer.</Cell>
              <Cell label="Dual output moat">Serving both degens and creators from the same intelligence makes ViralClaw uniquely positioned. Neither segment has a tool built for their specific output format from on-chain intelligence.</Cell>
              <Cell label="Timing advantage">The gap between on-chain detection and social peak is the product. As Signal Memory improves window estimation accuracy, the timing advantage compounds for every user.</Cell>
            </Grid>

            <HR />

            {/* Monetization */}
            <Anchor id="monetization" />
            <Divider n="11" />
            <H1>Monetization</H1>
            <P>
              Tiered subscription model tied directly to output type and signal volume.
              No ads, no data selling, no token mechanics.
            </P>
            {[
              {
                label: "Degen tier",
                desc: "Full signal stack — on-chain scanner, cross-ecosystem correlation, trend scoring, and structured alpha briefs. Delivered via webhook, Telegram, and API. Priced for individuals and small operations.",
              },
              {
                label: "Creator tier",
                desc: "Everything in Degen plus the full content intelligence layer — narrative briefs, angle variants, evidence links, and publish-window timing. For Web3 content creators, analysts, and newsletter writers.",
              },
              {
                label: "Studio / fund tier",
                desc: "Multi-seat access, custom chain and ecosystem filters, private intelligence layer configuration, REST API endpoints with higher rate limits, and dedicated support. For funds, trading desks, and content studios.",
              },
            ].map(m => (
              <div key={m.label} className="mb-4 border border-[var(--border)] bg-[var(--bg-2)] p-5">
                <div className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-[var(--accent)] mb-2">{m.label}</div>
                <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8]">{m.desc}</p>
              </div>
            ))}

            <HR />

            {/* Roadmap */}
            <Anchor id="roadmap" />
            <Divider n="12" />
            <H1>Roadmap</H1>
            {[
              {
                phase: "Phase 1 — Signal foundation",
                status: "In progress",
                color: "var(--amber)",
                items: [
                  { done: true,  l: "Architecture and signal pipeline design" },
                  { done: true,  l: "On-chain scanner — ETH, SOL, BASE, ARB (core chains)" },
                  { done: true,  l: "Trend scoring model v1" },
                  { done: false, l: "Alpha brief generation — alpha" },
                  { done: false, l: "Content brief generation — alpha" },
                  { done: false, l: "First cohort (30–50 users) onboarded" },
                ],
              },
              {
                phase: "Phase 2 — Full signal stack",
                status: "Planned",
                color: "var(--cyan-light)",
                items: [
                  { done: false, l: "17-chain coverage — full ecosystem expansion" },
                  { done: false, l: "Social velocity engine — CT, Farcaster, Telegram" },
                  { done: false, l: "Cross-chain correlation scoring v2" },
                  { done: false, l: "Signal Memory — outcome tracking and model improvement" },
                  { done: false, l: "API endpoints and webhook delivery" },
                ],
              },
              {
                phase: "Phase 3 — Intelligence compounding",
                status: "Future",
                color: "var(--text-4)",
                items: [
                  { done: false, l: "Private intelligence layers for funds and studios" },
                  { done: false, l: "Custom ecosystem and chain filters" },
                  { done: false, l: "Community signal contributions — verified alpha feed" },
                  { done: false, l: "Window estimation v3 based on Signal Memory" },
                ],
              },
            ].map(phase => (
              <div key={phase.phase} className="mb-6 border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--bg-3)] px-5 py-3 flex items-center justify-between border-b border-[var(--border)]">
                  <span className="font-cond text-[0.9rem] font-bold uppercase tracking-[0.06em] text-[var(--text-1)]">{phase.phase}</span>
                  <span className="font-mono text-[0.52rem] tracking-[0.1em] uppercase px-2 py-[2px] border" style={{ color: phase.color, borderColor: phase.color }}>{phase.status}</span>
                </div>
                <ul className="divide-y divide-[var(--border)]">
                  {phase.items.map(item => (
                    <li key={item.l} className="px-5 py-3 flex items-center gap-3 text-[0.82rem]">
                      <span style={{ color: item.done ? "var(--green)" : "var(--text-4)" }}>{item.done ? "✓" : "○"}</span>
                      <span style={{ color: item.done ? "var(--text-2)" : "var(--text-4)" }}>{item.l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <HR />

            {/* Vision */}
            <Anchor id="vision" />
            <Divider n="13" />
            <H1>Long-term<br />vision</H1>
            <P>
              The version of ViralClaw described in this litepaper is an intelligence layer.
              The version we are building toward is infrastructure — the foundational signal
              layer that the next generation of on-chain participants and Web3 content
              operators is built on top of.
            </P>
            <Pull>
              The edge goes to those who see on-chain first.<br />
              ViralClaw is built to make that permanent.
            </Pull>
            <P>
              In the Phase 3 vision, Signal Memory has accumulated enough outcome data to
              predict not just that a signal is high-conviction — but which specific window
              timing, which chains it will rotate to, and how long the content narrative
              will have staying power. The intelligence compounds until the gap between
              ViralClaw users and everyone else is structural.
            </P>

            {/* Closing */}
            <div className="mt-16 pt-10 border-t border-[var(--border)]">
              <div className="bg-[var(--bg-2)] border border-[var(--border)] p-6">
                <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-[var(--accent)] mb-4 flex items-center gap-2">
                  <span className="w-3 h-px bg-[var(--accent)]" />Early access
                </p>
                <p className="font-cond text-[1.6rem] font-bold uppercase leading-[1.1] text-[var(--text-1)] mb-4">
                  Join the first cohort
                </p>
                <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8] mb-6 max-w-[48ch]">
                  30–50 degens and creators. Founder pricing, permanently. Direct access to the
                  team. Real influence over what gets built next. No credit card required to apply.
                </p>
                <Link
                  href="/#access"
                  className="inline-flex font-mono text-[0.63rem] font-medium tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-6 py-3 no-underline hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Get early access →
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--text-4)]">
                <span>© 2025 ViralClaw</span>
                <span>Litepaper v0.2</span>
                <span>Subject to change</span>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

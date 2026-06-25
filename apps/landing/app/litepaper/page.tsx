"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "abstract",     label: "Abstract" },
  { id: "context",      label: "Market context" },
  { id: "problem",      label: "The problem" },
  { id: "solution",     label: "The solution" },
  { id: "pillars",      label: "Core pillars" },
  { id: "agents",       label: "Agent architecture" },
  { id: "intelligence", label: "Intelligence engine" },
  { id: "users",        label: "Who uses it" },
  { id: "moat",         label: "Competitive moat" },
  { id: "monetization", label: "Monetization" },
  { id: "roadmap",      label: "Roadmap" },
  { id: "vision",       label: "Long-term vision" },
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
    warn: { c: "var(--amber)",      b: "rgba(245,158,11,0.22)", bg: "var(--amber-dim)", l: "Important" },
    tip:  { c: "var(--green)",      b: "var(--green-border)", bg: "var(--green-dim)", l: "Key insight" },
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

      {/* Top bar */}
      <header style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)", backdropFilter: "blur(20px)", borderColor: "var(--border)" }} className="sticky top-0 z-50 h-[54px] border-b flex items-center justify-between px-[clamp(1rem,4vw,2rem)]">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-cond text-[0.9rem] font-bold tracking-[0.14em] uppercase text-[var(--text-1)] no-underline flex items-center gap-2">
            <span className="text-[var(--accent)]">⌬</span>ViralClaw
          </Link>
          <span className="text-[var(--text-4)] hidden sm:block">/</span>
          <span className="hidden sm:block font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[var(--text-4)]">litepaper v0.1</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/#access" className="font-mono text-[0.57rem] tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-3 py-[6px] no-underline hover:bg-[var(--accent-hover)] transition-colors">
            Join waitlist →
          </Link>
          <button type="button" onClick={() => setTocOpen(o => !o)}
            className="xl:hidden font-mono text-[0.55rem] uppercase text-[var(--text-2)] border border-[var(--border-2)] px-3 py-[6px]">
            {tocOpen ? "✕" : "Contents"}
          </button>
        </div>
      </header>

      {/* Mobile TOC */}
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

        {/* Desktop TOC */}
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
              <p className="font-mono text-[0.46rem] text-[var(--text-4)] mt-1">Litepaper v0.1 — 2025</p>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,7vw,6rem)]">
          <div className="max-w-[680px]">

            {/* Cover */}
            <div className="mb-16 pb-16 border-b border-[var(--border)]">
              <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-[var(--accent)] flex items-center gap-2 mb-8">
                <span className="w-4 h-px bg-[var(--accent)]" />
                Litepaper — v0.1 — 2025
              </p>
              <h1 className="font-cond font-extrabold uppercase tracking-tight text-[var(--text-1)] leading-[0.88] mb-6"
                style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}>
                Viral<br /><span className="text-[var(--accent)]">Claw</span>
              </h1>
              <p className="font-cond text-[clamp(1rem,2.5vw,1.4rem)] font-light text-[var(--text-3)] uppercase tracking-[0.04em] mb-8">
                Infrastructure for the next generation<br />of AI-native creators
              </p>
              <div className="grid grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
                <Stat value="6" label="Specialized agents" />
                <Stat value="24/7" label="Autonomous operation" />
                <Stat value="∞" label="Improvement cycles" />
              </div>
            </div>

            {/* Abstract */}
            <Anchor id="abstract" />
            <Divider n="01" />
            <H1>Abstract</H1>
            <P>
              ViralClaw is an autonomous operating system for AI-native creators. It replaces the
              manual overhead of research, strategy, production, repurposing, distribution, and analytics
              with a coordinated system of six specialized agents — running continuously, learning from
              every cycle, and operating within human-defined review gates.
            </P>
            <P>
              The creator economy is reaching a structural inflection point. The creators who will
              dominate the next decade are not those with the biggest teams — they are those with
              the best infrastructure. ViralClaw is being built to be that infrastructure.
            </P>
            <Pull>
              The future belongs to creators who operate like organizations — without building teams.
            </Pull>
            <P>
              This litepaper describes the problem, the architecture, and the long-term vision.
              It is a living document and will be updated as the system evolves.
            </P>

            <HR />

            {/* Market context */}
            <Anchor id="context" />
            <Divider n="02" />
            <H1>Market<br />context</H1>
            <P>
              The creator economy generates hundreds of billions of dollars in value annually —
              yet the tools creators use to operate have not kept pace with the scale of the
              opportunity. Most creators still run their channels the way they did in 2018:
              manually, reactively, and at significant personal cost.
            </P>
            <H2>The structural shift</H2>
            <P>
              Three forces are converging to create a new class of creator-operator:
            </P>
            <Grid>
              <Cell label="AI production capability">
                Large language models can now produce high-quality scripts, threads, and repurposed
                content at a fraction of the cost of human labor — but only when directed by real
                niche intelligence and brand context.
              </Cell>
              <Cell label="Audience fragmentation">
                Audiences exist across YouTube, X, LinkedIn, TikTok, Instagram, and email simultaneously.
                The creators who win are those who can distribute coherently across all of them
                without a full production team.
              </Cell>
              <Cell label="Trend windows shrinking">
                Format trends, narrative cycles, and viral patterns move faster than ever. The window
                between signal detection and content saturation is weeks, not months. Creators
                operating manually are systematically late.
              </Cell>
              <Cell label="The team advantage eroding">
                AI agents can now perform research, writing, scheduling, and analytics functions that
                previously required dedicated headcount. The structural advantage of large creator
                teams is eroding. Infrastructure is the new moat.
              </Cell>
            </Grid>

            <HR />

            {/* Problem */}
            <Anchor id="problem" />
            <Divider n="03" />
            <H1>The<br />problem</H1>
            <P>
              The information is out there. The trends are forming. The audience is waiting.
              The problem is that no existing tool connects signal to strategy to production to
              distribution — and the gap between them is where opportunity and consistency die.
            </P>
            <H2>Four breakdowns</H2>
            {[
              {
                label: "Research is manual and disconnected",
                body: "To stay on top of a niche today, a creator is checking YouTube Analytics, watching competitors, scanning X, reading newsletters, and tracking what's working — manually, in real time, under constant pressure. None of these surfaces talk to each other. The creator is the synthesis layer.",
              },
              {
                label: "Production is a bottleneck, not a flow",
                body: "Writing a script, reformatting it for Shorts, repurposing it to a thread, scheduling across platforms — each step is manual. The overhead forces creators to publish less than they should and repurpose almost nothing. Volume and consistency are sacrificed to capacity.",
              },
              {
                label: "AI tools have no niche memory",
                body: "General-purpose AI writing tools produce generic output because they don't know the creator's audience, voice, what's worked historically, or what's trending in their specific niche today. Every session starts from scratch. They're text generators, not creator infrastructure.",
              },
              {
                label: "Analytics don't close the loop",
                body: "Performance data exists in platform dashboards but is never synthesized into the next strategy decision. Creators look at their numbers reactively and draw conclusions manually. The feedback loop that should improve every content decision is broken.",
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
              ViralClaw replaces the manual creator workflow with a coordinated multi-agent system
              that runs continuously, learns from every cycle, and surfaces the right output at the
              right time — in the creator's voice, tuned to their audience.
            </P>
            <P>
              The system is not a co-pilot that waits for prompts. It is an autonomous OS that
              runs missions: decomposing goals into ordered tasks, executing them across specialized
              agents, pausing at human review gates, and feeding performance data back into the
              intelligence layer.
            </P>
            <Pull>
              One creator. Six agents. One continuous loop that gets smarter every cycle.
            </Pull>
            <H2>The four layers</H2>
            <Grid>
              <Cell label="01 — Discovery" accent>
                Real-time YouTube format intelligence. Niche signals, trend detection, competitor
                pattern analysis, upload timing — aggregated and interpreted continuously.
              </Cell>
              <Cell label="02 — Strategy" accent>
                Turns intelligence into briefs, title variants, and content calendars. Scored
                against Brand DNA and historical performance. Ready for human review.
              </Cell>
              <Cell label="03 — Production" accent>
                Scripts, Shorts, threads, carousels, and emails — generated in the creator's
                voice using persistent Brand DNA. All output requires human approval.
              </Cell>
              <Cell label="04 — Distribution & learning" accent>
                Schedules and publishes approved content. Pulls performance metrics. Updates Brand
                DNA. Feeds signals back into the next intelligence cycle.
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
                label: "Persistent Brand DNA",
                color: "var(--cyan-light)",
                desc: "The intelligence layer that makes the system creator-specific. Brand DNA encodes voice, audience profile, content pillars, and format performance — and is updated after every analytics cycle. The system improves automatically.",
                items: [
                  "Creator voice — tone, style, phrasing patterns",
                  "Audience profile — who they are, what resonates",
                  "Format performance — what works for this creator's audience",
                  "Content pillars — positioning and topic coherence",
                  "Updated automatically by Analytics Agent each cycle",
                ],
              },
              {
                n: "02",
                label: "YouTube intelligence",
                color: "var(--teal)",
                desc: "The Trend & Intelligence Agent monitors format patterns, hook structures, upload timing, and competitor signals across thousands of channels in your niche — and interprets them against your Brand DNA.",
                items: [
                  "Format pattern detection — what's working right now",
                  "Hook analysis — openings retaining viewers past 30s",
                  "Upload timing — when your audience is most engaged",
                  "Competitor signal detection — what's accelerating or declining",
                  "Ranked opportunity reports with plain-language explanations",
                ],
              },
              {
                n: "03",
                label: "Human review gates",
                color: "var(--green)",
                desc: "All publishing actions flow through explicit human approval. The system never publishes without a status: approved flag. Creators stay in control of what goes out — the agents handle the volume.",
                items: [
                  "Briefs require approval before Production runs",
                  "Content assets require approval before Distribution runs",
                  "Sponsorship actions always require human confirmation",
                  "Gates are hard-coded — cannot be disabled",
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
                  <List items={p.items} color={p.n === "01" ? "cyan" : p.n === "02" ? "cyan" : "green"} />
                </div>
              </div>
            ))}

            <HR />

            {/* Agents */}
            <Anchor id="agents" />
            <Divider n="06" />
            <H1>Agent<br />architecture</H1>
            <P>
              Six specialized agents coordinated by an Orchestrator. Each agent has a defined
              role, a set of tools, and writes to the shared memory system after every task.
              The Orchestrator handles decomposition, routing, review gates, and error recovery.
            </P>
            <div className="my-6 overflow-x-auto border border-[var(--border)]">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="bg-[var(--bg-3)] border-b border-[var(--border)]">
                    {["Agent","Role","Key output"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-3)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Orchestrator", role: "Mission decomposition + routing", out: "AgentTask[] + review gates" },
                    { name: "Trend & Intelligence", role: "YouTube + social signal detection", out: "IntelligenceReport" },
                    { name: "Strategy", role: "Brief and calendar generation", out: "ContentBrief[] + ContentCalendar" },
                    { name: "Production", role: "Content writing in brand voice", out: "ContentAsset[] (status: review)" },
                    { name: "Distribution", role: "Scheduling + publishing", out: "ScheduledPost[]" },
                    { name: "Analytics", role: "Performance cycles + memory updates", out: "PerformanceCycle + BrandDNA update" },
                    { name: "Revenue", role: "Monetization + sponsorship matching", out: "RevenueOpportunity[]" },
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
              All agents share a persistent memory system: Qdrant (vector embeddings), Neo4j
              (Brand DNA graph), Redis (active state cache), and Supabase (structured data).
              Memory is what makes the system improve — not just automate.
            </Note>

            <HR />

            {/* Intelligence */}
            <Anchor id="intelligence" />
            <Divider n="07" />
            <H1>Intelligence<br />engine</H1>
            <P>
              The Trend & Intelligence Agent is what separates ViralClaw from generic AI writing
              tools. It monitors your niche in real time — not general internet content — and
              interprets signals through the lens of your Brand DNA.
            </P>
            <H2>What it monitors</H2>
            <Grid>
              <Cell label="Format patterns">YouTube format trends across thousands of channels in your niche — thumbnail style, title structure, hook type, video length, pacing.</Cell>
              <Cell label="Upload timing">When top performers publish and when your audience is most engaged. Not generic averages — your niche, your audience.</Cell>
              <Cell label="Hook intelligence">Which opening structures retain viewers past 30 seconds right now. Updated continuously, not quarterly.</Cell>
              <Cell label="Competitor signals">Channel-level performance shifts — what's accelerating, what's declining, which formats are being copied across the niche.</Cell>
            </Grid>
            <H2>Conviction scoring</H2>
            <P>
              Every opportunity is scored before it reaches the Strategy Agent. Conviction
              scoring combines signal strength (how strong is the trend?), audience fit (does
              this match the creator's audience?), and window timing (how much runway is left?).
              Only high-conviction opportunities make it into the brief queue.
            </P>

            <HR />

            {/* Users */}
            <Anchor id="users" />
            <Divider n="08" />
            <H1>Who<br />uses it</H1>
            {[
              {
                label: "Solo creators",
                color: "var(--cyan-light)",
                value: "ViralClaw gives solo creators the research, strategy, and production capacity of a full team — without the overhead. The system runs while you focus on vision and high-value creation.",
              },
              {
                label: "Small creator teams",
                color: "var(--green)",
                value: "Teams use ViralClaw to multiply output across multiple channels simultaneously. Each channel gets its own Brand DNA, content calendar, and analytics cycle. Headcount stays flat; output scales.",
              },
              {
                label: "Creator studios",
                color: "var(--teal)",
                value: "Studios manage multiple creator brands with consistent quality and brand coherence. The intelligence layer becomes a shared asset across the whole roster.",
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
            <Divider n="09" />
            <H1>Competitive<br />moat</H1>
            <P>
              The defensible advantage of ViralClaw is not the individual AI capabilities —
              those are commoditizing. The moat is the compound learning system: Brand DNA
              that gets more accurate with every cycle, and niche intelligence that improves
              as more data flows through it.
            </P>
            <H2>Why switching costs are high</H2>
            <Grid>
              <Cell label="Brand DNA accumulation">Every analytics cycle enriches the creator's Brand DNA. A creator who has run 6 months of cycles has a model that deeply understands their voice, audience, and format performance. That model doesn't transfer to a competitor.</Cell>
              <Cell label="Niche model depth">The intelligence engine builds a deep model of the creator's specific niche over time — format patterns, competitor trajectories, audience behavior cycles. This is not replicable from a standing start.</Cell>
              <Cell label="Workflow integration">Creators who integrate ViralClaw into their production process restructure how they work. The switching cost is not just data — it's workflow and habit.</Cell>
              <Cell label="Compounding output quality">Content quality improves each cycle as Brand DNA becomes more precise. Creators experience this as a product that gets better over time — rare in SaaS.</Cell>
            </Grid>

            <HR />

            {/* Monetization */}
            <Anchor id="monetization" />
            <Divider n="10" />
            <H1>Monetization</H1>
            <P>
              ViralClaw monetizes through a tiered subscription model directly tied to platform
              value — no ads, no data selling, no token mechanics.
            </P>
            {[
              {
                label: "Subscription — core",
                desc: "Three tiers: Solo Creator (full agent loop, single channel), Pro (multi-channel, team access, priority support), and Enterprise (API access, custom Brand DNA models, private intelligence layers). Subscription revenue is the foundation — predictable, scalable, directly tied to product value.",
              },
              {
                label: "Revenue agent — performance fees",
                desc: "The Revenue Agent surfaces sponsorship matches and monetization opportunities. As this layer matures, ViralClaw earns a small percentage from facilitated deals — aligning platform revenue with creator success.",
              },
              {
                label: "API and integrations",
                desc: "Enterprise and studio customers access ViralClaw's intelligence and production APIs directly. Custom integrations, white-label Brand DNA models, and private niche intelligence layers are Phase 3 revenue streams.",
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
            <Divider n="11" />
            <H1>Roadmap</H1>
            {[
              {
                phase: "Phase 1 — Foundation",
                status: "In progress",
                color: "var(--amber)",
                items: [
                  { done: true,  l: "Architecture and agent definitions" },
                  { done: true,  l: "Brand DNA model and memory system design" },
                  { done: true,  l: "YouTube intelligence pipeline" },
                  { done: false, l: "Strategy + Production agents — alpha" },
                  { done: false, l: "Command Center dashboard — alpha" },
                  { done: false, l: "First cohort (30–50 creators) onboarded" },
                ]
              },
              {
                phase: "Phase 2 — Full agent loop",
                status: "Planned",
                color: "var(--cyan-light)",
                items: [
                  { done: false, l: "Distribution agent — multi-platform publishing" },
                  { done: false, l: "Analytics agent — automated performance cycles" },
                  { done: false, l: "Repurposing pipeline — auto-derivative generation" },
                  { done: false, l: "Revenue agent — sponsorship matching" },
                  { done: false, l: "Agent-triggered workflows with user-defined conditions" },
                ]
              },
              {
                phase: "Phase 3 — Scale & intelligence",
                status: "Future",
                color: "var(--text-4)",
                items: [
                  { done: false, l: "Multi-channel management for studios" },
                  { done: false, l: "API access and custom integrations" },
                  { done: false, l: "Intelligence marketplace — community signal contributions" },
                  { done: false, l: "Enterprise and studio dashboards" },
                ]
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
            <Divider n="12" />
            <H1>Long-term<br />vision</H1>
            <P>
              The version of ViralClaw described in this litepaper is a tool. The version we are
              building toward is infrastructure — the foundational layer that the next generation
              of creator-operators is built on top of.
            </P>
            <P>
              The long-term vision is for ViralClaw to become the operating system for AI-native
              creators — the platform on which the coordination between attention, content, audience,
              and revenue runs autonomously and continuously.
            </P>
            <Pull>
              The creator who wins is not the one with the most talent.<br />
              It's the one with the best infrastructure.
            </Pull>
            <P>
              In the Phase 3 vision, creators define goals and constraints. Agents handle execution.
              Brand DNA compounds indefinitely. The intelligence layer becomes a shared community
              asset — contributors surface signals, the system synthesizes them, and every creator
              in the network benefits.
            </P>
            <P>
              This is not a roadmap item with a date attached. It is the direction. Every product
              decision between now and then is evaluated against whether it moves toward or away
              from that architecture.
            </P>
            <H2>The thesis in one sentence</H2>
            <Pull>
              The future belongs to creators who operate like organizations —
              without building teams.
            </Pull>
            <P>ViralClaw is being built to be that infrastructure.</P>

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
                  30–50 creators and teams. Founder pricing, permanently. Direct access to the
                  team. Real influence over what gets built next. No credit card required to apply.
                </p>
                <Link
                  href="/#access"
                  className="inline-flex font-mono text-[0.63rem] font-medium tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-6 py-3 no-underline hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Join the waitlist →
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--text-4)]">
                <span>© 2025 ViralClaw</span>
                <span>Litepaper v0.1</span>
                <span>Subject to change</span>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

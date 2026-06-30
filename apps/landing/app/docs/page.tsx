"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

// ─────────────────────────────────────────────
// Navigation structure
// ─────────────────────────────────────────────

const NAV = [
  {
    group: "The case for synchronization",
    pages: [
      { id: "what-is-synchronization", label: "What is synchronization?" },
      { id: "why-it-matters",          label: "Why it matters" },
      { id: "the-problem",             label: "The problem with current tools" },
    ],
  },
  {
    group: "The intelligence layer",
    pages: [
      { id: "how-viralclaw-works",  label: "How ViralClaw works" },
      { id: "signal-architecture",  label: "Signal architecture" },
      { id: "what-we-measure",      label: "What we measure" },
      { id: "dual-outputs",         label: "Dual outputs" },
    ],
  },
  {
    group: "Signal modules",
    pages: [
      { id: "on-chain-scanner",        label: "On-chain scanner" },
      { id: "narrative-engine",        label: "Narrative engine" },
      { id: "cross-chain-correlation", label: "Cross-chain correlation" },
      { id: "signal-memory",           label: "Signal memory" },
    ],
  },
  {
    group: "Who it's for",
    pages: [
      { id: "for-degens",   label: "Degens" },
      { id: "for-creators", label: "Creators" },
      { id: "for-funds",    label: "Funds & studios" },
    ],
  },
  {
    group: "Product",
    pages: [
      { id: "roadmap", label: "Roadmap" },
      { id: "access",  label: "Early access" },
    ],
  },
];

const ALL_PAGES = NAV.flatMap(g => g.pages);

const SEARCH_INDEX: { id: string; terms: string }[] = [
  { id: "what-is-synchronization", terms: "what is synchronization conviction networks belief independent signals" },
  { id: "why-it-matters",          terms: "why matters markets reprice attention scarce economy" },
  { id: "the-problem",             terms: "problem current tools dashboards analytics lag single dimension" },
  { id: "how-viralclaw-works",     terms: "how viralclaw works pipeline convergence detection output" },
  { id: "signal-architecture",     terms: "signal architecture modules pipeline stack ingestion scoring" },
  { id: "what-we-measure",         terms: "what measure on-chain social narrative creator wallet liquidity" },
  { id: "dual-outputs",            terms: "dual outputs alpha briefs content briefs degens creators simultaneous" },
  { id: "on-chain-scanner",        terms: "on-chain scanner chains ethereum solana base arbitrum wallets bridges dex" },
  { id: "narrative-engine",        terms: "narrative engine propagation escape diffusion social velocity" },
  { id: "cross-chain-correlation", terms: "cross-chain correlation multi-ecosystem rotation liquidity convergence" },
  { id: "signal-memory",           terms: "signal memory outcome tracking feedback compounding model improvement" },
  { id: "for-degens",              terms: "degens alpha hunters on-chain traders participation window conviction" },
  { id: "for-creators",            terms: "creators web3 content newsletter analysts publish narrative timing" },
  { id: "for-funds",               terms: "funds studios trading desks api enterprise custom ecosystem" },
  { id: "roadmap",                 terms: "roadmap phases launch timeline plans chains" },
  { id: "access",                  terms: "access waitlist pricing early cohort founder" },
];

function search(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SEARCH_INDEX
    .filter(p =>
      p.terms.includes(q) ||
      ALL_PAGES.find(x => x.id === p.id)?.label.toLowerCase().includes(q)
    )
    .map(p => p.id);
}

// ─────────────────────────────────────────────
// Design primitives
// ─────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline group" aria-label="ViralClaw home">
      <Image
        src="/viralclaw_avi.png"
        alt="ViralClaw"
        width={22}
        height={22}
        className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <span
        className="font-cond text-[0.88rem] font-bold tracking-[0.14em] uppercase"
        style={{ color: "var(--text-1)" }}
      >
        ViralClaw
      </span>
    </Link>
  );
}

function Eyebrow({ children, color = "accent" }: { children: React.ReactNode; color?: "accent" | "teal" | "muted" }) {
  const c = { accent: "var(--accent)", teal: "var(--teal)", muted: "var(--text-4)" }[color];
  return (
    <p
      className="font-mono text-[0.54rem] tracking-[0.22em] uppercase mb-5 flex items-center gap-3"
      style={{ color: c }}
    >
      <span className="w-5 h-px inline-block" style={{ background: c }} />
      {children}
    </p>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="font-cond font-extrabold uppercase leading-[0.88] tracking-tight mb-8"
      style={{ fontSize: "clamp(2.6rem,6vw,4.2rem)", color: "var(--text-1)" }}
    >
      {children}
    </h1>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="leading-[1.95] mb-10"
      style={{ fontSize: "clamp(1rem,2.2vw,1.08rem)", color: "var(--text-2)", maxWidth: "54ch" }}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-cond font-bold uppercase tracking-[0.04em] mt-14 mb-5 flex items-center gap-3"
      style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "var(--text-1)" }}
    >
      <span className="w-[3px] h-5 inline-block shrink-0" style={{ background: "var(--accent)" }} />
      {children}
    </h2>
  );
}

function Body({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <p
      className="leading-[1.92] mb-5"
      style={{
        fontSize: "0.91rem",
        color: "var(--text-2)",
        maxWidth: wide ? "none" : "60ch",
      }}
    >
      {children}
    </p>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="not-italic font-semibold" style={{ color: "var(--text-1)" }}>{children}</em>;
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--accent)" }}>{children}</span>;
}

function HR() {
  return <div className="my-12" style={{ height: 1, background: "var(--border)" }} />;
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-10 pl-6 py-1"
      style={{ borderLeft: "2px solid var(--accent)" }}
    >
      <p
        className="font-cond font-semibold uppercase leading-[1.25]"
        style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)", color: "var(--text-1)" }}
      >
        {children}
      </p>
    </blockquote>
  );
}

function Note({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "tip" | "warn";
}) {
  const t = {
    info: { c: "var(--teal)",  b: "var(--teal-border)",  bg: "var(--teal-dim)",  l: "Note" },
    tip:  { c: "var(--green)", b: "var(--green-border)", bg: "var(--green-dim)", l: "Key insight" },
    warn: { c: "var(--amber)", b: "var(--amber-border)", bg: "var(--amber-dim)", l: "Heads up" },
  }[type];
  return (
    <div className="my-8 p-5 border" style={{ borderColor: t.b, background: t.bg }}>
      <p className="font-mono text-[0.5rem] tracking-[0.18em] uppercase mb-2" style={{ color: t.c }}>{t.l}</p>
      <div className="text-[0.87rem] leading-[1.85]" style={{ color: "var(--text-2)" }}>{children}</div>
    </div>
  );
}

function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  return (
    <div
      className={`grid gap-px my-8 border`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
        background: "var(--border)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}

function Cell({
  label,
  children,
  accent = false,
  labelColor,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
  labelColor?: string;
}) {
  return (
    <div
      className="p-5 transition-colors"
      style={{ background: accent ? "var(--bg-3)" : "var(--bg-2)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-3)")}
      onMouseLeave={e => (e.currentTarget.style.background = accent ? "var(--bg-3)" : "var(--bg-2)")}
    >
      <p
        className="font-mono text-[0.52rem] tracking-[0.14em] uppercase mb-3"
        style={{ color: labelColor || "var(--accent)" }}
      >
        {label}
      </p>
      <div className="text-[0.85rem] leading-[1.78]" style={{ color: "var(--text-2)" }}>
        {children}
      </div>
    </div>
  );
}

function FlowStep({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-10 pb-10 ml-3" style={{ borderLeft: "1px solid var(--border)" }}>
      <div
        className="absolute -left-3 top-0 w-6 h-6 flex items-center justify-center font-mono text-[0.5rem]"
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent)",
        }}
      >
        {n}
      </div>
      <div
        className="font-cond font-semibold uppercase tracking-[0.04em] mb-2"
        style={{ fontSize: "0.95rem", color: "var(--text-1)", marginTop: "-1px" }}
      >
        {label}
      </div>
      <div className="text-[0.83rem] leading-[1.82]" style={{ color: "var(--text-2)", maxWidth: "52ch" }}>
        {children}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-5 border" style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}>
      <div
        className="font-cond font-extrabold uppercase leading-none mb-2"
        style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--accent)" }}
      >
        {value}
      </div>
      <div className="font-mono text-[0.52rem] tracking-[0.12em] uppercase" style={{ color: "var(--text-4)" }}>
        {label}
      </div>
    </div>
  );
}

function CompareRow({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div
      className="mb-px grid gap-px"
      style={{
        gridTemplateColumns: "120px 1fr 1fr",
        background: "var(--border)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="p-3 font-mono text-[0.52rem] tracking-[0.1em] uppercase"
        style={{ background: "var(--bg-3)", color: "var(--accent)" }}
      >
        {label}
      </div>
      <div className="p-3 text-[0.77rem] leading-[1.65]" style={{ background: "var(--bg-2)", color: "var(--text-4)" }}>
        {before}
      </div>
      <div className="p-3 text-[0.77rem] leading-[1.65]" style={{ background: "var(--bg-2)", color: "var(--green)" }}>
        {after}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page content
// ─────────────────────────────────────────────

function WhatIsSynchronization() {
  return (
    <>
      <Eyebrow>The case for synchronization</Eyebrow>
      <PageTitle>What is<br />synchronization?</PageTitle>
      <Lede>
        Markets don't move because people pay attention. They move because independent
        participants begin expressing the same conviction — before everyone else notices.
        That emergence is synchronization, and it is the signal ViralClaw is built to detect.
      </Lede>

      <Body>
        Synchronization is what happens when the same belief begins spreading across
        disconnected networks without centralized coordination. It's not trend — trend is
        already visible. Synchronization is the moment <Em>before</Em> the trend, when
        conviction is forming but hasn't yet become obvious to the crowd.
      </Body>
      <Body>
        A wallet cluster starts accumulating. A narrative appears on Farcaster. A creator
        in a niche community publishes a thread. A Discord goes quiet in a specific way.
        Individually, none of these signals mean much. When they start happening at the
        same time, in independent communities, without coordination — that is the signal.
      </Body>

      <Pull>
        Attention is abundant.<br />Synchronization is scarce.<br />Scarcity is what markets price.
      </Pull>

      <H2>The rarest observable event</H2>
      <Body>
        The internet is full of attention. Millions of posts, thousands of tokens, hundreds
        of narratives compete every day. Most of it dissipates inside the community where it
        was born. A meme stays in one subreddit. A token stays in one Telegram group.
        A creator stays in one niche.
      </Body>
      <Body>
        Occasionally, an idea <Em>escapes</Em>. It jumps from on-chain behavior to social
        conversation to creator content to mainstream attention — and as it crosses each
        boundary, it accumulates more conviction. Each crossing is a synchronization event.
        And each one is observable before the repricing begins.
      </Body>

      <HR />
      <H2>What synchronization looks like</H2>
      <Grid cols={2}>
        <Cell label="Early signal">
          Smart money wallets accumulate quietly. Bridge volumes from one ecosystem to
          another start increasing. DEX liquidity shifts in ways that don't yet make
          headlines.
        </Cell>
        <Cell label="Social emergence">
          Independent researchers and creators in different communities begin writing about
          the same theme — without apparent coordination. Engagement velocity rises faster
          than follower count growth.
        </Cell>
        <Cell label="Narrative propagation">
          The idea begins appearing in places it wasn't before. Cross-platform diffusion.
          Community remix. The vocabulary of the narrative starts becoming shared across
          previously disconnected groups.
        </Cell>
        <Cell label="Conviction formation">
          Independent participants who have never interacted begin expressing the same
          belief. Markets haven't moved yet. The window is still open. This is the
          moment ViralClaw is built to surface.
        </Cell>
      </Grid>

      <Note type="tip">
        Synchronization is not virality. Virality is retrospective — it describes what
        already happened. Synchronization is observable in the formation stage, before
        the market has priced it in.
      </Note>
    </>
  );
}

function WhyItMatters() {
  return (
    <>
      <Eyebrow>The case for synchronization</Eyebrow>
      <PageTitle>Why it<br />matters</PageTitle>
      <Lede>
        Every breakout starts small. The vast majority remain trapped inside the community
        where they were born. The few that escape share one observable characteristic:
        they synchronized across independent networks before anyone was watching.
      </Lede>

      <Body>
        This isn't a crypto-native insight. It's a structural property of how markets built
        on attention work — and its relevance extends far beyond DeFi. Memecoins. AI narratives.
        Open-source projects. Consumer apps. Elections. Fashion. Internet culture. Any system
        where ideas compete for capital eventually rewards synchronized conviction.
      </Body>
      <Body>
        The difference between a project that reprices and one that doesn't is rarely
        quality. It's synchronization. The projects that accumulate belief across independent
        communities before they accumulate universal attention are the ones that move markets.
      </Body>

      <Pull>
        Ideas don't go viral.<br />They escape.<br />ViralClaw measures the escape.
      </Pull>

      <H2>Where this plays out</H2>
      <Grid cols={3}>
        <Cell label="On-chain" labelColor="var(--teal)">
          Wallet clusters form convictions before narratives surface. Smart money moves
          before Crypto Twitter writes the thread. Capital is the most honest signal.
        </Cell>
        <Cell label="Social" labelColor="var(--teal)">
          Independent creators begin covering the same theme across disconnected platforms.
          The narrative crosses communities. Vocabulary becomes shared. Cross-platform
          diffusion is measurable before it's obvious.
        </Cell>
        <Cell label="Creator ecosystems" labelColor="var(--teal)">
          Certain creators don't follow trends — they initiate them. Tracking which creators
          begin expressing conviction before the narrative peaks is itself a high-signal input.
        </Cell>
        <Cell label="Liquidity" labelColor="var(--amber)">
          Economic conviction follows narrative conviction. Bridge flows increase before
          price action. DEX depth shifts before volume spikes. Liquidity moves with belief.
        </Cell>
        <Cell label="Community formation" labelColor="var(--amber)">
          The moment when strangers in different communities begin using the same language
          to describe the same idea without having coordinated is a measurable synchronization
          event.
        </Cell>
        <Cell label="Cultural reinforcement" labelColor="var(--amber)">
          Meme velocity. Remix adoption. Cross-community participation. Culture is a
          leading indicator when you measure its spread, not just its volume.
        </Cell>
      </Grid>

      <H2>The current edge</H2>
      <Body>
        Right now, the gap between on-chain signal detection and social narrative peak is
        measurable and consistent — averaging 4 to 8 hours. The participants who operate in
        that window have a structural edge that most tools don't support. ViralClaw is built
        to operate in that window, and to make it accessible to both alpha hunters and
        content creators simultaneously.
      </Body>

      <div className="grid grid-cols-3 gap-3 my-8">
        <Stat value="4–8h" label="Avg. lead time on-chain vs social" />
        <Stat value="17" label="Chains indexed simultaneously" />
        <Stat value="&lt;400ms" label="Detection to delivery latency" />
      </div>
    </>
  );
}

function TheProblem() {
  return (
    <>
      <Eyebrow>The case for synchronization</Eyebrow>
      <PageTitle>The problem<br />with current<br />tools</PageTitle>
      <Lede>
        Every existing tool measures one dimension of the signal and calls it intelligence.
        Block explorers show wallets. Social tools show engagement. On-chain dashboards show
        liquidity. None of them observe how these dimensions begin reinforcing one another.
        That convergence is where synchronization lives — and it's invisible to the tools
        that exist.
      </Lede>

      <H2>Four fundamental gaps</H2>

      <div className="space-y-2 my-8">
        {[
          {
            label: "A — On-chain data is raw at the speed that matters",
            body: "Block explorers and on-chain dashboards surface data, not intelligence. Interpreting what a wallet cluster, a bridge volume anomaly, or a DEX pattern actually means — in the context of a forming narrative — requires hours of manual synthesis that most participants simply don't have. By the time the synthesis is complete, the window is often closing.",
          },
          {
            label: "B — Social signals arrive after the trade",
            body: "By the time a narrative hits Crypto Twitter with enough velocity to be recognized as a trend, the alpha window is already compressing. The 4 to 8 hour gap between on-chain signal emergence and social narrative peak is not a quirk — it's a structural property of how information spreads through sequential communities rather than simultaneously across them.",
          },
          {
            label: "C — Cross-chain intelligence doesn't exist in practice",
            body: "A rotation that starts on Ethereum and moves to Base and Arbitrum is completely invisible to a tool that monitors one chain. Cross-chain liquidity flows, correlated wallet behavior, and narrative bridges require simultaneous multi-chain intelligence — not switching between dashboards and inferring connections manually.",
          },
          {
            label: "D — Alpha and content are treated as separate problems",
            body: "The degen who wants to identify a high-conviction play and the creator who wants to publish a narrative before it peaks are responding to the exact same underlying signal. Every existing tool serves one audience. ViralClaw is built on the observation that the intelligence is the same — the outputs are different. Both deserve to be served simultaneously from the same source.",
          },
        ].map(item => (
          <details
            key={item.label}
            className="border group"
            style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
          >
            <summary
              className="px-5 py-4 cursor-pointer font-mono text-[0.63rem] tracking-[0.04em] uppercase select-none list-none flex items-center justify-between"
              style={{ color: "var(--text-3)" }}
            >
              <span className="group-open:text-[var(--text-1)] transition-colors">{item.label}</span>
              <span className="group-open:rotate-45 transition-transform inline-block" style={{ color: "var(--accent)" }}>+</span>
            </summary>
            <p className="px-5 pb-5 text-[0.86rem] leading-[1.87]" style={{ color: "var(--text-2)" }}>
              {item.body}
            </p>
          </details>
        ))}
      </div>

      <HR />

      <H2>What existing tools measure</H2>
      <div className="overflow-x-auto my-6 border" style={{ borderColor: "var(--border)" }}>
        <table className="w-full" style={{ minWidth: 580 }}>
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--bg-3)" }}>
              {["Tool", "What it measures", "What it misses"].map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[0.5rem] tracking-[0.12em] uppercase"
                  style={{ color: "var(--text-3)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { tool: "Block explorers",   does: "Raw transaction data",               miss: "Narrative context, scoring, convergence" },
              { tool: "Nansen / Arkham",   does: "Wallet labelling + tracking",        miss: "Cross-chain correlation, dual output" },
              { tool: "Social dashboards", does: "Engagement and follower metrics",    miss: "On-chain correlation, 4–8h lag is baked in" },
              { tool: "Dune / Flipside",   does: "Custom on-chain analytics",          miss: "Real-time scoring, narrative interpretation" },
              { tool: "AI writing tools",  does: "Content generation",                 miss: "Live signal intelligence, timing" },
            ].map(row => (
              <tr
                key={row.tool}
                className="border-b last:border-0 transition-colors"
                style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-3)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-2)")}
              >
                <td className="px-4 py-3 font-mono text-[0.63rem]" style={{ color: "var(--text-1)" }}>{row.tool}</td>
                <td className="px-4 py-3 text-[0.73rem]" style={{ color: "var(--text-2)" }}>{row.does}</td>
                <td className="px-4 py-3 text-[0.73rem]" style={{ color: "var(--accent)" }}>{row.miss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Body>
        ViralClaw doesn't compete with any of these tools. It observes the layer they
        all fail to measure: <Em>how independent signals converge into collective conviction.</Em>
      </Body>
    </>
  );
}

function HowViralClawWorks() {
  return (
    <>
      <Eyebrow>The intelligence layer</Eyebrow>
      <PageTitle>How<br />ViralClaw<br />works</PageTitle>
      <Lede>
        ViralClaw continuously monitors the interaction between on-chain behavior, social
        networks, content ecosystems, and liquidity — not to find what's already trending,
        but to identify when independent networks begin agreeing with one another before the
        market notices.
      </Lede>

      <Body>
        The system doesn't ask "what is trending?" It asks a different question: what
        independent networks are beginning to believe at the same time? That distinction
        is the entire product. Trend is retrospective. Synchronization is a present-tense
        observable event — and a computable one.
      </Body>

      <Pull>
        Same signal.<br />Two outputs.<br />Degens act. Creators publish. Both win.
      </Pull>

      <H2>The pipeline</H2>
      <div className="mt-8 mb-4">
        {[
          {
            n: "01",
            label: "Multi-signal ingestion",
            body: "17 blockchains indexed in real time alongside social platforms, creator ecosystems, and narrative channels. On-chain is the primary signal source. Social is used for velocity measurement and convergence confirmation — not signal discovery.",
          },
          {
            n: "02",
            label: "Cross-network convergence scoring",
            body: "Every signal is evaluated across four dimensions: on-chain strength, wallet reputation, cross-chain correlation, and social lag. The scoring model identifies the 0.3% of signals where independent networks are beginning to agree — before that agreement is visible to casual observers.",
          },
          {
            n: "03",
            label: "Narrative interpretation",
            body: "The intelligence layer maps the context behind the convergence: what's moving, which ecosystems are involved, what historical patterns it resembles, and how long the participation window is estimated to stay open. This is what separates a scored signal from actionable intelligence.",
          },
          {
            n: "04",
            label: "Dual output generation",
            body: "Every high-conviction synchronization event simultaneously produces an alpha brief for degens and a content brief for creators — from the same upstream intelligence, with no additional latency between them. Both outputs are structured, not raw.",
          },
          {
            n: "05",
            label: "Delivery",
            body: "Briefs delivered via in-app feed, webhook, Telegram, and API. Sub-400ms from detection to delivery. Window urgency level and conviction score included with every brief.",
          },
          {
            n: "06",
            label: "Signal Memory update",
            body: "Every outcome — whether the alpha played out, how long the content window lasted, which chain the rotation went to — feeds back into the scoring model. The intelligence compounds. Six months of Signal Memory produces materially better window estimates than week-one coverage.",
          },
        ].map(s => (
          <FlowStep key={s.n} n={s.n} label={s.label}>{s.body}</FlowStep>
        ))}
      </div>

      <Note type="tip">
        Signal Memory is the compounding moat. Every competitor can build a scanner.
        Nobody can copy six months of outcome data that continuously improves scoring accuracy.
      </Note>
    </>
  );
}

function SignalArchitecture() {
  return (
    <>
      <Eyebrow>The intelligence layer</Eyebrow>
      <PageTitle>Signal<br />architecture</PageTitle>
      <Lede>
        Seven modules in the intelligence stack — each with a defined role, each feeding
        the next. The dual output layer sits at the end, serving degens and creators
        simultaneously from the same upstream intelligence.
      </Lede>

      <H2>Module overview</H2>
      <Grid cols={2}>
        <Cell label="Signal Orchestrator" accent>
          Routes raw signals from all sources to the scoring model. Manages review gates,
          delivery sequencing, and the feedback loop to Signal Memory. The coordination
          layer the rest of the stack runs on.
        </Cell>
        <Cell label="On-Chain Scanner" accent>
          Real-time indexing across 17 blockchains — wallet flows, bridge volumes, DEX
          anomalies, and contract deployments. The primary signal source. Everything
          downstream depends on the quality of this layer.
        </Cell>
        <Cell label="Narrative Engine">
          Tracks how ideas evolve, escape community boundaries, and propagate across
          platforms. Measures social velocity, cross-platform diffusion, and creator
          adoption velocity as confirmation signals.
        </Cell>
        <Cell label="Trend Scoring Model">
          Combines on-chain strength, wallet reputation, cross-chain correlation, and
          social lag into a single conviction score per signal. Only high-conviction signals
          proceed to output generation.
        </Cell>
        <Cell label="Alpha Engine">
          Converts high-conviction synchronization events into structured participation
          briefs for degens — signal summary, conviction score, cross-chain map, window
          estimate, and risk context.
        </Cell>
        <Cell label="Content Engine">
          Converts the same synchronization event into creator-ready intelligence —
          narrative summary, three content angle variants, on-chain evidence links, and
          optimal publish-window timing.
        </Cell>
        <Cell label="Signal Memory">
          The feedback layer that makes everything improve. Tracks signal outcomes over
          time and continuously updates the scoring model, wallet reputation scores, and
          window estimation accuracy.
        </Cell>
      </Grid>

      <H2>Data flow</H2>
      <div className="border overflow-x-auto my-6" style={{ borderColor: "var(--border)" }}>
        <table className="w-full" style={{ minWidth: 500 }}>
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--bg-3)" }}>
              {["Stage", "Input", "Output"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[0.5rem] tracking-[0.12em] uppercase" style={{ color: "var(--text-3)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { stage: "Ingestion",       input: "Raw on-chain + social streams",     out: "RawSignal[]" },
              { stage: "Scoring",         input: "RawSignal[] + wallet reputation",   out: "ScoredSignal[]" },
              { stage: "Interpretation",  input: "ScoredSignal[] + pattern history",  out: "IntelligenceEvent" },
              { stage: "Alpha output",    input: "IntelligenceEvent",                 out: "AlphaBrief" },
              { stage: "Content output",  input: "IntelligenceEvent",                 out: "ContentBrief" },
              { stage: "Memory update",   input: "AlphaBrief + ContentBrief + outcome", out: "SignalOutcome[] → model update" },
            ].map(row => (
              <tr
                key={row.stage}
                className="border-b last:border-0 transition-colors"
                style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-3)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-2)")}
              >
                <td className="px-4 py-3 font-mono text-[0.63rem]" style={{ color: "var(--accent)" }}>{row.stage}</td>
                <td className="px-4 py-3 text-[0.73rem]" style={{ color: "var(--text-2)" }}>{row.input}</td>
                <td className="px-4 py-3 font-mono text-[0.6rem]" style={{ color: "var(--text-3)" }}>{row.out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function WhatWeMeasure() {
  return (
    <>
      <Eyebrow>The intelligence layer</Eyebrow>
      <PageTitle>What we<br />measure</PageTitle>
      <Lede>
        ViralClaw is not another social analytics platform. It is not another on-chain
        dashboard. It is not another sentiment tracker. It measures synchronization itself —
        by observing how independent signals converge into collective conviction.
      </Lede>

      <Body>
        Each signal dimension ViralClaw monitors is meaningless in isolation. A single
        wallet accumulating is noise. A social post gaining traction is noise. A creator
        covering a narrative is noise. But when these signals begin occurring simultaneously
        across independent networks — that is the observable event that precedes repricing.
      </Body>

      <H2>Signal dimensions</H2>
      <Grid cols={2}>
        <Cell label="On-chain wallet behavior" labelColor="var(--teal)">
          Smart money positioning. Position size changes. New activations from known addresses.
          Coordinated accumulation patterns across wallets that don't share public connections.
        </Cell>
        <Cell label="Holder distribution" labelColor="var(--teal)">
          How conviction is spreading through the holder base over time. Concentration vs.
          diffusion. Early accumulator profiles vs. late entrant patterns.
        </Cell>
        <Cell label="Liquidity evolution" labelColor="var(--teal)">
          DEX depth changes. Bridge flow direction and magnitude. Liquidity migration
          between ecosystems as conviction begins shifting capital cross-chain.
        </Cell>
        <Cell label="Narrative propagation" labelColor="var(--amber)">
          How ideas spread across platforms. The velocity of cross-community diffusion.
          When a narrative starts using the same vocabulary in independent communities
          without coordinated seeding.
        </Cell>
        <Cell label="Creator adoption velocity" labelColor="var(--amber)">
          Which creators begin expressing conviction on a narrative before its social peak.
          Creator-as-signal: certain creators consistently initiate synchronization
          rather than follow it.
        </Cell>
        <Cell label="Community remix velocity" labelColor="var(--amber)">
          How fast a meme, framing, or narrative is being adapted and remixed across
          communities. Remix velocity is a leading indicator of how deeply a narrative
          is embedding itself.
        </Cell>
        <Cell label="Cross-platform diffusion" labelColor="var(--accent)">
          The moment an idea crosses from one platform to another is measurable. From
          on-chain behavior to Farcaster to Crypto Twitter to TikTok — each crossing
          is a synchronization event.
        </Cell>
        <Cell label="Temporal convergence" labelColor="var(--accent)">
          Independent signals arriving within the same time window is itself informative.
          Temporal clustering across unrelated data sources is the most reliable leading
          indicator of synchronization.
        </Cell>
      </Grid>

      <Note type="info">
        None of these dimensions matter independently. Their convergence does. ViralClaw's
        scoring model weights the interaction between dimensions — not any single dimension
        in isolation.
      </Note>
    </>
  );
}

function DualOutputs() {
  return (
    <>
      <Eyebrow>The intelligence layer</Eyebrow>
      <PageTitle>Dual<br />outputs</PageTitle>
      <Lede>
        The same synchronization event produces two structured outputs simultaneously.
        One for the degen who wants to participate before the crowd arrives. One for the
        creator who wants to publish before the narrative peaks. Both outputs are immediately
        actionable — not raw data that requires further interpretation.
      </Lede>

      <Pull>
        The intelligence is the same.<br />The outputs are different.<br />Both arrive in under 400ms.
      </Pull>

      <H2>Alpha brief — for degens</H2>
      <Body>
        Every high-conviction synchronization event generates a structured participation brief.
        Not a raw data dump. Not a chart. A structured document that answers the questions
        a degen needs answered to make a fast, informed decision.
      </Body>
      <Grid cols={2}>
        <Cell label="Signal summary">
          What's moving and where. Plain language description of the on-chain event —
          which wallets, which chains, what pattern it matches historically.
        </Cell>
        <Cell label="Conviction score">
          1–10 score with reasoning. Breakdown of which scoring dimensions contributed
          most. High scores require convergence across multiple dimensions.
        </Cell>
        <Cell label="Cross-chain map">
          Which ecosystems the signal appears on. Bridge flow direction. Where the
          rotation vector appears to be heading based on historical pattern matching.
        </Cell>
        <Cell label="Window estimate">
          How long before the signal is widely known — open, closing soon, or closing.
          Based on Signal Memory pattern matching against historical synchronization events.
        </Cell>
        <Cell label="Risk context" accent>
          What would invalidate the thesis. What to watch for if the synchronization
          signal doesn't play out as expected. Conviction without risk context is noise.
        </Cell>
      </Grid>

      <HR />

      <H2>Content brief — for creators</H2>
      <Body>
        The same signal becomes a content opportunity. A creator who publishes on a
        narrative before its social peak has a structural first-mover advantage — higher
        engagement, lower competition, and the authority of being early on the story.
        The content brief is built to make that possible without requiring the creator
        to do the on-chain research themselves.
      </Body>
      <Grid cols={2}>
        <Cell label="Narrative summary">
          The story behind the on-chain signal in language your audience can understand.
          What's happening, why it matters, and what the on-chain evidence actually shows.
        </Cell>
        <Cell label="Content angle variants">
          Three distinct angles for covering the same narrative — different hooks, different
          framings, different audience entry points. Not one obvious take: three considered ones.
        </Cell>
        <Cell label="On-chain evidence links">
          Verifiable sources — transaction links, wallet addresses, bridge data — that ground
          your content in first-hand evidence rather than secondhand social takes.
        </Cell>
        <Cell label="Social velocity context">
          How fast the narrative is spreading socially, how far ahead the on-chain signal is,
          and what the urgency level is for the publish window.
        </Cell>
        <Cell label="Publish window" accent>
          Optimal publish timing with urgency indicator — open, publish soon, or closing.
          Based on when similar narratives reached social saturation historically.
        </Cell>
      </Grid>
    </>
  );
}

function OnChainScanner() {
  return (
    <>
      <Eyebrow>Signal modules</Eyebrow>
      <PageTitle>On-chain<br />scanner</PageTitle>
      <Lede>
        The primary signal source. Real-time indexing of 17 blockchains simultaneously.
        Everything downstream — scoring, interpretation, dual output — depends on the
        quality and latency of what gets captured here.
      </Lede>

      <Body>
        On-chain is treated as the primary signal source because it is the most honest signal.
        Capital doesn't lie the way posts do. Wallet behavior doesn't lag the way social
        conversation does. When smart money moves, it moves before the narrative catches up —
        and the scanner is designed to detect that movement at the moment it begins, not after
        it's been picked up by aggregators.
      </Body>

      <H2>What gets indexed</H2>
      <Grid cols={2}>
        <Cell label="Wallet flows" labelColor="var(--teal)">
          Smart money wallet movements, position sizing changes, and new activations from
          known addresses. Wallet reputation scores updated continuously based on historical
          outcomes tracked by Signal Memory.
        </Cell>
        <Cell label="Bridge volumes" labelColor="var(--teal)">
          Cross-chain bridge activity — amounts, directions, frequency. Bridge flows are
          the most reliable leading indicator of liquidity rotation and cross-ecosystem
          conviction formation.
        </Cell>
        <Cell label="DEX anomalies" labelColor="var(--teal)">
          Volume spikes, liquidity additions, swap pattern changes relative to 30-day
          baseline. Anomalies are scored against historical patterns before being passed
          to the scoring model.
        </Cell>
        <Cell label="Contract deployments" labelColor="var(--teal)">
          New protocol launches, token deployments, and contract interactions by
          high-reputation wallets. Early interaction by known smart money is a high-signal
          event regardless of what the contract does.
        </Cell>
      </Grid>

      <H2>Phase 1 chain coverage</H2>
      <Body>
        Ethereum, Solana, Base, Arbitrum, Optimism, Polygon, Avalanche, BNB Chain.
        Phase 2 expands to 17 chains: Sui, Aptos, Starknet, zkSync, and additional
        EVM-compatible networks.
      </Body>

      <Note type="info">
        Chain expansion is driven by where smart money and liquidity are rotating —
        not by ecosystem partnerships or marketing relationships.
      </Note>
    </>
  );
}

function NarrativeEngine() {
  return (
    <>
      <Eyebrow>Signal modules</Eyebrow>
      <PageTitle>Narrative<br />engine</PageTitle>
      <Lede>
        Tracks how ideas evolve, escape community boundaries, and propagate across
        independent networks. Social velocity is used as confirmation of on-chain signals —
        not as a discovery mechanism. The distinction matters.
      </Lede>

      <Body>
        Most social analytics tools use social volume and engagement as primary signals.
        ViralClaw inverts this: social velocity is a confirmation layer, not the source.
        When an on-chain signal is detected and scored, the narrative engine measures how
        far ahead of the social conversation it is — which is itself a scoring dimension
        and a window estimate input.
      </Body>

      <H2>What the narrative engine tracks</H2>
      <Grid cols={2}>
        <Cell label="Cross-platform diffusion">
          When a narrative begins appearing on Farcaster, Crypto Twitter, Telegram, and
          YouTube simultaneously — without apparent coordination — that crossing is a
          measurable synchronization event.
        </Cell>
        <Cell label="Social lag measurement">
          The distance between on-chain signal emergence and social narrative peak is
          measurable and consistent. The narrative engine quantifies that gap for every
          signal, which directly informs the window estimate in every alpha and content brief.
        </Cell>
        <Cell label="Creator adoption velocity">
          Which creators begin covering a narrative before its social peak. Some creators
          consistently initiate synchronization. Tracking their early adoption is itself
          a high-conviction secondary signal.
        </Cell>
        <Cell label="Vocabulary diffusion">
          When the same terminology starts appearing across previously disconnected
          communities without centralized seeding, that's a measurable marker of
          synchronization depth.
        </Cell>
      </Grid>

      <Note type="tip">
        The narrative engine is what separates a scanner from an intelligence layer.
        Raw on-chain data tells you what happened. The narrative engine tells you
        whether anyone outside the originating ecosystem has started caring yet.
      </Note>
    </>
  );
}

function CrossChainCorrelation() {
  return (
    <>
      <Eyebrow>Signal modules</Eyebrow>
      <PageTitle>Cross-chain<br />correlation</PageTitle>
      <Lede>
        Alpha doesn't respect chain boundaries. Conviction, liquidity, and narratives move
        across ecosystems simultaneously. Cross-chain correlation isn't an optional feature —
        it's a core scoring dimension. A single-chain signal scores lower than the same signal
        appearing across three correlated ecosystems.
      </Lede>

      <Body>
        The rotation that starts on Ethereum and moves to Base and Arbitrum is invisible to
        tools that monitor a single chain. The wallet cluster that appears on Solana before
        a narrative peaks on Crypto Twitter can only be observed if you're watching Solana
        when the narrative is still mostly on-chain. ViralClaw monitors all chains simultaneously
        and computes correlation scores across them — in real time, not retrospectively.
      </Body>

      <Pull>
        Single-chain tools see the destination.<br />ViralClaw sees the route.
      </Pull>

      <H2>What gets correlated</H2>
      <Grid cols={2}>
        <Cell label="Liquidity flows" labelColor="var(--teal)">
          Bridge volumes and directions across all indexed chains. Identifies rotation
          before it becomes a price event. When capital moves cross-chain, it moves
          with conviction.
        </Cell>
        <Cell label="Wallet patterns" labelColor="var(--teal)">
          The same wallet clusters appearing on multiple chains. When smart money
          coordinates across ecosystems, that coordination is the signal — regardless
          of what the underlying asset is.
        </Cell>
        <Cell label="Narrative bridges" labelColor="var(--amber)">
          Tokens, protocols, or narratives appearing in similar patterns across multiple
          ecosystems simultaneously. Cross-chain narrative correlation is a stronger
          conviction signal than single-chain narrative velocity.
        </Cell>
        <Cell label="Volume convergence" labelColor="var(--amber)">
          Correlated DEX volume spikes across chains. Single-chain anomalies score lower.
          Multi-chain convergence raises conviction substantially — because independent
          markets agreeing simultaneously is harder to manufacture.
        </Cell>
      </Grid>
    </>
  );
}

function SignalMemory() {
  return (
    <>
      <Eyebrow>Signal modules</Eyebrow>
      <PageTitle>Signal<br />memory</PageTitle>
      <Lede>
        The feedback layer that makes ViralClaw compound over time. Every signal outcome
        feeds back into the scoring model. The intelligence doesn't just accumulate — it
        improves. Six months of Signal Memory produces materially better window estimates
        and conviction scores than week-one coverage.
      </Lede>

      <Body>
        Signal Memory is the difference between a tool and an intelligence layer. Any
        sufficiently funded competitor can build a 17-chain scanner. Nobody can copy
        six months of outcome tracking that continuously reshapes how the scoring model
        weights signals, evaluates wallet reputation, and estimates window duration.
      </Body>
      <Body>
        This is the compounding moat. And it starts accumulating from the moment the
        first signal is processed.
      </Body>

      <Pull>
        Every outcome makes the next signal smarter.
      </Pull>

      <H2>What Signal Memory tracks</H2>
      <Grid cols={2}>
        <Cell label="Alpha signal outcomes">
          Did the signal lead to measurable price action? What was the timing relative
          to the brief delivery? Which conviction score thresholds were most predictive?
          Which chain correlation patterns had the best track record?
        </Cell>
        <Cell label="Content window accuracy">
          How long did the narrative sustain engagement before saturation? How accurate
          was the publish window estimate? Which narrative types had longer windows?
          Which peaked faster than the model predicted?
        </Cell>
        <Cell label="Chain rotation patterns">
          When a synchronization event starts on one chain, where does it rotate to?
          How long does the rotation typically take? What's the typical magnitude of
          the cross-chain follow-through?
        </Cell>
        <Cell label="Wallet reputation updates">
          Which wallets' early movements consistently preceded real outcomes? Reputation
          scores are updated continuously — a wallet that was unknown at week one may
          be high-reputation by month three.
        </Cell>
      </Grid>

      <Note type="tip">
        Signal Memory is why early cohort members have a compounding advantage. The
        intelligence layer they help train in Phase 1 is materially more accurate by
        the time Phase 2 ships.
      </Note>
    </>
  );
}

function ForDegens() {
  return (
    <>
      <Eyebrow>Who it's for</Eyebrow>
      <PageTitle>For<br />degens</PageTitle>
      <Lede>
        ViralClaw is built for on-chain alpha hunters who need to identify high-conviction
        plays before the crowd arrives — and who need structured intelligence, not raw data
        that requires interpretation under time pressure.
      </Lede>

      <Body>
        The degen's edge has always been speed and conviction. Both are constrained by
        current tools. Speed is constrained because most tools surface signals after they're
        already socially visible. Conviction is constrained because raw on-chain data
        requires synthesis that takes hours. ViralClaw removes both constraints: signals
        arrive before social visibility, and the synthesis is already done.
      </Body>

      <H2>What changes</H2>
      {[
        { label: "Discovery", before: "Monitoring block explorers, CT, and dashboards manually for hours", after: "High-conviction synchronization signals delivered as structured briefs under 400ms" },
        { label: "Cross-chain", before: "Missing rotations happening on chains you're not currently watching", after: "17-chain simultaneous coverage with cross-chain correlation scoring on every signal" },
        { label: "Conviction", before: "Gut-feel decisions under time pressure with incomplete context", after: "Scored, evidence-backed briefs with window estimates, risk context, and chain map" },
        { label: "Timing", before: "Discovering signals after social conversation has started — window already compressing", after: "On-chain first, an average of 4–8 hours ahead of social narrative peak" },
        { label: "Noise", before: "Thousands of signals requiring manual triage to find the ones worth acting on", after: "Only signals that score above conviction threshold reach you — the 0.3% that matter" },
      ].map(row => (
        <CompareRow key={row.label} {...row} />
      ))}

      <Note type="warn">
        Alpha briefs are intelligence, not financial advice. Window estimates are
        probabilistic based on historical pattern matching — not guarantees. Risk context
        is included with every brief precisely because conviction without risk context is
        still noise.
      </Note>
    </>
  );
}

function ForCreators() {
  return (
    <>
      <Eyebrow>Who it's for</Eyebrow>
      <PageTitle>For<br />creators</PageTitle>
      <Lede>
        ViralClaw is built for Web3 content creators, newsletter writers, and analysts
        who publish on-chain narratives — and who want to be first on a story, not
        reactive to it after the social conversation has already peaked.
      </Lede>

      <Body>
        The creator's edge has always been timing and point of view. Both are currently
        constrained by the same problem: most creators discover what to write about on
        Crypto Twitter — which means they're discovering it after the on-chain signal that
        originated the narrative is already 4 to 8 hours old. ViralClaw surfaces the
        narrative before its social peak, with the on-chain evidence already assembled,
        and three distinct angles to choose from.
      </Body>

      <H2>What changes</H2>
      {[
        { label: "Discovery", before: "Scanning CT for trending discussions — narratives already saturating", after: "On-chain narrative briefs 4–8h before social peak — first-mover position available" },
        { label: "Evidence", before: "Sourcing transaction screenshots and wallet links manually after the fact", after: "On-chain evidence links included in every content brief — verifiable, first-hand" },
        { label: "Angles", before: "One obvious angle everyone else in your feed is also writing", after: "Three distinct angle variants per narrative — different hooks, different audience framings" },
        { label: "Timing", before: "Publishing into peak saturation — competing with everyone who found the same CT thread", after: "Publish-window timing with urgency level — open, soon, or closing — based on historical data" },
        { label: "Grounding", before: "Writing about narratives without direct on-chain source material", after: "Every content brief includes verifiable on-chain sources that make your content authoritative" },
      ].map(row => (
        <CompareRow key={row.label} {...row} />
      ))}

      <Note type="tip">
        Content briefs are generated simultaneously with alpha briefs from the same
        synchronization event. No additional processing time — both arrive in under
        400ms from signal detection.
      </Note>
    </>
  );
}

function ForFunds() {
  return (
    <>
      <Eyebrow>Who it's for</Eyebrow>
      <PageTitle>For funds<br />&amp; studios</PageTitle>
      <Lede>
        DeFi funds, trading desks, and content studios need systematic cross-chain signal
        coverage at a scale that individual dashboard monitoring can't provide. API
        integration, custom signal configuration, and private intelligence layers for
        ecosystem-specific focus.
      </Lede>

      <H2>Team use cases</H2>
      <Grid cols={2}>
        <Cell label="Systematic signal coverage">
          Replace manual monitoring across multiple analysts with a single intelligence
          layer. Configurable chain filters, signal-type filters, and conviction thresholds.
          API endpoints with webhook delivery at your configured cadence.
        </Cell>
        <Cell label="Private intelligence layers">
          Custom signal configuration built to your ecosystem focus — specific chains,
          wallet clusters, token categories. Your intelligence layer, not a shared feed
          with your competitors.
        </Cell>
        <Cell label="Multi-seat access">
          Full team access to the same signal feed with individual alert configuration
          per seat. Each analyst configures their own conviction threshold and delivery
          preferences without affecting the team feed.
        </Cell>
        <Cell label="Content studio scale">
          Multiple creator profiles receiving simultaneous content briefs from the same
          signal event — each with ecosystem-specific framing and audience configuration.
          One intelligence layer serving an entire publishing operation.
        </Cell>
      </Grid>

      <Note type="info">
        Studio and fund tiers include REST API access, webhook endpoints, and custom
        onboarding.{" "}
        <Link href="/#access" className="underline underline-offset-2" style={{ color: "var(--teal)" }}>
          Join the waitlist →
        </Link>
      </Note>
    </>
  );
}

function Roadmap() {
  return (
    <>
      <Eyebrow>Product</Eyebrow>
      <PageTitle>Roadmap</PageTitle>
      <Lede>
        Building in phases. The intelligence layer compounds from Phase 1 — Signal Memory
        starts accumulating the moment the first signal is processed.
      </Lede>

      {[
        {
          phase: "Phase 1 — Signal foundation",
          status: "In progress",
          statusColor: "var(--amber)",
          desc: "The pipeline, the core scanner, and the first cohort. This phase establishes the intelligence layer and begins Signal Memory accumulation.",
          items: [
            { done: true,  l: "Architecture and signal pipeline design" },
            { done: true,  l: "On-chain scanner — core chains (ETH, SOL, BASE, ARB)" },
            { done: true,  l: "Trend scoring model v1" },
            { done: false, l: "Alpha brief generation — private alpha" },
            { done: false, l: "Content brief generation — private alpha" },
            { done: false, l: "First cohort (30–50 members) onboarded" },
          ],
        },
        {
          phase: "Phase 2 — Full signal stack",
          status: "Planned",
          statusColor: "var(--teal)",
          desc: "Full chain coverage, social velocity engine, and the API layer. The intelligence layer reaches production-grade coverage.",
          items: [
            { done: false, l: "17-chain coverage — full ecosystem expansion" },
            { done: false, l: "Narrative engine — social velocity + cross-platform diffusion" },
            { done: false, l: "Cross-chain correlation scoring v2" },
            { done: false, l: "Signal Memory — outcome tracking active" },
            { done: false, l: "REST API + webhook delivery endpoints" },
          ],
        },
        {
          phase: "Phase 3 — Intelligence compounding",
          status: "Future",
          statusColor: "var(--text-4)",
          desc: "Signal Memory has accumulated enough outcome data to materially improve window estimation and conviction accuracy. The moat becomes structural.",
          items: [
            { done: false, l: "Private intelligence layers for funds and studios" },
            { done: false, l: "Custom ecosystem and wallet cluster filters" },
            { done: false, l: "Window estimation v3 — Signal Memory driven" },
            { done: false, l: "Community signal contributions — verified alpha feed" },
          ],
        },
      ].map(phase => (
        <div key={phase.phase} className="mb-8 border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <div
            className="px-5 py-4 flex items-start justify-between gap-4 border-b"
            style={{ background: "var(--bg-3)", borderColor: "var(--border)" }}
          >
            <div>
              <div className="font-cond font-bold uppercase tracking-[0.06em] mb-1" style={{ fontSize: "0.95rem", color: "var(--text-1)" }}>
                {phase.phase}
              </div>
              <div className="text-[0.78rem] leading-[1.65]" style={{ color: "var(--text-3)", maxWidth: "52ch" }}>
                {phase.desc}
              </div>
            </div>
            <span
              className="font-mono text-[0.5rem] tracking-[0.1em] uppercase px-2 py-[3px] border shrink-0"
              style={{ color: phase.statusColor, borderColor: phase.statusColor }}
            >
              {phase.status}
            </span>
          </div>
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {phase.items.map(item => (
              <li
                key={item.l}
                className="px-5 py-3 flex items-center gap-3 text-[0.82rem]"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: item.done ? "var(--green)" : "var(--text-4)" }}>
                  {item.done ? "✓" : "○"}
                </span>
                <span style={{ color: item.done ? "var(--text-2)" : "var(--text-4)" }}>
                  {item.l}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function Access() {
  return (
    <>
      <Eyebrow>Product</Eyebrow>
      <PageTitle>Early<br />access</PageTitle>
      <Lede>
        Invite only. We're opening a first cohort of 30 to 50 degens and creators who
        want to operate on synchronization intelligence before it's available publicly.
        Founder pricing is permanent for the first cohort.
      </Lede>

      <Body>
        The first cohort isn't just getting early access. They're training Signal Memory.
        The outcome data they generate in Phase 1 is what makes the intelligence layer
        materially more accurate for everyone by the time Phase 2 ships. The people
        who join first compound the most.
      </Body>

      <H2>What early access means</H2>
      <Grid cols={2}>
        <Cell label="Founder pricing" accent>
          Locked in permanently. The tier you join at is the price you pay — regardless
          of how pricing evolves at public launch. First cohort members never reprice.
        </Cell>
        <Cell label="Direct product access" accent>
          Work directly with the team. Your feedback shapes what gets built and in what
          order. The first cohort has real influence over the product roadmap.
        </Cell>
        <Cell label="First on every new signal type">
          First access to every new chain, signal dimension, and output format as it
          ships. New capabilities go to the first cohort before public availability.
        </Cell>
        <Cell label="Signal Memory advantage">
          The outcome data you contribute in Phase 1 improves the intelligence layer's
          accuracy for you in Phase 2 and Phase 3. Early members compound the most.
        </Cell>
      </Grid>

      <div
        className="mt-10 border p-8 text-center"
        style={{ borderColor: "var(--accent-border)", background: "var(--accent-dim)" }}
      >
        <p
          className="font-cond font-extrabold uppercase tracking-tight mb-3"
          style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "var(--text-1)" }}
        >
          Join the first cohort
        </p>
        <p className="text-[0.87rem] leading-[1.8] mb-6 mx-auto" style={{ color: "var(--text-2)", maxWidth: "44ch" }}>
          No credit card. No spam. We'll reach out personally when your spot opens.
          Founder pricing is locked in from the moment you join.
        </p>
        <Link
          href="/#access"
          className="inline-flex font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase no-underline px-7 py-3 transition-colors"
          style={{ background: "var(--accent)", color: "#fff" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
        >
          Get early access →
        </Link>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Page registry
// ─────────────────────────────────────────────

const PAGES: Record<string, React.ReactNode> = {
  "what-is-synchronization": <WhatIsSynchronization />,
  "why-it-matters":          <WhyItMatters />,
  "the-problem":             <TheProblem />,
  "how-viralclaw-works":     <HowViralClawWorks />,
  "signal-architecture":     <SignalArchitecture />,
  "what-we-measure":         <WhatWeMeasure />,
  "dual-outputs":            <DualOutputs />,
  "on-chain-scanner":        <OnChainScanner />,
  "narrative-engine":        <NarrativeEngine />,
  "cross-chain-correlation": <CrossChainCorrelation />,
  "signal-memory":           <SignalMemory />,
  "for-degens":              <ForDegens />,
  "for-creators":            <ForCreators />,
  "for-funds":               <ForFunds />,
  "roadmap":                 <Roadmap />,
  "access":                  <Access />,
};

// ─────────────────────────────────────────────
// Search
// ─────────────────────────────────────────────

function Search({ onSelect }: { onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setQ(""); setResults([]); }
  }, [open]);

  useEffect(() => { setResults(search(q)); }, [q]);

  const pick = (id: string) => { onSelect(id); setOpen(false); };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-[6px] border transition-colors"
        style={{
          background: "var(--bg-3)",
          borderColor: "var(--border)",
          minWidth: 180,
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-4)" }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span className="font-mono text-[0.54rem] tracking-[0.06em] flex-1" style={{ color: "var(--text-4)" }}>
          Search docs
        </span>
        <span
          className="font-mono text-[0.42rem] tracking-[0.08em] border px-1 py-[1px] hidden sm:block"
          style={{ color: "var(--text-4)", borderColor: "var(--border)" }}
        >
          ⌘K
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-start justify-center pt-[14vh]"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[520px] mx-4 border overflow-hidden shadow-2xl"
            style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" style={{ color: "var(--text-4)" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search docs..."
                className="flex-1 bg-transparent font-mono text-[0.75rem] outline-none"
                style={{ color: "var(--text-1)" }}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[0.48rem] tracking-[0.1em] uppercase border px-2 py-[2px]"
                style={{ color: "var(--text-4)", borderColor: "var(--border)" }}
              >
                esc
              </button>
            </div>

            {q.length > 0 ? (
              <div className="max-h-[340px] overflow-y-auto">
                {results.length === 0 ? (
                  <p className="px-5 py-5 font-mono text-[0.6rem]" style={{ color: "var(--text-4)" }}>
                    No results for &quot;{q}&quot;
                  </p>
                ) : results.map(id => {
                  const page = ALL_PAGES.find(p => p.id === id);
                  return page ? (
                    <button
                      key={id}
                      type="button"
                      onClick={() => pick(id)}
                      className="w-full text-left flex items-center gap-3 px-5 py-3 border-b last:border-0 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-3)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      <span className="font-mono text-[0.65rem]" style={{ color: "var(--text-2)" }}>
                        {page.label}
                      </span>
                    </button>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="px-5 py-5">
                <p className="font-mono text-[0.5rem] tracking-[0.14em] uppercase mb-3" style={{ color: "var(--text-4)" }}>
                  Quick links
                </p>
                <div className="space-y-[2px]">
                  {["what-is-synchronization", "how-viralclaw-works", "dual-outputs", "signal-memory", "access"].map(id => {
                    const page = ALL_PAGES.find(p => p.id === id);
                    return page ? (
                      <button
                        key={id}
                        type="button"
                        onClick={() => pick(id)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 transition-colors"
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-3)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}
                      >
                        <span className="font-mono text-[0.65rem]" style={{ color: "var(--text-3)" }}>
                          {page.label}
                        </span>
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// Root layout
// ─────────────────────────────────────────────

export default function DocsPage() {
  const [active, setActive] = useState("what-is-synchronization");
  const [mobileOpen, setMobileOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const go = useCallback((id: string) => {
    setActive(id);
    setMobileOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const activeIdx = ALL_PAGES.findIndex(p => p.id === active);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === "l")
        go(ALL_PAGES[Math.min(activeIdx + 1, ALL_PAGES.length - 1)].id);
      if (e.key === "ArrowLeft" || e.key === "h")
        go(ALL_PAGES[Math.max(activeIdx - 1, 0)].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeIdx, go]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <header
        className="sticky top-0 z-50 h-[54px] border-b flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)] shrink-0"
        style={{
          background: "color-mix(in srgb, var(--bg) 94%, transparent)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Logo />
          <span className="hidden sm:block" style={{ color: "var(--border-2)" }}>/</span>
          <span className="hidden sm:block font-mono text-[0.5rem] tracking-[0.1em] uppercase" style={{ color: "var(--text-4)" }}>
            docs
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Search onSelect={go} />
          <ThemeToggle />
          <Link
            href="/#access"
            className="hidden sm:block font-mono text-[0.57rem] tracking-[0.12em] uppercase no-underline px-3 py-[6px] transition-colors shrink-0"
            style={{ background: "var(--accent)", color: "#fff" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
          >
            Get early access →
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden font-mono text-[0.55rem] uppercase border px-3 py-[6px]"
            style={{ color: "var(--text-2)", borderColor: "var(--border-2)" }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed top-[54px] inset-x-0 z-40 border-b overflow-y-auto max-h-[70vh]"
          style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
        >
          {NAV.map(group => (
            <div key={group.group}>
              <p
                className="font-mono text-[0.46rem] tracking-[0.2em] uppercase px-5 pt-4 pb-2"
                style={{ color: "var(--text-4)" }}
              >
                {group.group}
              </p>
              {group.pages.map(page => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => go(page.id)}
                  className="w-full text-left px-5 py-3 font-mono text-[0.63rem] tracking-[0.03em] border-l-2 transition-colors"
                  style={{
                    borderColor: active === page.id ? "var(--accent)" : "transparent",
                    color: active === page.id ? "var(--text-1)" : "var(--text-3)",
                    background: active === page.id ? "var(--bg-3)" : "transparent",
                  }}
                >
                  {page.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-[248px] shrink-0 border-r overflow-y-auto"
          style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
        >
          <div className="py-7 px-4">
            {NAV.map(group => (
              <div key={group.group} className="mb-7">
                <p
                  className="font-mono text-[0.44rem] tracking-[0.22em] uppercase mb-2 px-3"
                  style={{ color: "var(--text-4)" }}
                >
                  {group.group}
                </p>
                {group.pages.map(page => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => go(page.id)}
                    className="w-full text-left px-3 py-[7px] mb-[1px] font-mono text-[0.6rem] tracking-[0.02em] border-l-2 transition-all duration-150"
                    style={{
                      borderColor: active === page.id ? "var(--accent)" : "transparent",
                      color: active === page.id ? "var(--text-1)" : "var(--text-3)",
                      background: active === page.id ? "var(--bg-3)" : "transparent",
                    }}
                    onMouseEnter={e => {
                      if (active !== page.id) e.currentTarget.style.color = "var(--text-1)";
                    }}
                    onMouseLeave={e => {
                      if (active !== page.id) e.currentTarget.style.color = "var(--text-3)";
                    }}
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono text-[0.46rem] tracking-[0.1em] uppercase" style={{ color: "var(--text-4)" }}>
              ← → or h/l to navigate
            </p>
          </div>
        </aside>

        {/* Content */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto min-w-0"
          style={{ background: "var(--bg)" }}
        >
          <div
            className="mx-auto px-[clamp(1.5rem,5vw,3.5rem)] pt-[clamp(2.5rem,6vw,5rem)] pb-20"
            style={{ maxWidth: 720 }}
          >
            {PAGES[active]}

            {/* Pagination */}
            <div
              className="flex items-center justify-between mt-16 pt-8 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {activeIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => go(ALL_PAGES[activeIdx - 1].id)}
                  className="group flex items-center gap-3 text-left"
                >
                  <span
                    className="font-mono text-[0.8rem] transition-colors"
                    style={{ color: "var(--text-4)" }}
                  >←</span>
                  <div>
                    <p className="font-mono text-[0.44rem] tracking-[0.12em] uppercase" style={{ color: "var(--text-4)" }}>
                      Previous
                    </p>
                    <p className="font-mono text-[0.6rem] mt-[2px] transition-colors" style={{ color: "var(--text-3)" }}>
                      {ALL_PAGES[activeIdx - 1].label}
                    </p>
                  </div>
                </button>
              ) : <div />}

              {activeIdx < ALL_PAGES.length - 1 ? (
                <button
                  type="button"
                  onClick={() => go(ALL_PAGES[activeIdx + 1].id)}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p className="font-mono text-[0.44rem] tracking-[0.12em] uppercase" style={{ color: "var(--text-4)" }}>
                      Next
                    </p>
                    <p className="font-mono text-[0.6rem] mt-[2px] transition-colors" style={{ color: "var(--text-3)" }}>
                      {ALL_PAGES[activeIdx + 1].label}
                    </p>
                  </div>
                  <span className="font-mono text-[0.8rem]" style={{ color: "var(--text-4)" }}>→</span>
                </button>
              ) : (
                <Link
                  href="/#access"
                  className="group flex items-center gap-3 text-right no-underline"
                >
                  <div>
                    <p className="font-mono text-[0.44rem] tracking-[0.12em] uppercase" style={{ color: "var(--text-4)" }}>
                      You&apos;re caught up
                    </p>
                    <p className="font-mono text-[0.6rem] mt-[2px]" style={{ color: "var(--accent)" }}>
                      Get early access →
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  {
    group: "Overview",
    pages: [
      { id: "what-is-viralclaw", label: "What is ViralClaw?" },
      { id: "the-problem",       label: "The problem" },
      { id: "how-it-works",      label: "How it works" },
    ],
  },
  {
    group: "Intelligence layer",
    pages: [
      { id: "signal-engine",        label: "Signal engine" },
      { id: "on-chain-scanner",     label: "On-chain scanner" },
      { id: "trend-scoring",        label: "Trend scoring" },
      { id: "cross-chain",          label: "Cross-chain correlation" },
    ],
  },
  {
    group: "Outputs",
    pages: [
      { id: "alpha-briefs",    label: "Alpha briefs" },
      { id: "content-briefs",  label: "Content briefs" },
      { id: "signal-memory",   label: "Signal memory" },
    ],
  },
  {
    group: "Who it's for",
    pages: [
      { id: "for-degens",    label: "Degens" },
      { id: "for-creators",  label: "Creators" },
      { id: "for-funds",     label: "Funds & studios" },
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

const SEARCH_INDEX = [
  { id: "what-is-viralclaw",  terms: "what is viralclaw overview intelligence layer on-chain multi-signal" },
  { id: "the-problem",        terms: "problem signal noise on-chain lag social timing alpha" },
  { id: "how-it-works",       terms: "how works pipeline ingestion scoring interpretation output alpha content" },
  { id: "signal-engine",      terms: "signal engine intelligence stack modules architecture" },
  { id: "on-chain-scanner",   terms: "on-chain scanner chains ethereum solana base arbitrum indexing" },
  { id: "trend-scoring",      terms: "trend scoring velocity model conviction score signal strength" },
  { id: "cross-chain",        terms: "cross-chain correlation multi-ecosystem liquidity rotation bridge" },
  { id: "alpha-briefs",       terms: "alpha briefs degen participation window conviction entry" },
  { id: "content-briefs",     terms: "content briefs creator narrative angle publish window" },
  { id: "signal-memory",      terms: "signal memory outcome tracking model improvement compounding" },
  { id: "for-degens",         terms: "degens alpha hunters on-chain traders participation" },
  { id: "for-creators",       terms: "creators web3 content newsletter analysts publish narrative" },
  { id: "for-funds",          terms: "funds studios trading desks api enterprise custom" },
  { id: "roadmap",            terms: "roadmap phases launch timeline plans chains" },
  { id: "access",             terms: "access waitlist pricing early cohort founder" },
];

function search(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SEARCH_INDEX
    .filter(p => p.terms.includes(q) || ALL_PAGES.find(x => x.id === p.id)?.label.toLowerCase().includes(q))
    .map(p => p.id);
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-4 flex items-center gap-2">
      <span className="w-4 h-px bg-[var(--accent)] inline-block" />{children}
    </p>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-cond font-extrabold uppercase leading-[0.9] tracking-tight text-[var(--text-1)] mb-6"
      style={{ fontSize: "clamp(2.4rem,6vw,4rem)" }}>
      {children}
    </h1>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1rem] text-[var(--text-2)] leading-[1.9] mb-8 max-w-[56ch]"
      style={{ fontSize: "clamp(0.92rem,2vw,1.02rem)" }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-cond text-[1.5rem] font-bold uppercase tracking-[0.04em] text-[var(--text-1)] mt-12 mb-4 flex items-center gap-3">
      <span className="w-1 h-5 bg-[var(--accent)] inline-block shrink-0" />{children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--text-3)] mt-8 mb-3">{children}</h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.91rem] text-[var(--text-2)] leading-[1.9] mb-5">{children}</p>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="text-[var(--text-1)] font-semibold">{children}</strong>;
}

function HR() {
  return <div className="h-px bg-[var(--border)] my-10" />;
}

function Note({ children, type = "info" }: { children: React.ReactNode; type?: "info"|"tip"|"warn" }) {
  const t = {
    info: { c: "var(--cyan-light)", b: "var(--cyan-border)", bg: "var(--cyan-dim)", l: "Note" },
    tip:  { c: "var(--green)", b: "var(--green-border)", bg: "var(--green-dim)", l: "Key insight" },
    warn: { c: "var(--amber)", b: "rgba(245,158,11,0.22)", bg: "var(--amber-dim)", l: "Heads up" },
  }[type];
  return (
    <div className="my-6 p-5 border" style={{ borderColor: t.b, background: t.bg }}>
      <p className="font-mono text-[0.52rem] tracking-[0.16em] uppercase mb-2" style={{ color: t.c }}>{t.l}</p>
      <div className="text-[0.88rem] text-[var(--text-2)] leading-[1.85]">{children}</div>
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
      <p className="font-mono text-[0.54rem] tracking-[0.14em] uppercase text-[var(--accent)] mb-2">{label}</p>
      <div className="text-[0.86rem] text-[var(--text-2)] leading-[1.75]">{children}</div>
    </div>
  );
}

function FlowStep({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-10 pb-8 border-l border-[var(--border)] ml-4 last:border-0 last:pb-0">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-[var(--bg-2)] border border-[var(--accent-border)] flex items-center justify-center font-mono text-[0.52rem] text-[var(--accent)]">{n}</div>
      <div className="font-cond text-[0.95rem] font-semibold uppercase tracking-[0.04em] text-[var(--text-1)] mb-2 mt-[-2px]">{label}</div>
      <div className="text-[0.82rem] text-[var(--text-2)] leading-[1.8]">{children}</div>
    </div>
  );
}

// ── Page content ──────────────────────────────────────────────

function WhatIsViralClaw() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>What is<br />ViralClaw?</PageTitle>
    <Lede>
      ViralClaw is a multi-signal intelligence layer specialized in capturing viral trends —
      with on-chain analysis as its core strength. It delivers two actionable outputs:
      participation alpha for degens and content intelligence for creators.
    </Lede>
    <Body>
      The system monitors 17 blockchains plus social platforms in real time, scores every
      signal by trend velocity and cross-chain correlation, interprets the narrative behind
      each movement, and produces structured briefs in under 400 milliseconds.
    </Body>
    <Body>
      It's not a dashboard or a data feed. It's an intelligence layer — one that connects
      on-chain signal detection, narrative interpretation, and actionable output delivery
      into a single continuous pipeline.
    </Body>
    <HR />
    <H2>The four layers</H2>
    <Grid>
      <Cell label="01 — Ingestion">17-chain real-time scanning plus social velocity tracking. On-chain is the primary signal source; social is used for confirmation and timing.</Cell>
      <Cell label="02 — Scoring">Proprietary trend velocity model scores every signal across strength, wallet reputation, cross-chain correlation, and social lag.</Cell>
      <Cell label="03 — Interpretation">Narrative mapping — what's moving, why, which ecosystems are involved, and how long the window is estimated to stay open.</Cell>
      <Cell label="04 — Dual output">The same intelligence event produces an alpha brief for degens and a content brief for creators — simultaneously.</Cell>
    </Grid>
    <HR />
    <H2>How ViralClaw differs</H2>
    <div className="overflow-x-auto my-6 border border-[var(--border)]">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="bg-[var(--bg-3)] border-b border-[var(--border)]">
            {["Tool", "What it does", "What it can't do", "ViralClaw's edge"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-3)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { tool: "Block explorers", does: "Raw on-chain data", cant: "No interpretation or scoring", edge: "Scored, interpreted signals with context" },
            { tool: "Nansen / Arkham", does: "Wallet tracking", cant: "No cross-chain correlation or output briefs", edge: "Cross-ecosystem intelligence + dual output" },
            { tool: "CT / Farcaster", does: "Social signals", cant: "Lags on-chain by 4–8h", edge: "On-chain first, 4–8h ahead of social" },
            { tool: "Dune dashboards", does: "Custom on-chain queries", cant: "No real-time scoring or narrative", edge: "Real-time scoring with narrative interpretation" },
            { tool: "AI writing tools", does: "Content drafting", cant: "No live signal intelligence", edge: "Content briefs grounded in live on-chain data" },
          ].map(row => (
            <tr key={row.tool} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-3)] transition-colors">
              <td className="px-4 py-3 font-mono text-[0.65rem] text-[var(--text-1)] align-top">{row.tool}</td>
              <td className="px-4 py-3 text-[0.72rem] text-[var(--text-2)] align-top">{row.does}</td>
              <td className="px-4 py-3 text-[0.72rem] text-[var(--accent)] align-top">{row.cant}</td>
              <td className="px-4 py-3 text-[0.72rem] text-[var(--green)] align-top font-medium">{row.edge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Note type="info">
      ViralClaw is currently in development. The waitlist is open. Early access members get
      founder pricing permanently.{" "}
      <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2">Get early access →</Link>
    </Note>
  </>;
}

function TheProblem() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>The<br />problem</PageTitle>
    <Lede>
      On-chain signals consistently precede social narratives by 4–8 hours. The problem is that
      no existing tool surfaces them early enough, scores them correctly, and delivers them in
      a form you can immediately act on.
    </Lede>
    <H2>Four breakdowns</H2>
    <div className="space-y-3 my-6">
      {[
        { label: "A — On-chain data is raw and uninterpretable at speed", body: "Block explorers and dashboards give you data. Interpreting raw on-chain activity into a narrative and a decision requires hours of manual synthesis. By the time most participants have an opinion, the window is closing." },
        { label: "B — Social signals lag on-chain by 4–8 hours", body: "By the time a trend hits Crypto Twitter with enough velocity to be noticed, the alpha window is already closing. The participants who win are those who detected the signal on-chain before it became a conversation." },
        { label: "C — Cross-chain plays are invisible to single-chain tools", body: "A rotation that starts on Ethereum and moves to Base and Arbitrum is completely invisible if you're watching one chain. Cross-chain liquidity flows and correlated wallet behavior require simultaneous multi-chain intelligence." },
        { label: "D — Web3 creators are reacting to trends, not leading them", body: "Most Web3 content creators track Crypto Twitter for ideas — which means they're responding to already-saturated narratives. The creators who win publish on the trend before it's a Twitter conversation." },
      ].map(item => (
        <details key={item.label} className="border border-[var(--border)] bg-[var(--bg-2)] group">
          <summary className="px-5 py-4 cursor-pointer font-mono text-[0.65rem] tracking-[0.04em] uppercase text-[var(--text-2)] group-open:text-[var(--text-1)] select-none list-none flex items-center justify-between">
            {item.label}
            <span className="text-[var(--accent)] group-open:rotate-45 transition-transform inline-block">+</span>
          </summary>
          <p className="px-5 pb-5 text-[0.85rem] text-[var(--text-2)] leading-[1.85]">{item.body}</p>
        </details>
      ))}
    </div>
    <HR />
    <Body><Strong>ViralClaw is built to close that gap</Strong> — on-chain detection, scoring, interpretation, and structured output in under 400ms.</Body>
  </>;
}

function HowItWorks() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>How it<br />works</PageTitle>
    <Lede>
      Raw on-chain data flows through six pipeline stages and emerges as two simultaneously
      generated actionable outputs — alpha briefs for degens and content briefs for creators.
    </Lede>
    <H2>The signal pipeline</H2>
    <div className="my-8">
      {[
        { n: "01", label: "Multi-chain ingestion", body: "17 blockchains indexed in real time — wallet flows, bridge volumes, DEX anomalies, smart contract deployments. Social platforms tracked simultaneously for velocity measurement." },
        { n: "02", label: "Trend velocity scoring", body: "Every signal scored across four dimensions: signal strength, wallet reputation, cross-chain correlation, and social lag. Surfaces the 0.3% of signals that actually matter." },
        { n: "03", label: "Narrative interpretation", body: "Maps the context behind the signal — what's moving, which ecosystems are involved, what pattern it matches historically, and how long the participation window is estimated to stay open." },
        { n: "04", label: "Dual output generation", body: "High-conviction signals simultaneously generate: an alpha brief with participation context for degens, and a content brief with narrative angles and publish-window timing for creators." },
        { n: "05", label: "Delivery", body: "Briefs delivered via in-app feed, webhook, Telegram, and API. Sub-400ms from signal detection to delivery. Window urgency level included with every brief." },
        { n: "06", label: "Signal Memory update", body: "Outcomes tracked after every signal — whether alpha played, how long the content window lasted, which chain the rotation went to. Feeds back into the scoring model." },
      ].map(s => (
        <FlowStep key={s.n} n={s.n} label={s.label}>{s.body}</FlowStep>
      ))}
    </div>
    <Note type="tip">
      Signal Memory is what makes ViralClaw improve over time. The more signals it processes
      and tracks, the better its window estimation and conviction scoring becomes.
    </Note>
  </>;
}

function SignalEngine() {
  return <>
    <Eyebrow>Intelligence layer</Eyebrow>
    <PageTitle>Signal<br />engine</PageTitle>
    <Lede>
      The full intelligence stack — six modules from ingestion to output. Each module
      feeds the next. The dual output layer sits at the end, serving degens and creators
      from the same upstream intelligence.
    </Lede>
    <H2>Module overview</H2>
    <Grid>
      <Cell label="On-Chain Scanner">Multi-chain real-time indexing. 17 chains simultaneously. Raw signal source.</Cell>
      <Cell label="Social Velocity Engine">Narrative momentum tracking across Crypto Twitter, Farcaster, Telegram, Reddit.</Cell>
      <Cell label="Trend Scoring Model">Signal strength + wallet reputation + cross-chain correlation + social lag. Surfaces the 0.3%.</Cell>
      <Cell label="Narrative Interpreter">Context mapping — what, why, which chains, how long. Pattern matching against historical events.</Cell>
      <Cell label="Alpha Engine">Converts high-conviction signals into structured degen participation briefs.</Cell>
      <Cell label="Content Engine">Converts the same signal into creator-ready content briefs with angles and publish timing.</Cell>
    </Grid>
    <Note type="tip">Signal Memory sits outside the pipeline — it's the feedback layer that improves every module over time as signal outcomes are tracked.</Note>
  </>;
}

function OnChainScanner() {
  return <>
    <Eyebrow>Intelligence layer</Eyebrow>
    <PageTitle>On-chain<br />scanner</PageTitle>
    <Lede>
      Real-time indexing of 17 blockchains simultaneously. On-chain is the primary signal source —
      social platforms are tracked for velocity measurement, not signal discovery.
    </Lede>
    <H2>What gets indexed</H2>
    <Grid>
      <Cell label="Wallet flows">Smart money wallet movements, position sizing changes, new wallet activations by known addresses.</Cell>
      <Cell label="Bridge volumes">Cross-chain bridge activity — amounts, directions, frequency. Leading indicator of liquidity rotation.</Cell>
      <Cell label="DEX anomalies">Volume spikes, liquidity additions, swap pattern changes relative to 30-day baseline.</Cell>
      <Cell label="Contract deployments">New protocol launches, token deployments, and contract interactions by high-reputation wallets.</Cell>
    </Grid>
    <H2>Chain coverage</H2>
    <Body>Phase 1 coverage: Ethereum, Solana, Base, Arbitrum, Optimism, Polygon, Avalanche, BNB Chain. Phase 2 expansion to 17 chains including Sui, Aptos, Starknet, zkSync, and additional EVM networks.</Body>
    <Note type="info">Chain expansion is driven by where smart money and liquidity are rotating — not by ecosystem partnerships.</Note>
  </>;
}

function TrendScoring() {
  return <>
    <Eyebrow>Intelligence layer</Eyebrow>
    <PageTitle>Trend<br />scoring</PageTitle>
    <Lede>
      Every signal is scored before it reaches the output layer. Four dimensions, one
      conviction score. Only high-conviction signals generate alpha and content briefs.
    </Lede>
    <H2>Scoring dimensions</H2>
    {[
      { label: "Signal strength", desc: "Magnitude of the on-chain event relative to historical baseline — wallet size, transaction volume, bridge amount, DEX liquidity." },
      { label: "Wallet reputation", desc: "Smart money scoring based on historical outcome tracking. High-reputation wallets moving early carry significantly more conviction weight." },
      { label: "Cross-chain correlation", desc: "How many chains are showing the same pattern simultaneously. Signals correlated across 3+ ecosystems score substantially higher than single-chain anomalies." },
      { label: "Social lag", desc: "Distance ahead of social conversation. A signal 6h ahead of any social mention scores higher than one already circulating on Crypto Twitter." },
    ].map(d => (
      <div key={d.label} className="mb-4 border border-[var(--border)] bg-[var(--bg-2)] p-5">
        <div className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-[var(--accent)] mb-2">{d.label}</div>
        <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8]">{d.desc}</p>
      </div>
    ))}
    <Note type="tip">Conviction scores compound. A signal scoring high on all four dimensions produces a brief with a higher urgency level and shorter estimated window.</Note>
  </>;
}

function CrossChain() {
  return <>
    <Eyebrow>Intelligence layer</Eyebrow>
    <PageTitle>Cross-chain<br />correlation</PageTitle>
    <Lede>
      Alpha doesn't respect chain boundaries. Liquidity, narratives, and momentum
      move across ecosystems simultaneously. Cross-chain correlation is a core scoring
      input — not an optional layer.
    </Lede>
    <H2>Why cross-chain matters</H2>
    <Body>A rotation that starts on Ethereum and moves to Base and Arbitrum is invisible to tools monitoring a single chain. By the time single-chain observers notice the move, the rotation is already in progress.</Body>
    <H2>What gets correlated</H2>
    <Grid>
      <Cell label="Liquidity flows">Bridge volumes and directions across all indexed chains. Identifies rotation before it becomes a price event.</Cell>
      <Cell label="Wallet patterns">Same wallet clusters appearing across chains. High-conviction signal when smart money coordinates across ecosystems.</Cell>
      <Cell label="Narrative bridges">Tokens, protocols, or narratives appearing in similar patterns across multiple ecosystems simultaneously.</Cell>
      <Cell label="Volume anomalies">Correlated DEX volume spikes across chains. Single-chain spikes score lower; multi-chain correlation raises conviction significantly.</Cell>
    </Grid>
  </>;
}

function AlphaBriefs() {
  return <>
    <Eyebrow>Outputs</Eyebrow>
    <PageTitle>Alpha<br />briefs</PageTitle>
    <Lede>
      Structured participation intelligence for degens. Every high-conviction signal generates
      an alpha brief — what's moving, conviction level, which chains, estimated window, and risk context.
    </Lede>
    <H2>What's in every brief</H2>
    {[
      { label: "Signal summary", desc: "Plain-language description of what's happening on-chain — what's moving, which wallets, which chains, and what pattern it matches." },
      { label: "Conviction score", desc: "1–10 score with reasoning. Breakdown of which scoring dimensions contributed most to the conviction level." },
      { label: "Cross-chain map", desc: "Which chains the signal appears on, bridge flow data, and where the rotation vector appears to be heading." },
      { label: "Window estimate", desc: "Estimated time before the signal is widely known — open, closing soon, or already closing. Based on Signal Memory pattern matching." },
      { label: "Risk context", desc: "What would invalidate the signal — what to watch for if the thesis isn't playing out as expected." },
    ].map(f => (
      <div key={f.label} className="mb-3 border border-[var(--border)] bg-[var(--bg-2)] p-5">
        <div className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-[var(--accent)] mb-2">{f.label}</div>
        <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8]">{f.desc}</p>
      </div>
    ))}
    <Note type="warn">Alpha briefs are intelligence, not financial advice. Window estimates are probabilistic based on historical patterns — they are not guarantees.</Note>
  </>;
}

function ContentBriefs() {
  return <>
    <Eyebrow>Outputs</Eyebrow>
    <PageTitle>Content<br />briefs</PageTitle>
    <Lede>
      Creator-ready intelligence from the same on-chain signals that generate alpha briefs.
      Narrative angle, audience hook, on-chain evidence, and publish-window timing — packaged
      to publish before the crowd arrives.
    </Lede>
    <H2>What's in every brief</H2>
    {[
      { label: "Narrative summary", desc: "The story behind the on-chain signal — in plain language your audience can understand. What's happening and why it matters." },
      { label: "Content angle variants", desc: "Three distinct angles for covering the same narrative — different hooks, different framings, different audience entry points." },
      { label: "On-chain evidence", desc: "Verifiable on-chain sources — transaction links, wallet addresses, bridge data — that ground your content in first-hand evidence." },
      { label: "Social velocity context", desc: "How fast the narrative is spreading socially and how far ahead the on-chain signal is. Urgency level included." },
      { label: "Publish window", desc: "Optimal publish timing with urgency indicator — open, publish soon, or closing. Based on when similar narratives peaked historically." },
    ].map(f => (
      <div key={f.label} className="mb-3 border border-[var(--border)] bg-[var(--bg-2)] p-5">
        <div className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-[var(--accent)] mb-2">{f.label}</div>
        <p className="text-[0.84rem] text-[var(--text-2)] leading-[1.8]">{f.desc}</p>
      </div>
    ))}
    <Note type="tip">Content briefs are generated simultaneously with alpha briefs from the same intelligence event. No additional processing time — both arrive in under 400ms.</Note>
  </>;
}

function SignalMemory() {
  return <>
    <Eyebrow>Outputs</Eyebrow>
    <PageTitle>Signal<br />memory</PageTitle>
    <Lede>
      The feedback layer that makes ViralClaw improve over time. Every signal outcome —
      whether alpha played, how long the content window lasted, which chain the rotation
      went to — feeds back into the scoring model.
    </Lede>
    <H2>What gets tracked</H2>
    <Grid>
      <Cell label="Alpha outcomes">Did the signal lead to measurable price action? What was the timing relative to the brief? Which conviction scores were most predictive?</Cell>
      <Cell label="Content window accuracy">How long did the narrative have engagement before saturation? How accurate was the window estimate?</Cell>
      <Cell label="Chain rotation patterns">When a signal starts on one chain, where does it rotate to? How long does the rotation take? What's the typical magnitude?</Cell>
      <Cell label="Wallet reputation updates">Which wallets' early movements led to real outcomes? Reputation scores updated continuously based on outcome tracking.</Cell>
    </Grid>
    <Note type="tip">Signal Memory is the compounding moat. Six months of outcome data produces substantially more accurate window estimates and conviction scores than week-one coverage.</Note>
  </>;
}

function ForDegens() {
  return <>
    <Eyebrow>Who it's for</Eyebrow>
    <PageTitle>For<br />degens</PageTitle>
    <Lede>
      ViralClaw is built for on-chain alpha hunters who need to identify high-conviction plays
      before the crowd arrives — and act on structured intelligence, not raw data under pressure.
    </Lede>
    <H2>What changes</H2>
    {[
      { label: "Signal discovery", before: "Hours monitoring block explorers, CT, and dashboards manually", after: "High-conviction signals delivered in structured briefs under 400ms" },
      { label: "Cross-chain coverage", before: "Missing rotations happening on chains you're not watching", after: "17-chain simultaneous coverage with cross-chain correlation scoring" },
      { label: "Conviction", before: "Gut-feel decisions based on incomplete information", after: "Scored, evidence-backed briefs with window estimates and risk context" },
      { label: "Timing", before: "Discovering signals after social conversation has started", after: "On-chain first — 4–8h ahead of social narrative peak on average" },
    ].map(row => (
      <div key={row.label} className="mb-px border border-[var(--border)] grid grid-cols-[100px_1fr_1fr] gap-px bg-[var(--border)]">
        <div className="bg-[var(--bg-3)] p-3 font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--accent)]">{row.label}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--text-3)] leading-[1.65]">{row.before}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--green)] leading-[1.65]">{row.after}</div>
      </div>
    ))}
  </>;
}

function ForCreators() {
  return <>
    <Eyebrow>Who it's for</Eyebrow>
    <PageTitle>For<br />creators</PageTitle>
    <Lede>
      ViralClaw is built for Web3 content creators, newsletter writers, and analysts who
      publish on-chain narratives — and want to be first, not reactive.
    </Lede>
    <H2>What changes</H2>
    {[
      { label: "Topic discovery", before: "Scanning CT for trending discussions — already saturated", after: "On-chain narrative briefs 4–8h before social peak" },
      { label: "Evidence", before: "Sourcing screenshots and links manually after the fact", after: "On-chain evidence links included in every content brief" },
      { label: "Angles", before: "One obvious angle — what everyone else will also write", after: "Three distinct angle variants per narrative with audience framing" },
      { label: "Timing", before: "Publishing into peak saturation — low differentiation", after: "Publish-window timing with urgency level — first-mover position" },
    ].map(row => (
      <div key={row.label} className="mb-px border border-[var(--border)] grid grid-cols-[100px_1fr_1fr] gap-px bg-[var(--border)]">
        <div className="bg-[var(--bg-3)] p-3 font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--accent)]">{row.label}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--text-3)] leading-[1.65]">{row.before}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--green)] leading-[1.65]">{row.after}</div>
      </div>
    ))}
  </>;
}

function ForFunds() {
  return <>
    <Eyebrow>Who it's for</Eyebrow>
    <PageTitle>For funds<br />&amp; studios</PageTitle>
    <Lede>
      DeFi funds, trading desks, and content studios need systematic cross-chain signal
      coverage at scale. API integration, custom filtering, and private intelligence
      layers for ecosystem-specific focus.
    </Lede>
    <H2>Team use cases</H2>
    <Grid>
      <Cell label="Systematic signal coverage">Replace manual monitoring across multiple analysts with a single intelligence layer. API endpoints with configurable chain and signal-type filters.</Cell>
      <Cell label="Custom ecosystem focus">Filter the signal stack to specific chains, token categories, or wallet clusters. Private intelligence layer built to your focus area.</Cell>
      <Cell label="Multi-seat access">Full team access to the same signal feed with individual alert configuration per seat.</Cell>
      <Cell label="Content studio scale">Multiple creator profiles receiving simultaneous content briefs from the same signal event — each with ecosystem-specific framing.</Cell>
    </Grid>
    <Note type="info">Studio and fund tiers include REST API access and webhook endpoints. <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2">Join the waitlist →</Link></Note>
  </>;
}

function Roadmap() {
  return <>
    <Eyebrow>Product</Eyebrow>
    <PageTitle>Roadmap</PageTitle>
    <Lede>Building in phases. Here's what's done, in progress, and planned.</Lede>
    {[
      {
        phase: "Phase 1 — Signal foundation",
        status: "In progress",
        color: "var(--amber)",
        items: [
          { done: true,  l: "Architecture and signal pipeline design" },
          { done: true,  l: "On-chain scanner — core chains" },
          { done: true,  l: "Trend scoring model v1" },
          { done: false, l: "Alpha brief generation — alpha" },
          { done: false, l: "Content brief generation — alpha" },
          { done: false, l: "First cohort onboarding" },
        ]
      },
      {
        phase: "Phase 2 — Full signal stack",
        status: "Planned",
        color: "var(--cyan-light)",
        items: [
          { done: false, l: "17-chain coverage" },
          { done: false, l: "Social velocity engine" },
          { done: false, l: "Cross-chain correlation scoring v2" },
          { done: false, l: "Signal Memory — outcome tracking" },
          { done: false, l: "API and webhook delivery" },
        ]
      },
      {
        phase: "Phase 3 — Intelligence compounding",
        status: "Future",
        color: "var(--text-4)",
        items: [
          { done: false, l: "Private intelligence layers" },
          { done: false, l: "Custom ecosystem filters" },
          { done: false, l: "Community signal contributions" },
          { done: false, l: "Window estimation v3" },
        ]
      },
    ].map(phase => (
      <div key={phase.phase} className="mb-8 border border-[var(--border)] overflow-hidden">
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
  </>;
}

function Access() {
  return <>
    <Eyebrow>Product</Eyebrow>
    <PageTitle>Early<br />access</PageTitle>
    <Lede>
      Invite only. We're opening early access to a small first cohort of degens and creators.
      Founder pricing is permanent for the first cohort.
    </Lede>
    <H2>What early access means</H2>
    <Grid>
      <Cell label="Founder pricing">Locked in permanently. The tier you join at is the price you pay — regardless of how pricing evolves at launch.</Cell>
      <Cell label="Direct access">Work directly with the team. Your feedback shapes what gets built and in what order.</Cell>
      <Cell label="First on alpha">First access to every new chain, signal type, and output format as it ships.</Cell>
      <Cell label="Priority support">Dedicated channel. Real humans, fast responses.</Cell>
    </Grid>
    <Note type="info">
      <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2 font-medium">Join the waitlist →</Link>
      {" "}We'll reach out personally when your spot opens.
    </Note>
  </>;
}

const PAGES: Record<string, React.ReactNode> = {
  "what-is-viralclaw": <WhatIsViralClaw />,
  "the-problem":       <TheProblem />,
  "how-it-works":      <HowItWorks />,
  "signal-engine":     <SignalEngine />,
  "on-chain-scanner":  <OnChainScanner />,
  "trend-scoring":     <TrendScoring />,
  "cross-chain":       <CrossChain />,
  "alpha-briefs":      <AlphaBriefs />,
  "content-briefs":    <ContentBriefs />,
  "signal-memory":     <SignalMemory />,
  "for-degens":        <ForDegens />,
  "for-creators":      <ForCreators />,
  "for-funds":         <ForFunds />,
  "roadmap":           <Roadmap />,
  "access":            <Access />,
};

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
      <button type="button" onClick={() => setOpen(true)}
        style={{ background: "var(--bg-3)", borderColor: "var(--border)", minWidth: 180 }}
        className="flex items-center gap-2 px-3 py-[6px] text-left hover:border-[var(--border-2)] transition-colors group border">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-4)]">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span className="font-mono text-[0.56rem] tracking-[0.06em] text-[var(--text-4)] flex-1">Search docs</span>
        <span className="font-mono text-[0.44rem] tracking-[0.08em] text-[var(--text-4)] border border-[var(--border)] px-1 py-[1px] hidden sm:block">⌘K</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setOpen(false)}>
          <div className="w-full max-w-[520px] mx-4 bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-4)] shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Search docs..."
                className="flex-1 bg-transparent font-mono text-[0.75rem] text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none" />
              <button type="button" onClick={() => setOpen(false)} className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-[var(--text-4)] border border-[var(--border)] px-2 py-[2px]">esc</button>
            </div>
            {q.length > 0 ? (
              <div className="max-h-[340px] overflow-y-auto">
                {results.length === 0 ? (
                  <p className="px-5 py-5 font-mono text-[0.6rem] text-[var(--text-4)]">No results for "{q}"</p>
                ) : results.map(id => {
                  const page = ALL_PAGES.find(p => p.id === id);
                  return page ? (
                    <button key={id} type="button" onClick={() => pick(id)}
                      className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-3)] transition-colors border-b border-[var(--border)] last:border-0">
                      <span className="font-mono text-[0.65rem] text-[var(--text-2)]">{page.label}</span>
                    </button>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="px-5 py-5">
                <p className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-4)] mb-3">Quick links</p>
                <div className="space-y-[2px]">
                  {["what-is-viralclaw","how-it-works","alpha-briefs","content-briefs","access"].map(id => {
                    const page = ALL_PAGES.find(p => p.id === id);
                    return page ? (
                      <button key={id} type="button" onClick={() => pick(id)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-[var(--bg-3)] transition-colors">
                        <span className="font-mono text-[0.65rem] text-[var(--text-3)]">{page.label}</span>
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

export default function DocsPage() {
  const [active, setActive] = useState("what-is-viralclaw");
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
      if (e.key === "ArrowRight" || e.key === "l") go(ALL_PAGES[Math.min(activeIdx + 1, ALL_PAGES.length - 1)].id);
      if (e.key === "ArrowLeft"  || e.key === "h") go(ALL_PAGES[Math.max(activeIdx - 1, 0)].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeIdx, go]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <header style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)", backdropFilter: "blur(20px)", borderColor: "var(--border)" }}
        className="sticky top-0 z-50 h-[54px] border-b flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="font-cond text-[0.9rem] font-bold tracking-[0.14em] uppercase text-[var(--text-1)] no-underline flex items-center gap-2 shrink-0">
            <span className="text-[var(--accent)]">⌬</span>ViralClaw
          </Link>
          <span className="text-[var(--border-md)] hidden sm:block">/</span>
          <span className="hidden sm:block font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[var(--text-4)]">docs</span>
        </div>
        <div className="flex items-center gap-3">
          <Search onSelect={go} />
          <Link href="/#access" className="hidden sm:block font-mono text-[0.57rem] tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-3 py-[6px] no-underline hover:bg-[var(--accent-hover)] transition-colors shrink-0">
            Get early access →
          </Link>
          <button type="button" onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden flex items-center gap-2 font-mono text-[0.55rem] uppercase text-[var(--text-2)] border border-[var(--border-2)] px-3 py-[6px]">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed top-[54px] inset-x-0 z-40 bg-[var(--bg-2)] border-b border-[var(--border)] overflow-y-auto max-h-[70vh]">
          {NAV.map(group => (
            <div key={group.group}>
              <p className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-[var(--text-4)] px-5 pt-4 pb-2">{group.group}</p>
              {group.pages.map(page => (
                <button key={page.id} type="button" onClick={() => go(page.id)}
                  className={`w-full text-left px-5 py-3 font-mono text-[0.65rem] tracking-[0.03em] border-l-2 transition-colors ${active === page.id ? "border-[var(--accent)] text-[var(--text-1)] bg-[var(--bg-3)]" : "border-transparent text-[var(--text-3)] hover:text-[var(--text-1)]"}`}>
                  {page.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        <aside className="hidden lg:flex flex-col w-[240px] shrink-0 border-r overflow-y-auto" style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}>
          <div className="py-6 px-4">
            {NAV.map(group => (
              <div key={group.group} className="mb-6">
                <p className="font-mono text-[0.46rem] tracking-[0.22em] uppercase text-[var(--text-4)] mb-2 px-3">{group.group}</p>
                {group.pages.map(page => (
                  <button key={page.id} type="button" onClick={() => go(page.id)}
                    className={`w-full text-left px-3 py-2 mb-[2px] font-mono text-[0.62rem] tracking-[0.02em] border-l-2 transition-all duration-150 ${
                      active === page.id
                        ? "border-[var(--accent)] text-[var(--text-1)] bg-[var(--bg-3)]"
                        : "border-transparent text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[rgba(255,255,255,0.03)]"
                    }`}>
                    {page.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-4 border-t border-[var(--border)]">
            <p className="font-mono text-[0.48rem] tracking-[0.1em] uppercase text-[var(--text-4)]">← → or h/l to navigate</p>
          </div>
        </aside>

        <main ref={contentRef} className="flex-1 overflow-y-auto min-w-0" style={{ background: "var(--bg)" }}>
          <div className="max-w-[700px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] pt-[clamp(2.5rem,6vw,5rem)] pb-16">
            {PAGES[active]}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-[var(--border)]">
              {activeIdx > 0 ? (
                <button type="button" onClick={() => go(ALL_PAGES[activeIdx - 1].id)} className="group flex items-center gap-3 text-left">
                  <span className="font-mono text-[0.8rem] text-[var(--text-4)] group-hover:text-[var(--accent)] transition-colors">←</span>
                  <div>
                    <p className="font-mono text-[0.46rem] tracking-[0.12em] uppercase text-[var(--text-4)]">Previous</p>
                    <p className="font-mono text-[0.62rem] text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors mt-[2px]">{ALL_PAGES[activeIdx - 1].label}</p>
                  </div>
                </button>
              ) : <div />}
              {activeIdx < ALL_PAGES.length - 1 ? (
                <button type="button" onClick={() => go(ALL_PAGES[activeIdx + 1].id)} className="group flex items-center gap-3 text-right">
                  <div>
                    <p className="font-mono text-[0.46rem] tracking-[0.12em] uppercase text-[var(--text-4)]">Next</p>
                    <p className="font-mono text-[0.62rem] text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors mt-[2px]">{ALL_PAGES[activeIdx + 1].label}</p>
                  </div>
                  <span className="font-mono text-[0.8rem] text-[var(--text-4)] group-hover:text-[var(--accent)] transition-colors">→</span>
                </button>
              ) : (
                <Link href="/#access" className="group flex items-center gap-3 text-right no-underline">
                  <div>
                    <p className="font-mono text-[0.46rem] tracking-[0.12em] uppercase text-[var(--text-4)]">You're caught up</p>
                    <p className="font-mono text-[0.62rem] text-[var(--accent)] group-hover:text-[var(--text-1)] transition-colors mt-[2px]">Get early access →</p>
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

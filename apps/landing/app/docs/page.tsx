"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

// ─────────────────────────────────────────────────────────────
// Nav structure
// ─────────────────────────────────────────────────────────────

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
    group: "Core capabilities",
    pages: [
      { id: "content-intelligence",   label: "Content intelligence" },
      { id: "agent-system",           label: "Agent system" },
      { id: "brand-dna",              label: "Brand DNA & memory" },
      { id: "distribution",           label: "Distribution & repurposing" },
    ],
  },
  {
    group: "Who it's for",
    pages: [
      { id: "for-creators",      label: "Creators" },
      { id: "for-teams",         label: "Small teams" },
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

// ─────────────────────────────────────────────────────────────
// Search index
// ─────────────────────────────────────────────────────────────

const SEARCH_INDEX = [
  { id: "what-is-viralclaw",   terms: "what is viralclaw overview infrastructure creators ai native" },
  { id: "the-problem",         terms: "problem fragmentation content workflow creators manual slow" },
  { id: "how-it-works",        terms: "how works agents orchestrator missions brand dna memory" },
  { id: "content-intelligence",terms: "content youtube transcript clips hooks scripts repurpose trend viral" },
  { id: "agent-system",        terms: "agents orchestrator trend strategy production distribution analytics revenue" },
  { id: "brand-dna",           terms: "brand dna voice audience memory persistent learning" },
  { id: "distribution",        terms: "distribution repurposing schedule platforms shorts threads linkedin" },
  { id: "for-creators",        terms: "creators youtube channel growth automated audience operator" },
  { id: "for-teams",           terms: "teams small operator studio media organization" },
  { id: "roadmap",             terms: "roadmap phases launch timeline plans" },
  { id: "access",              terms: "access waitlist pricing early cohort founder" },
];

function search(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SEARCH_INDEX
    .filter(p => p.terms.includes(q) || ALL_PAGES.find(x => x.id === p.id)?.label.toLowerCase().includes(q))
    .map(p => p.id);
}

// ─────────────────────────────────────────────────────────────
// Design primitives
// ─────────────────────────────────────────────────────────────

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
    tip:  { c: "var(--green)",      b: "var(--green-border)", bg: "var(--green-dim)", l: "Pro tip" },
    warn: { c: "var(--amber)",      b: "rgba(245,158,11,0.22)", bg: "var(--amber-dim)", l: "Heads up" },
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

function CompareRow({ platform, strength, limit, edge }: { platform: string; strength: string; limit: string; edge: string }) {
  return (
    <tr className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-3)] transition-colors">
      <td className="px-4 py-3 font-mono text-[0.65rem] text-[var(--text-1)] align-top">{platform}</td>
      <td className="px-4 py-3 text-[0.72rem] text-[var(--text-2)] align-top">{strength}</td>
      <td className="px-4 py-3 text-[0.72rem] text-[var(--accent)] align-top">{limit}</td>
      <td className="px-4 py-3 text-[0.72rem] text-[var(--green)] align-top font-medium">{edge}</td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────
// Page content
// ─────────────────────────────────────────────────────────────

function WhatIsViralClaw() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>What is<br />ViralClaw?</PageTitle>
    <Lede>
      ViralClaw is the autonomous operating system for AI-native creators. It watches YouTube
      and social platforms in real time — and turns those signals into strategy, content, and
      distribution, continuously.
    </Lede>

    <Body>
      We're building infrastructure for creators who want to operate like media organizations —
      without hiring large teams. The system runs 24/7 while you focus on vision and high-value creation.
    </Body>

    <Body>
      It's not a dashboard or an AI writing tool. It's a multi-agent OS — one that connects
      discovery, strategy, production, and distribution into a single continuous loop that learns
      your voice and gets better with every cycle.
    </Body>

    <HR />

    <H2>The four layers</H2>
    <Body>Every capability in ViralClaw sits inside one of four layers. They're designed to work
    together — the output of one feeds the input of the next.</Body>

    <Grid>
      <Cell label="01 — Discovery">
        Monitors YouTube format trends, channel performance patterns, social signals, and niche
        narratives — across thousands of channels in real time.
      </Cell>
      <Cell label="02 — Strategy">
        AI models that understand <em>why</em> something is performing — not just that it is.
        Turns intelligence into briefs, title variants, and content calendars.
      </Cell>
      <Cell label="03 — Production">
        Turns briefs into ready-to-review content. Scripts, Shorts, threads, carousels, emails —
        in your voice, calibrated to what's working right now in your niche.
      </Cell>
      <Cell label="04 — Distribution">
        Schedules and publishes across platforms. Repurposes long-form into derivatives automatically.
        Runs analytics cycles and feeds learnings back into Brand DNA.
      </Cell>
    </Grid>

    <HR />

    <H2>How ViralClaw is different</H2>
    <div className="overflow-x-auto my-6 border border-[var(--border)]">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="bg-[var(--bg-3)] border-b border-[var(--border)]">
            {["Platform","What it's good at","What it can't do","ViralClaw's edge"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-3)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <CompareRow platform="ChatGPT / Claude" strength="General writing" limit="No YouTube intelligence or memory" edge="Niche-aware content with persistent brand voice" />
          <CompareRow platform="TubeBuddy / VidIQ" strength="YouTube SEO hints" limit="No autonomous production" edge="Full agent loop from signal to published content" />
          <CompareRow platform="Opus Clip" strength="Clip repurposing" limit="No strategy or trend intelligence" edge="Trend-informed production + full distribution" />
          <CompareRow platform="Notion AI" strength="Note-taking + drafting" limit="No real-time niche signals" edge="Live intelligence feeding every production decision" />
          <CompareRow platform="Hootsuite" strength="Scheduling" limit="No content generation or intelligence" edge="Content is generated, optimized, then scheduled" />
        </tbody>
      </table>
    </div>

    <Note type="info">
      ViralClaw is currently in development. The waitlist is open. The first cohort gets founder pricing,
      permanently. <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2">Join the waitlist →</Link>
    </Note>
  </>;
}

function TheProblem() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>The<br />problem</PageTitle>
    <Lede>
      The information is out there. The trends are forming in real time. The problem is that
      no existing tool connects discovery to strategy to production to distribution — and
      the gap between them is where opportunity and consistency die.
    </Lede>

    <H2>Four breakdowns, one root cause</H2>
    <Body>The root cause is fragmentation. Here's what that looks like in practice:</Body>

    <div className="space-y-3 my-6">
      {[
        {
          label: "A — Research is manual and disconnected",
          body: "To stay on top of your niche today you're checking YouTube analytics, watching competitors, following trends on X, reading newsletters, and tracking what's working — manually, in your head, under constant pressure. None of these talk to each other. You're the synthesis layer."
        },
        {
          label: "B — Content windows close before you can act",
          body: "By the time most creators discover a trend, build a strategy around it, script it, film it, and publish — the window has already peaked. The bottleneck isn't talent. It's the time required to go from signal to published content."
        },
        {
          label: "C — Production is a bottleneck, not a flow",
          body: "Writing scripts, reformatting for Shorts, repurposing to threads, scheduling across platforms — each step is manual. The overhead of production forces most creators to publish less than they should and repurpose almost nothing."
        },
        {
          label: "D — AI tools have no niche memory",
          body: "General AI writing tools produce generic output because they don't know your audience, your voice, what's worked before, or what's trending in your specific niche today. Every session starts from scratch."
        },
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

    <H2>The result</H2>
    <Body>
      Talented creators publish inconsistently, miss trend windows, repurpose nothing, and
      spend more time on production overhead than on vision. The creators who win are often
      the ones with larger teams — not better ideas.
    </Body>
    <Body>
      <Strong>ViralClaw is built to close that gap.</Strong> The system handles research, strategy,
      production, repurposing, distribution, and analytics — continuously, in your voice.
    </Body>
  </>;
}

function HowItWorks() {
  return <>
    <Eyebrow>Overview</Eyebrow>
    <PageTitle>How it<br />works</PageTitle>
    <Lede>
      You submit a mission or goal. The Orchestrator decomposes it into tasks and routes them
      to specialized agents. Human review gates keep you in control of what gets published.
    </Lede>

    <H2>The mission loop</H2>

    <div className="my-8">
      {[
        { n: "01", label: "Submit a mission", body: "Type a goal or brain dump in plain language — \"Grow my channel to 50K this quarter\" or \"Repurpose last month's top videos for X and LinkedIn.\" The Orchestrator decomposes it into ordered tasks." },
        { n: "02", label: "Intelligence runs", body: "The Trend & Intelligence Agent monitors YouTube format patterns, niche signals, and your historical performance data. It produces an IntelligenceReport — ranked opportunities with plain-language explanations." },
        { n: "03", label: "Strategy briefs", body: "The Strategy Agent turns the IntelligenceReport + your Brand DNA into content briefs, title variants, and a prioritized calendar. You review and approve before production begins." },
        { n: "04", label: "Production", body: "The Production Agent writes scripts, Shorts, threads, and carousels — in your voice, using your Brand DNA. All output has status: review until you approve it." },
        { n: "05", label: "Distribution", body: "The Distribution Agent schedules and publishes approved content across your connected platforms. It never publishes without explicit approval — the gate is hard-coded." },
        { n: "06", label: "Analytics cycle", body: "After publish, the Analytics Agent pulls metrics at 24h, 72h, and 7d intervals. It extracts format and hook signals, updates your Brand DNA, and feeds the next cycle." },
      ].map(s => (
        <FlowStep key={s.n} n={s.n} label={s.label}>{s.body}</FlowStep>
      ))}
    </div>

    <Note type="tip">
      The system improves every cycle. The more content it produces and analyzes for you, the
      more accurate its Brand DNA becomes — and the better the output gets.
    </Note>
  </>;
}

function ContentIntelligence() {
  return <>
    <Eyebrow>Core capabilities</Eyebrow>
    <PageTitle>Content<br />intelligence</PageTitle>
    <Lede>
      Real-time YouTube signal detection across your niche — format patterns, hook structures,
      upload timing, and what's working before it peaks.
    </Lede>

    <H2>What the system monitors</H2>
    <Grid>
      <Cell label="Format patterns">Thumbnail style, title structure, video length, hook type, and pacing patterns across thousands of channels in your niche.</Cell>
      <Cell label="Upload timing">When top performers publish and when your specific audience is most engaged — not generic averages.</Cell>
      <Cell label="Hook analysis">What openings are retaining viewers past 30 seconds. The system identifies the hook structures working right now, not 6 months ago.</Cell>
      <Cell label="Competitor signals">Channel-level performance shifts — what's accelerating, what's declining, and which formats are being copied across the niche.</Cell>
    </Grid>

    <HR />

    <H2>From signal to brief</H2>
    <Body>
      Intelligence doesn't stop at data. The system interprets signals in the context of your
      Brand DNA — filtering for what fits your audience, voice, and positioning — and delivers
      plain-language briefs with confidence scores and estimated windows.
    </Body>

    <Note type="tip">
      The more you use ViralClaw, the more accurate its niche model becomes. Intelligence
      quality compounds over time as Brand DNA is updated each analytics cycle.
    </Note>
  </>;
}

function AgentSystem() {
  return <>
    <Eyebrow>Core capabilities</Eyebrow>
    <PageTitle>Agent<br />system</PageTitle>
    <Lede>
      Six specialized agents coordinated by an Orchestrator. Each has a defined role, a
      set of tools, and writes to the shared memory system after every task.
    </Lede>

    <H2>The agents</H2>

    {[
      { name: "Orchestrator", color: "var(--accent)", desc: "Decomposes missions into ordered AgentTask[], routes tasks, manages review gates, and handles error recovery. Persists state in Redis + Supabase." },
      { name: "01 — Trend & Intelligence", color: "var(--cyan-light)", desc: "Monitors YouTube format trends and social signals across your niche. Produces ranked IntelligenceReports with plain-language explanations." },
      { name: "02 — Strategy", color: "var(--teal)", desc: "Turns IntelligenceReports + Brand DNA into ContentBriefs and ContentCalendars. Scores signals against your audience fit and historical performance." },
      { name: "03 — Production", color: "var(--green)", desc: "Writes scripts, threads, Shorts, carousels, and emails. Loads your Brand DNA before every piece. All output requires human approval before progressing." },
      { name: "04 — Distribution", color: "var(--green)", desc: "Schedules and publishes approved content to YouTube, X, LinkedIn, TikTok, and Instagram. Hard gate: only publishes assets with status: approved." },
      { name: "05 — Analytics", color: "var(--cyan-light)", desc: "Fetches metrics 24h/72h/7d after publish. Extracts format and hook signals. Updates Brand DNA graph and Qdrant embeddings each cycle." },
      { name: "06 — Revenue", color: "var(--amber)", desc: "Surfaces sponsorship matches and monetization opportunities. All financial actions require explicit human confirmation." },
    ].map(a => (
      <div key={a.name} className="mb-4 border border-[var(--border)] bg-[var(--bg-2)] p-5">
        <div className="font-cond text-[0.9rem] font-bold uppercase tracking-[0.06em] mb-2" style={{ color: a.color }}>{a.name}</div>
        <p className="text-[0.83rem] text-[var(--text-2)] leading-[1.75]">{a.desc}</p>
      </div>
    ))}

    <Note type="warn">
      The Distribution Agent will <strong>never publish</strong> without an asset having{" "}
      <code className="font-mono text-[0.75em] px-1 py-[1px] bg-[var(--bg-3)] border border-[var(--border)]">status: "approved"</code>.
      This gate is hard-coded and cannot be disabled.
    </Note>
  </>;
}

function BrandDNA() {
  return <>
    <Eyebrow>Core capabilities</Eyebrow>
    <PageTitle>Brand DNA<br />&amp; memory</PageTitle>
    <Lede>
      The persistent intelligence layer that makes every agent smarter over time. Brand DNA
      encodes your voice, audience, top formats, and what's worked — and gets updated every
      analytics cycle.
    </Lede>

    <H2>What Brand DNA contains</H2>
    <Grid>
      <Cell label="Creator voice">Tone, style, phrasing patterns, what to avoid. The Production Agent loads this before writing anything.</Cell>
      <Cell label="Audience profile">Who your audience is, what resonates, what the data shows about their behavior on your content.</Cell>
      <Cell label="Format performance">Which content formats, hook types, and lengths perform best for your specific audience.</Cell>
      <Cell label="Content pillars">Your core topics and how they're positioned. Used to filter signals and keep strategy coherent.</Cell>
    </Grid>

    <H2>How it updates</H2>
    <Body>
      After every analytics cycle, the Analytics Agent extracts signals from your published
      content's performance and writes updates to Brand DNA. The more the system runs, the
      more accurate it becomes.
    </Body>
    <Body>
      Brand DNA is stored in Neo4j (graph relationships between formats, performance, and
      audience segments) and Qdrant (vector embeddings for semantic similarity search). Redis
      caches the active state during mission execution.
    </Body>

    <Note type="tip">
      You can manually edit Brand DNA at any time in Settings. The system's suggestions
      get better when your voice description is specific and honest.
    </Note>
  </>;
}

function Distribution() {
  return <>
    <Eyebrow>Core capabilities</Eyebrow>
    <PageTitle>Distribution<br />&amp; repurposing</PageTitle>
    <Lede>
      One piece of approved content becomes many. The Production Agent generates derivatives
      automatically. The Distribution Agent schedules and publishes them — on your approval.
    </Lede>

    <H2>Supported platforms</H2>
    <Grid>
      <Cell label="YouTube">Long-form video scripts + YouTube Shorts scripts. Upload timing recommendations per your niche and audience.</Cell>
      <Cell label="X (Twitter)">Threads, single posts, and quote posts. Hook calibrated to what's resonating in your niche on X right now.</Cell>
      <Cell label="LinkedIn">Professional framing of the same core content. Audience-aware tone adjustment.</Cell>
      <Cell label="Instagram & TikTok">Short-form scripts and carousel slides. Format-specific structure per platform.</Cell>
    </Grid>

    <H2>Repurposing workflow</H2>
    <Body>
      When a piece of content performs well, the Analytics Agent flags it. The Production Agent
      then queues a repurposing run — generating the full derivative asset set for review.
      You approve, Distribution schedules.
    </Body>

    <Note type="info">
      Repurposing is always triggered by performance data — not arbitrary. The system prioritizes
      your top performers and generates derivatives calibrated to each platform's current format norms.
    </Note>
  </>;
}

function ForCreators() {
  return <>
    <Eyebrow>Who it's for</Eyebrow>
    <PageTitle>For<br />creators</PageTitle>
    <Lede>
      ViralClaw is built for YouTubers and content creators who want to operate at scale
      without building a team. If you're publishing at least weekly and have a defined niche,
      the system can immediately start improving your output quality and consistency.
    </Lede>

    <H2>What changes</H2>
    {[
      { label: "Research", before: "Hours per week manually tracking trends and competitors", after: "Intelligence reports delivered automatically each cycle" },
      { label: "Strategy", before: "Gut-feel decisions on what to make next", after: "Data-backed briefs ranked by opportunity and audience fit" },
      { label: "Production", before: "Scripting, reformatting, repurposing — all manual", after: "Agents produce derivatives across all platforms from one brief" },
      { label: "Distribution", before: "Manual scheduling across each platform separately", after: "Approved content scheduled and published automatically" },
      { label: "Analytics", before: "Checking numbers and drawing conclusions manually", after: "Performance signals extracted and fed back into Brand DNA" },
    ].map(row => (
      <div key={row.label} className="mb-px border border-[var(--border)] grid grid-cols-[80px_1fr_1fr] gap-px bg-[var(--border)]">
        <div className="bg-[var(--bg-3)] p-3 font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--accent)]">{row.label}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--text-3)] leading-[1.65]">{row.before}</div>
        <div className="bg-[var(--bg-2)] p-3 text-[0.78rem] text-[var(--green)] leading-[1.65]">{row.after}</div>
      </div>
    ))}

    <Note type="tip">
      The system works best when your Brand DNA is fully configured and you're publishing
      regularly. The analytics cycle compounds — each iteration makes the next one better.
    </Note>
  </>;
}

function ForTeams() {
  return <>
    <Eyebrow>Who it's for</Eyebrow>
    <PageTitle>For small<br />teams</PageTitle>
    <Lede>
      Small content teams and creator studios can use ViralClaw to dramatically increase
      output and consistency without adding headcount. The agents act as the research,
      strategy, and production layer your team doesn't have to hire for.
    </Lede>

    <H2>Team use cases</H2>
    <Grid>
      <Cell label="Multi-channel management">Run intelligence and production cycles across multiple channels simultaneously. Each channel gets its own Brand DNA and content calendar.</Cell>
      <Cell label="Client reporting">Analytics Agent produces structured performance reports that map directly to client deliverables.</Cell>
      <Cell label="Batch production">Submit multiple briefs at once. Agents work in parallel and queue output for team review.</Cell>
      <Cell label="Brand consistency">Brand DNA ensures every piece of content — regardless of who reviews it — stays on-voice and on-strategy.</Cell>
    </Grid>

    <Note type="info">
      Team and Enterprise plans include API access for custom integrations and private intelligence
      layers. <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2">Join the waitlist →</Link>
    </Note>
  </>;
}

function Roadmap() {
  return <>
    <Eyebrow>Product</Eyebrow>
    <PageTitle>Roadmap</PageTitle>
    <Lede>
      ViralClaw is being built in phases. Here's what's done, what's in progress, and
      what's coming.
    </Lede>

    {[
      {
        phase: "Phase 1 — Foundation",
        status: "In progress",
        color: "var(--amber)",
        items: [
          { done: true,  l: "Architecture and agent definitions" },
          { done: true,  l: "Brand DNA model and memory system" },
          { done: true,  l: "YouTube intelligence pipeline" },
          { done: false, l: "Strategy + Production agents — alpha" },
          { done: false, l: "Command Center dashboard — alpha" },
          { done: false, l: "First cohort onboarding" },
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
          { done: false, l: "Multi-channel management for teams and studios" },
          { done: false, l: "API access for custom integrations" },
          { done: false, l: "Intelligence marketplace — community signal contributions" },
          { done: false, l: "Enterprise and DAO dashboards" },
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
      ViralClaw is invite-only. We're opening early access to a small first cohort of creators
      and teams. Founder pricing is permanent for the first cohort.
    </Lede>

    <H2>What early access means</H2>
    <Grid>
      <Cell label="Founder pricing">Locked in permanently. The price you join at is the price you pay — regardless of how pricing evolves.</Cell>
      <Cell label="Direct access">You work directly with the team. Your feedback shapes what gets built and in what order.</Cell>
      <Cell label="Early features">First access to every new agent capability and integration as it ships.</Cell>
      <Cell label="Priority support">Dedicated support channel. Real humans, fast responses.</Cell>
    </Grid>

    <HR />

    <H2>Who we're looking for</H2>
    <Body>
      Creators and small teams who are already publishing consistently, have a defined niche,
      and are ready to run on autonomous infrastructure. You don't need to be a tech expert —
      you need to be serious about your channel.
    </Body>

    <Note type="info">
      <Link href="/#access" className="text-[var(--teal)] underline underline-offset-2 font-medium">Join the waitlist →</Link>
      {" "}We'll reach out personally when your spot opens.
    </Note>
  </>;
}

// ─────────────────────────────────────────────────────────────
// Page map
// ─────────────────────────────────────────────────────────────

const PAGES: Record<string, React.ReactNode> = {
  "what-is-viralclaw":  <WhatIsViralClaw />,
  "the-problem":        <TheProblem />,
  "how-it-works":       <HowItWorks />,
  "content-intelligence": <ContentIntelligence />,
  "agent-system":       <AgentSystem />,
  "brand-dna":          <BrandDNA />,
  "distribution":       <Distribution />,
  "for-creators":       <ForCreators />,
  "for-teams":          <ForTeams />,
  "roadmap":            <Roadmap />,
  "access":             <Access />,
};

// ─────────────────────────────────────────────────────────────
// Search component
// ─────────────────────────────────────────────────────────────

function Search({ onSelect }: { onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(o => !o);
    }
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

  useEffect(() => {
    const ids = search(q);
    setResults(ids);
  }, [q]);

  const pick = (id: string) => { onSelect(id); setOpen(false); };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ background: "var(--bg-3)", borderColor: "var(--border)", minWidth: 180 }} className="flex items-center gap-2 px-3 py-[6px] text-left hover:border-[var(--border-2)] transition-colors group border"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-4)] group-hover:text-[var(--text-3)]">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span className="font-mono text-[0.56rem] tracking-[0.06em] text-[var(--text-4)] flex-1">Search docs</span>
        <span className="font-mono text-[0.44rem] tracking-[0.08em] text-[var(--text-4)] border border-[var(--border)] px-1 py-[1px] hidden sm:block">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setOpen(false)}>
          <div className="w-full max-w-[520px] mx-4 bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-4)] shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search docs..."
                className="flex-1 bg-transparent font-mono text-[0.75rem] text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none"
              />
              <button type="button" onClick={() => setOpen(false)} className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-[var(--text-4)] border border-[var(--border)] px-2 py-[2px] hover:text-[var(--text-2)]">esc</button>
            </div>

            {q.length > 0 && (
              <div className="max-h-[340px] overflow-y-auto">
                {results.length === 0 ? (
                  <p className="px-5 py-5 font-mono text-[0.6rem] text-[var(--text-4)]">No results for "{q}"</p>
                ) : results.map(id => {
                  const page = ALL_PAGES.find(p => p.id === id);
                  return page ? (
                    <button key={id} type="button" onClick={() => pick(id)}
                      className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-3)] transition-colors border-b border-[var(--border)] last:border-0">
                      <span className="font-mono text-[0.65rem] text-[var(--text-2)] hover:text-[var(--text-1)]">{page.label}</span>
                    </button>
                  ) : null;
                })}
              </div>
            )}

            {q.length === 0 && (
              <div className="px-5 py-5">
                <p className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--text-4)] mb-3">Quick links</p>
                <div className="space-y-[2px]">
                  {["what-is-viralclaw","how-it-works","agent-system","access"].map(id => {
                    const page = ALL_PAGES.find(p => p.id === id);
                    return page ? (
                      <button key={id} type="button" onClick={() => pick(id)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-[var(--bg-3)] transition-colors">
                        <span className="font-mono text-[0.65rem] text-[var(--text-3)] hover:text-[var(--text-1)]">{page.label}</span>
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

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────

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

      <header style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)", backdropFilter: "blur(20px)", borderColor: "var(--border)" }} className="sticky top-0 z-50 h-[54px] border-b flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)] shrink-0">
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
            Join waitlist →
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
                <button type="button" onClick={() => go(ALL_PAGES[activeIdx - 1].id)}
                  className="group flex items-center gap-3 text-left">
                  <span className="font-mono text-[0.8rem] text-[var(--text-4)] group-hover:text-[var(--accent)] transition-colors">←</span>
                  <div>
                    <p className="font-mono text-[0.46rem] tracking-[0.12em] uppercase text-[var(--text-4)]">Previous</p>
                    <p className="font-mono text-[0.62rem] text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors mt-[2px]">{ALL_PAGES[activeIdx - 1].label}</p>
                  </div>
                </button>
              ) : <div />}

              {activeIdx < ALL_PAGES.length - 1 ? (
                <button type="button" onClick={() => go(ALL_PAGES[activeIdx + 1].id)}
                  className="group flex items-center gap-3 text-right">
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
                    <p className="font-mono text-[0.62rem] text-[var(--accent)] group-hover:text-[var(--text-1)] transition-colors mt-[2px]">Join the waitlist →</p>
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

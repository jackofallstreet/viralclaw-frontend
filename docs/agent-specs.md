# Agent Specifications

## Orchestrator

- **Framework**: LangGraph (Python)
- **Model**: claude-sonnet-4-20250514
- **Responsibilities**: Mission decomposition, task routing, review gates, error recovery
- **State**: Persisted in Redis (short-term) + Supabase (long-term)
- **Human gates**: Before Production runs, before Distribution runs

---

## 1. Trend & Intelligence Agent

- **Model**: claude-sonnet-4-20250514
- **Inputs**: User niche, BrandDNA, date range
- **Outputs**: `IntelligenceReport` (ranked signals, format patterns, timing)
- **Tools**:
  - `youtube_search` — trending video analysis
  - `google_trends` — topic and keyword momentum
  - `x_search` — social volume + sentiment
- **Memory writes**: Qdrant (signal embeddings), Neo4j (TrendSignal nodes)

---

## 2. Strategy Agent

- **Model**: claude-sonnet-4-20250514 (planning); claude-opus-4-20250514 (complex campaigns)
- **Inputs**: `IntelligenceReport`, `BrandDNA`, user goals
- **Outputs**: `ContentBrief[]`, `ContentCalendar`
- **Key logic**:
  - Scores each signal against Brand DNA alignment
  - Applies historical performance data from Neo4j
  - Generates 3–5 title variants per brief
  - Assigns optimal publish windows
- **Memory reads**: Neo4j (top formats, audience segments), Qdrant (similar past briefs)

---

## 3. Production / Repurpose Agent

- **Model**: claude-sonnet-4-20250514
- **Inputs**: `ContentBrief` or existing long-form content
- **Outputs**: `ContentAsset[]` — scripts, threads, Shorts, carousels, emails
- **Key logic**:
  - Loads creator voice from BrandDNA before writing
  - Platform-specific format rules per output type
  - All outputs have `status: "review"` until human approves
- **Never publishes directly** — always routes through Distribution Agent after approval

---

## 4. Distribution Agent

- **Model**: claude-sonnet-4-20250514 (formatting, reply generation)
- **Inputs**: Approved `ContentAsset[]`, platform targets, schedule preferences
- **Outputs**: `ScheduledPost[]`
- **Integrations**: YouTube Data API v3, X API v2, TikTok, LinkedIn, Instagram
- **Scheduling**: Temporal.io for reliable async execution
- **Publish gates**: Hard-coded — will never publish unless asset has `status: "approved"`

---

## 5. Analytics & Memory Agent

- **Model**: claude-sonnet-4-20250514
- **Inputs**: Published content IDs, platform APIs
- **Outputs**: `PerformanceCycle`, updated BrandDNA, insight report
- **Key logic**:
  - Fetches metrics 24h, 72h, 7d after publish
  - Compares against predicted performance
  - Extracts format/hook/timing signals
  - Updates Qdrant embeddings with performance metadata
  - Updates Neo4j Brand DNA graph (Format→Performance edges)
- **Cycle frequency**: Daily (configurable)

---

## 6. Revenue Agent

- **Model**: claude-sonnet-4-20250514
- **Inputs**: BrandDNA, audience profile, content performance history
- **Outputs**: `RevenueOpportunity[]`
- **Capabilities**:
  - Sponsorship matching (niche + audience fit scoring)
  - Monetization opportunity detection
- **Hard constraint**: All financial actions require `requiresHumanApproval: true`

---

## Shared Principles

1. **Memory-first**: Every agent reads from and writes to the shared memory system
2. **Voice consistency**: Production Agent always loads BrandDNA before writing
3. **Gate enforcement**: Distribution Agent checks `status === "approved"` before any publish
4. **Cost awareness**: Cheap tasks use Sonnet; complex planning can escalate to Opus
5. **Observability**: All LLM calls traced via LangSmith; errors reported to Sentry

# ViralClawOS — Architecture

## Overview

ViralClawOS is a stateful multi-agent system built on a Turborepo monorepo with two Next.js frontends (landing + dashboard), a Python backend (FastAPI + LangGraph), and persistent memory across three stores.

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1 — User Interface                               │
│  Landing (Next.js 15)    Dashboard / Command Center     │
│  apps/landing            apps/dashboard                 │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────┐
│  Layer 2 — Orchestrator                                 │
│  services/orchestrator (FastAPI + LangGraph)            │
│  - Mission decomposition                                │
│  - Task routing (DAG)                                   │
│  - Human-in-the-loop review gates                       │
│  - State management via Redis                           │
└──────┬──────────┬───────┬──────────┬───────┬───────────┘
       │          │       │          │       │
┌──────▼──┐ ┌────▼──┐ ┌──▼────┐ ┌──▼───┐ ┌─▼──────┐
│ Trend & │ │Strat- │ │Prod-  │ │Dist- │ │Analyt- │
│ Intel.  │ │egy    │ │uction │ │rib.  │ │ics     │
│ Agent   │ │Agent  │ │Agent  │ │Agent │ │Agent   │
└──────┬──┘ └────┬──┘ └──┬────┘ └──┬───┘ └─┬──────┘
       │          │       │          │       │
┌──────▼──────────▼───────▼──────────▼───────▼───────────┐
│  Layer 4 — Tools & Integrations                         │
│  YouTube API  Google Trends  X API  TikTok  LinkedIn    │
│  LangSmith  Anthropic API                               │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│  Layer 5 — Memory                                       │
│  Redis (short-term)  Qdrant (vector)  Neo4j (graph)     │
│  Supabase Postgres (structured / users / content)       │
└─────────────────────────────────────────────────────────┘
```

## Monorepo Structure

```
viralclawos/
├── apps/
│   ├── landing/          Next.js 15 marketing site
│   └── dashboard/        Command Center (Next.js + shadcn)
├── packages/
│   ├── core/             Shared types, schemas (Zod), constants
│   ├── agents/           Agent class definitions + tool specs
│   ├── memory/           Qdrant + Neo4j + Redis clients
│   ├── integrations/     YouTube, social, LLM API clients
│   ├── utils/            cn(), formatNumber(), retry(), etc.
│   └── ui/               Shared React components
├── services/
│   ├── orchestrator/     FastAPI + LangGraph (port 8000)
│   └── intelligence/     FastAPI trend analysis service (port 8001)
└── infra/
    └── docker-compose.yml  Local dev: Qdrant + Neo4j + Redis
```

## Data Flow — Mission Execution

```
1. User submits mission text via Command Center
2. POST /missions → Orchestrator service
3. Claude decomposes mission into ordered AgentTask[]
4. Orchestrator routes Task 1 → Intelligence Agent
   - YouTube API + social APIs → IntelligenceReport
   - Stored in Qdrant + Neo4j
5. Task 2 → Strategy Agent
   - IntelligenceReport + BrandDNA → ContentBrief[]
   - Human review gate: user approves briefs
6. Task 3 → Production Agent
   - ContentBrief → ContentAsset[] (scripts, threads, Shorts)
   - Human review gate: user reviews/edits content
7. Task 4 → Distribution Agent
   - Approved ContentAsset[] → platform APIs
   - Temporal.io for reliable scheduling
8. Task 5 → Analytics Agent
   - Pull metrics from platform APIs after publish
   - Update Qdrant embeddings + Neo4j Brand DNA graph
   - Loop continues: system improves each cycle
```

## Memory System

| Store | Purpose | TTL |
|-------|---------|-----|
| **Redis** | Active task state, rate limits, API cache | Minutes–hours |
| **Qdrant** | Content embeddings, past outputs, semantic search | Permanent |
| **Neo4j** | Brand DNA graph, format→performance relationships | Permanent |
| **Supabase** | Users, missions, content assets, billing | Permanent |

## Security & Human Gates

All publishing and financial actions flow through explicit human approval:
- Briefs require review before Production runs
- Content assets require review before Distribution runs
- Financial/sponsorship decisions always require human confirmation

## Deployment (Vercel + GitHub)

| App | Vercel Project | Branch |
|-----|---------------|--------|
| Landing | `viralclawos-landing` | `main` → prod, `develop` → preview |
| Dashboard | `viralclawos-dashboard` | `main` → prod, `develop` → preview |

Python services deploy separately (Fly.io / Railway recommended):
```bash
fly deploy --config infra/fly.orchestrator.toml
fly deploy --config infra/fly.intelligence.toml
```

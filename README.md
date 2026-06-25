<div align="center">

```
 ██╗   ██╗██╗██████╗  █████╗ ██╗      ██████╗██╗      █████╗ ██╗    ██╗
 ██║   ██║██║██╔══██╗██╔══██╗██║     ██╔════╝██║     ██╔══██╗██║    ██║
 ██║   ██║██║██████╔╝███████║██║     ██║     ██║     ███████║██║ █╗ ██║
 ╚██╗ ██╔╝██║██╔══██╗██╔══██║██║     ██║     ██║     ██╔══██║██║███╗██║
  ╚████╔╝ ██║██║  ██║██║  ██║███████╗╚██████╗███████╗██║  ██║╚███╔███╔╝
   ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝
```

**Infrastructure for the next generation of AI-native creators.**

`v0.1.0` · `Node 20+` · `pnpm 9+` · `Python 3.11+`

</div>

---

## What this is

ViralClaw is a multi-agent operating system that replaces the manual creator workflow — research, strategy, production, distribution, and analytics — with a coordinated system that runs continuously and learns from every cycle.

It's not a chatbot wrapper. It's not a scheduling tool. It's an agent OS: you submit a mission, the Orchestrator decomposes it into tasks, six specialized agents execute them, and nothing publishes without explicit human approval.

The core thesis: the creators who win the next decade aren't the ones with the biggest teams — they're the ones with the best infrastructure. This is that infrastructure.

---

## Stack

| Layer | Tech |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Frontend | Next.js 15 (App Router) |
| Agent runtime | LangGraph (Python) |
| Memory / vector | Qdrant |
| Memory / graph | Neo4j |
| Memory / cache | Redis |
| Backend services | FastAPI (Python) |
| Database | Supabase (Postgres) |
| Auth / waitlist | Privy (email) |
| LLM | Claude Sonnet / Opus via Anthropic API |
| Deploy — frontend | Vercel |
| Deploy — services | Fly.io |

---

## Agents

```
┌─────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                               │
│  Decomposes missions → AgentTask[] → routes → review gates  │
└──────────┬──────────────────────────────────────────────────┘
           │
    ┌──────▼───────────────────────────────────────────────┐
    │  01  Trend & Intelligence                             │
    │      YouTube format signals, niche patterns, timing  │
    ├──────────────────────────────────────────────────────┤
    │  02  Strategy                                         │
    │      ContentBrief[], ContentCalendar from signals     │
    ├──────────────────────────────────────────────────────┤
    │  03  Production                                       │
    │      Scripts, Shorts, threads, carousels — in voice  │
    ├──────────────────────────────────────────────────────┤
    │  04  Distribution                                     │
    │      Scheduling + publishing — approval gate hard     │
    ├──────────────────────────────────────────────────────┤
    │  05  Analytics                                        │
    │      Performance cycles → Brand DNA updates           │
    ├──────────────────────────────────────────────────────┤
    │  06  Revenue                                          │
    │      Sponsorship matching, monetization ops           │
    └──────────────────────────────────────────────────────┘
```

All agents share a persistent memory layer: Qdrant (embeddings), Neo4j (Brand DNA graph), Redis (active state). Memory is what makes the system improve — not just automate.

**Hard constraint:** Distribution never publishes an asset without `status: "approved"`. This is not configurable.

---

## Local setup

**Prerequisites:** Node 20+, pnpm 9+, Python 3.11+, Docker

```bash
# 1. Clone
git clone https://github.com/yourusername/viralclawos.git
cd viralclawos

# 2. Install
pnpm install

# 3. Env
cp .env.example .env

# 4. Memory services
docker compose -f infra/docker-compose.yml up -d

# 5. Python deps (per service)
cd services/orchestrator && pip install -r requirements.txt
cd ../intelligence && pip install -r requirements.txt

# 6. Start
pnpm dev
```

| App | URL |
|---|---|
| Landing | http://localhost:3000 |
| Dashboard | http://localhost:3001 |
| Orchestrator | http://localhost:8000 |
| Intelligence | http://localhost:8001 |

Full setup: [`docs/onboarding.md`](docs/onboarding.md)

---

## Scripts

```bash
pnpm dev          # all apps in watch mode
pnpm build        # production build
pnpm lint         # lint all packages
pnpm type-check   # TS check across monorepo
pnpm test         # run all tests
pnpm format       # prettier across .ts .tsx .md .json
pnpm clean        # wipe build artifacts + node_modules
```

---

## Docs

| Doc | What's in it |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | System layers, data flow, service map |
| [`docs/agent-specs.md`](docs/agent-specs.md) | Each agent — role, tools, inputs, outputs |
| [`docs/api.md`](docs/api.md) | All service API endpoints |
| [`docs/memory-system.md`](docs/memory-system.md) | Qdrant + Neo4j + Redis schema |
| [`docs/onboarding.md`](docs/onboarding.md) | Full local + production setup |

---

## Status

Pre-alpha. Architecture and agent interfaces are defined. Production and Distribution agents are actively being built. First cohort gets early access when Phase 1 ships.

---

## License

MIT

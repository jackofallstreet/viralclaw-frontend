# Onboarding Guide

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm i -g pnpm`)
- Docker + Docker Compose (for local memory services)
- Python 3.12+ (if running services locally)

## 1. Clone & Install

```bash
git clone https://github.com/yourusername/viralclawos.git
cd viralclawos
pnpm install
cp .env.example .env
```

## 2. Configure Environment

Fill in `.env` with your keys. Minimum required for local dev:

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Required for Supabase auth + DB
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Optional (enables specific agents):
```bash
YOUTUBE_API_KEY=...          # Trend & Intelligence Agent
X_BEARER_TOKEN=...           # X/Twitter distribution
```

## 3. Start Memory Services

```bash
docker compose -f infra/docker-compose.yml up -d
```

This starts:
- **Qdrant** on `localhost:6333`
- **Neo4j** on `localhost:7474` (browser), `localhost:7687` (bolt)
- **Redis** on `localhost:6379`

## 4. Run the Apps

```bash
# All apps in parallel (recommended)
pnpm dev

# Or individually:
pnpm --filter @viralclawos/landing dev    # localhost:3000
pnpm --filter @viralclawos/dashboard dev # localhost:3001
```

## 5. Run Python Services (optional)

```bash
cd services/orchestrator
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000

# In another terminal:
cd services/intelligence
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8001
```

## 6. Deploy to Vercel

### Landing
1. Go to vercel.com → New Project → Import your repo
2. Set Root Directory: `apps/landing`
3. Framework: Next.js
4. Build command: `cd ../.. && pnpm build --filter=@viralclawos/landing`
5. Add environment variables from `.env`

### Dashboard
Same process with Root Directory: `apps/dashboard`

### GitHub Secrets for CI/CD
Add these to your GitHub repo secrets:
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID_LANDING
VERCEL_PROJECT_ID_DASHBOARD
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Project Structure Quick Reference

```
apps/landing/          → Marketing site (Next.js)
apps/dashboard/        → Command Center (Next.js)
packages/core/         → Shared types + constants
packages/agents/       → Agent class definitions
packages/memory/       → Qdrant + Neo4j + Redis clients
packages/integrations/ → External API clients
packages/utils/        → Utility functions
packages/ui/           → Shared React components
services/orchestrator/ → FastAPI + LangGraph (Python)
services/intelligence/ → FastAPI trend analysis service (Python)
infra/                 → Docker Compose, Terraform
docs/                  → Architecture, agent specs, API, memory
```

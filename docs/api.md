# API Reference

## Orchestrator Service — `localhost:8000`

### Health
```
GET /health
→ { status, service, ts }
```

### Missions
```
POST /missions
Body: { user_id: string, input: string }
→ MissionResponse

GET /missions/:id
→ MissionResponse

POST /missions/:id/approve
Body: { task_id: string, approved: boolean, note?: string }
→ { ok, task_id, approved }
```

### Agents
```
GET /agents
→ { agents: AgentStatus[] }

GET /tasks/:id
→ AgentTask
```

---

## Intelligence Service — `localhost:8001`

### Health
```
GET /health
→ { status, service, ts }
```

### YouTube Intelligence
```
POST /intelligence/youtube
Body: { niche: string, user_id: string, days_back?: number, max_channels?: number }
→ IntelligenceReport
```

### Narratives
```
GET /intelligence/narratives
→ { narratives: TrendSignal[], generated_at }
```

---

## Next.js API Routes (Dashboard — `localhost:3001/api`)

### Auth (Supabase)
```
GET  /api/auth/session
POST /api/auth/signout
```

### Missions
```
POST /api/missions
GET  /api/missions
GET  /api/missions/:id
```

### Content
```
GET  /api/content
GET  /api/content/:id
PATCH /api/content/:id          { status: "approved" | "rejected" }
```

### Agents
```
GET  /api/agents
GET  /api/agents/:id/status
```

### Brand DNA
```
GET  /api/brand-dna
PATCH /api/brand-dna
```

### Analytics
```
GET  /api/analytics/performance?period=7d|30d|90d
GET  /api/analytics/cycle/:id
```

---

## Type Reference

```typescript
// From packages/core/src/types/

type AgentId =
  | "orchestrator" | "trend-intelligence" | "strategy"
  | "production"   | "distribution"       | "analytics" | "revenue"

type AgentStatus = "idle" | "active" | "paused" | "error"

type Platform =
  | "youtube" | "youtube-shorts" | "x"
  | "tiktok"  | "linkedin"       | "instagram" | "telegram"

type ContentType =
  | "video-script" | "short-script" | "thread"
  | "carousel"     | "email"        | "newsletter" | "caption"

type MissionStatus =
  | "queued" | "decomposing" | "running"
  | "awaiting-review" | "complete" | "failed" | "cancelled"
```

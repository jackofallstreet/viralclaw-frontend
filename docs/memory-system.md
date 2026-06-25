# Memory System

ViralClawOS uses a three-layer memory architecture: short-term (Redis), semantic (Qdrant), and relational-graph (Neo4j).

## Layer 1 — Short-Term Memory (Redis)

**Purpose**: Active task state, API response caching, rate limiting, session state

```
Keys:
  task:{taskId}                 → AgentTask state (TTL: 24h)
  ratelimit:{userId}:{action}   → Rate limit counter (TTL: window)
  cache:youtube:{query}:{date}  → YouTube API response (TTL: 1h)
  cache:youtube:{query}          → YouTube API results (TTL: 30m)
  session:{userId}              → Active mission state
```

## Layer 2 — Vector Memory (Qdrant)

**Purpose**: Semantic search over past content, signals, and Brand DNA snapshots

**Collection**: `viralclawos`

**Payload schema per point**:
```json
{
  "id": "uuid",
  "vector": [1536-dim embedding],
  "payload": {
    "type": "content_asset | intelligence_report | brand_dna_snapshot",
    "userId": "...",
    "platform": "youtube | x | ...",
    "format": "video-script | thread | ...",
    "views": 42100,
    "engagement": 0.047,
    "publishedAt": "2025-01-15T14:00:00Z",
    "title": "...",
    "hook": "..."
  }
}
```

**Use cases**:
- "Find content similar to this brief that performed well"
- "What hooks worked best for this audience in the last 90 days?"
- "Style match: find past scripts that sound like the creator's voice"

## Layer 3 — Graph Memory (Neo4j)

**Purpose**: Brand DNA relationships, format→performance patterns, audience segmentation

**Node types**:
```
(:Creator)         userId, niche, voice, updatedAt
(:ContentAsset)    id, platform, format, views, engagement, publishedAt
(:ContentPillar)   name
(:Format)          name
(:Topic)           name
(:AudienceSegment) name, size
(:TrendSignal)     id, type, title, urgency, detectedAt
(:Platform)        name
(:TimingWindow)    platform, dayOfWeek, hourUTC, avgEngagement
```

**Relationship types**:
```
(Creator)-[:PUBLISHED]->(ContentAsset)
(Creator)-[:HAS_PILLAR]->(ContentPillar)
(ContentAsset)-[:USES_FORMAT]->(Format)
(ContentAsset)-[:COVERS_TOPIC]->(Topic)
(ContentAsset)-[:TARGETS]->(AudienceSegment)
(ContentAsset)-[:PUBLISHED_ON]->(Platform)
(TrendSignal)-[:RELATED_TO]->(Topic)
(Platform)-[:HAS_WINDOW]->(TimingWindow)
```

**Key queries**:
```cypher
-- Top performing formats for a creator
MATCH (c:Creator {userId: $userId})-[:PUBLISHED]->(a:ContentAsset)-[:USES_FORMAT]->(f:Format)
WITH f.name AS format, avg(a.views) AS avgViews, count(a) AS count
ORDER BY avgViews DESC LIMIT 5
RETURN format, avgViews, count

-- Best upload windows per platform
MATCH (p:Platform {name: $platform})-[:HAS_WINDOW]->(w:TimingWindow)
ORDER BY w.avgEngagement DESC LIMIT 3
RETURN w.dayOfWeek, w.hourUTC, w.avgEngagement

-- Topics with growing trend signals
MATCH (t:TrendSignal)-[:RELATED_TO]->(topic:Topic)
WHERE t.detectedAt > datetime() - duration({days: 7})
AND t.urgency IN ['medium', 'high']
RETURN topic.name, count(t) AS signalCount
ORDER BY signalCount DESC
```

## Layer 4 — Structured Data (Supabase Postgres)

**Purpose**: Canonical source of truth for users, missions, content, billing

```sql
users           (id, email, plan, created_at, onboarded_at)
brand_dna       (user_id, voice, niche, target_audience, pillars, updated_at)
missions        (id, user_id, input, status, task_ids, created_at, updated_at)
agent_tasks     (id, mission_id, agent_id, type, status, input, output, created_at)
content_briefs  (id, mission_id, title, hook, angle, platforms, publish_window, created_at)
content_assets  (id, brief_id, type, platform, body, status, published_at, created_at)
performance     (asset_id, platform, views, engagement, fetched_at)
```

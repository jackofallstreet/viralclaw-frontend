import neo4j, { Driver, Session } from "neo4j-driver";

/**
 * Graph Memory Layer (Neo4j)
 *
 * Models relationships between:
 * - Creator → ContentPiece → Performance
 * - Topic → Format → AudienceSegment
 * - Niche → Trend → ContentOpportunity
 * - Platform → TimingWindow → EngagementRate
 *
 * Enables: pattern discovery, audience segmentation, Brand DNA evolution
 */
export class GraphMemory {
  private driver: Driver;

  constructor(config: { uri: string; user: string; password: string }) {
    this.driver = neo4j.driver(
      config.uri,
      neo4j.auth.basic(config.user, config.password)
    );
  }

  private session(): Session {
    return this.driver.session();
  }

  async close(): Promise<void> {
    await this.driver.close();
  }

  // ── Brand DNA ──────────────────────────────────────────────

  async upsertCreatorProfile(userId: string, props: Record<string, unknown>): Promise<void> {
    const session = this.session();
    try {
      await session.run(
        `MERGE (c:Creator {userId: $userId})
         SET c += $props, c.updatedAt = datetime()`,
        { userId, props }
      );
    } finally {
      await session.close();
    }
  }

  async addContentPillar(userId: string, pillar: string): Promise<void> {
    const session = this.session();
    try {
      await session.run(
        `MERGE (c:Creator {userId: $userId})
         MERGE (p:ContentPillar {name: $pillar})
         MERGE (c)-[:HAS_PILLAR]->(p)`,
        { userId, pillar }
      );
    } finally {
      await session.close();
    }
  }

  // ── Content Performance ────────────────────────────────────

  async recordPerformance(data: {
    userId: string;
    assetId: string;
    platform: string;
    format: string;
    views: number;
    engagement: number;
    publishedAt: Date;
  }): Promise<void> {
    const session = this.session();
    try {
      await session.run(
        `MERGE (c:Creator {userId: $userId})
         MERGE (a:ContentAsset {id: $assetId})
         SET a.platform = $platform, a.format = $format,
             a.views = $views, a.engagement = $engagement,
             a.publishedAt = $publishedAt
         MERGE (c)-[:PUBLISHED]->(a)
         WITH c, a
         MERGE (f:Format {name: $format})
         MERGE (a)-[:USES_FORMAT]->(f)`,
        {
          userId: data.userId,
          assetId: data.assetId,
          platform: data.platform,
          format: data.format,
          views: neo4j.int(data.views),
          engagement: data.engagement,
          publishedAt: data.publishedAt.toISOString(),
        }
      );
    } finally {
      await session.close();
    }
  }

  async getTopFormats(userId: string, limit: number = 5): Promise<Array<{
    format: string;
    avgViews: number;
    count: number;
  }>> {
    const session = this.session();
    try {
      const result = await session.run(
        `MATCH (c:Creator {userId: $userId})-[:PUBLISHED]->(a:ContentAsset)-[:USES_FORMAT]->(f:Format)
         WITH f.name AS format, avg(a.views) AS avgViews, count(a) AS count
         ORDER BY avgViews DESC
         LIMIT $limit
         RETURN format, avgViews, count`,
        { userId, limit: neo4j.int(limit) }
      );
      return result.records.map((r) => ({
        format: r.get("format") as string,
        avgViews: r.get("avgViews") as number,
        count: (r.get("count") as { toNumber: () => number }).toNumber(),
      }));
    } finally {
      await session.close();
    }
  }

  // ── Trends ─────────────────────────────────────────────────

  async recordTrendSignal(signal: {
    id: string;
    type: string;
    title: string;
    urgency: string;
    detectedAt: Date;
  }): Promise<void> {
    const session = this.session();
    try {
      await session.run(
        `MERGE (t:TrendSignal {id: $id})
         SET t.type = $type, t.title = $title,
             t.urgency = $urgency, t.detectedAt = $detectedAt`,
        {
          id: signal.id,
          type: signal.type,
          title: signal.title,
          urgency: signal.urgency,
          detectedAt: signal.detectedAt.toISOString(),
        }
      );
    } finally {
      await session.close();
    }
  }
}

import { QdrantClient } from "@qdrant/js-client-rest";

export interface VectorRecord {
  id: string;
  vector: number[];
  payload: Record<string, unknown>;
}

export interface SearchResult {
  id: string;
  score: number;
  payload: Record<string, unknown>;
}

/**
 * Vector Memory Layer (Qdrant)
 *
 * Stores and retrieves semantic embeddings for:
 * - Past content outputs (scripts, threads, carousels)
 * - Performance data per content piece
 * - Brand DNA semantic snapshots
 * - Intelligence reports and signals
 *
 * Enables: semantic search, "what performed like this before?", style matching
 */
export class VectorMemory {
  private client: QdrantClient;
  private readonly collection: string;

  constructor(config: { url: string; apiKey?: string; collection?: string }) {
    this.client = new QdrantClient({
      url: config.url,
      apiKey: config.apiKey,
    });
    this.collection = config.collection ?? "viralclawos";
  }

  async ensureCollection(vectorSize: number = 1536): Promise<void> {
    const collections = await this.client.getCollections();
    const exists = collections.collections.some((c) => c.name === this.collection);
    if (!exists) {
      await this.client.createCollection(this.collection, {
        vectors: { size: vectorSize, distance: "Cosine" },
      });
    }
  }

  async upsert(records: VectorRecord[]): Promise<void> {
    await this.client.upsert(this.collection, {
      points: records.map((r) => ({
        id: r.id,
        vector: r.vector,
        payload: r.payload,
      })),
    });
  }

  async search(
    vector: number[],
    limit: number = 5,
    filter?: Record<string, unknown>
  ): Promise<SearchResult[]> {
    const result = await this.client.search(this.collection, {
      vector,
      limit,
      filter: filter as never,
      with_payload: true,
    });
    return result.map((r) => ({
      id: String(r.id),
      score: r.score,
      payload: r.payload as Record<string, unknown>,
    }));
  }

  async delete(ids: string[]): Promise<void> {
    await this.client.delete(this.collection, {
      points: ids,
    });
  }
}

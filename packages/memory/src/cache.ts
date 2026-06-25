import Redis from "ioredis";

/**
 * Cache Layer (Redis)
 *
 * Short-term memory for:
 * - Active agent task state
 * - Rate limit tracking per user
 * - API response caching (YouTube, Google Trends, etc.)
 * - Session state for human-in-the-loop flows
 */
export class CacheMemory {
  private redis: Redis;

  constructor(url: string) {
    this.redis = new Redis(url, { lazyConnect: true });
  }

  async connect(): Promise<void> {
    await this.redis.connect();
  }

  async disconnect(): Promise<void> {
    await this.redis.quit();
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.redis.get(key);
    if (!val) return null;
    try {
      return JSON.parse(val) as T;
    } catch {
      return val as unknown as T;
    }
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async incr(key: string, ttlSeconds?: number): Promise<number> {
    const count = await this.redis.incr(key);
    if (count === 1 && ttlSeconds) {
      await this.redis.expire(key, ttlSeconds);
    }
    return count;
  }

  // Task state helpers
  async setTaskState(taskId: string, state: Record<string, unknown>): Promise<void> {
    await this.set(`task:${taskId}`, state, 60 * 60 * 24); // 24h TTL
  }

  async getTaskState(taskId: string): Promise<Record<string, unknown> | null> {
    return this.get(`task:${taskId}`);
  }

  // Rate limit helper (e.g. 20 bot analyses/month for starter plan)
  async checkRateLimit(userId: string, action: string, limit: number, windowSeconds: number): Promise<{
    allowed: boolean;
    remaining: number;
    resetAt: Date;
  }> {
    const key = `ratelimit:${userId}:${action}`;
    const count = await this.incr(key, windowSeconds);
    const ttl = await this.redis.ttl(key);
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAt: new Date(Date.now() + ttl * 1000),
    };
  }
}

// ─────────────────────────────────────────────────────────────
// X (Twitter) API v2 Client
// ─────────────────────────────────────────────────────────────

export interface XTweet {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  publicMetrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    impression_count: number;
  };
}

export class XClient {
  private readonly base = "https://api.twitter.com/2";

  constructor(
    private readonly config: {
      bearerToken: string;
      accessToken?: string;
      accessTokenSecret?: string;
    }
  ) {}

  private authHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.config.bearerToken}`,
      "Content-Type": "application/json",
    };
  }

  async postTweet(text: string): Promise<XTweet> {
    const res = await fetch(`${this.base}/tweets`, {
      method: "POST",
      headers: this.authHeaders(),
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`X API error: ${JSON.stringify(err)}`);
    }
    const data = await res.json() as { data: { id: string; text: string } };
    return {
      id: data.data.id,
      text: data.data.text,
      createdAt: new Date(),
      authorId: "",
    };
  }

  async postThread(tweets: string[]): Promise<XTweet[]> {
    // Post thread sequentially, each tweet replying to the previous
    const posted: XTweet[] = [];
    for (const text of tweets) {
      const replyTo = posted.length > 0 ? posted[posted.length - 1].id : undefined;
      const body: Record<string, unknown> = { text };
      if (replyTo) {
        body.reply = { in_reply_to_tweet_id: replyTo };
      }
      const res = await fetch(`${this.base}/tweets`, {
        method: "POST",
        headers: this.authHeaders(),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`X API thread error at tweet ${posted.length + 1}`);
      const data = await res.json() as { data: { id: string; text: string } };
      posted.push({ id: data.data.id, text: data.data.text, createdAt: new Date(), authorId: "" });
    }
    return posted;
  }

  async searchRecentTweets(query: string, maxResults = 10): Promise<XTweet[]> {
    const url = new URL(`${this.base}/tweets/search/recent`);
    url.searchParams.set("query", query);
    url.searchParams.set("max_results", String(maxResults));
    url.searchParams.set("tweet.fields", "created_at,author_id,public_metrics");

    const res = await fetch(url.toString(), { headers: this.authHeaders() });
    if (!res.ok) throw new Error(`X API error: ${res.status}`);
    const data = await res.json() as { data: Array<{ id: string; text: string; created_at: string; author_id: string; public_metrics?: XTweet["publicMetrics"] }> };

    return (data.data ?? []).map((t) => ({
      id: t.id,
      text: t.text,
      createdAt: new Date(t.created_at),
      authorId: t.author_id,
      publicMetrics: t.public_metrics,
    }));
  }
}

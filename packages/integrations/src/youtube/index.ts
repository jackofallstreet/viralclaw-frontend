export interface YouTubeVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  publishedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string; // ISO 8601
  thumbnailUrl: string;
  tags: string[];
  categoryId: string;
}

export interface ChannelStats {
  id: string;
  title: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  uploadFrequencyDays: number;
}

/**
 * YouTube Data API v3 Client
 *
 * Used by: Trend & Intelligence Agent
 */
export class YouTubeClient {
  private readonly baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor(private readonly apiKey: string) {}

  async searchVideos(params: {
    query: string;
    publishedAfter?: Date;
    maxResults?: number;
    order?: "date" | "rating" | "relevance" | "viewCount";
  }): Promise<YouTubeVideo[]> {
    const url = new URL(`${this.baseUrl}/search`);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("key", this.apiKey);
    url.searchParams.set("q", params.query);
    url.searchParams.set("maxResults", String(params.maxResults ?? 25));
    url.searchParams.set("order", params.order ?? "viewCount");
    if (params.publishedAfter) {
      url.searchParams.set("publishedAfter", params.publishedAfter.toISOString());
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json() as { items: Array<{ id: { videoId: string }; snippet: { title: string; channelId: string; channelTitle: string; publishedAt: string; thumbnails: { high: { url: string } }; tags?: string[]; categoryId?: string } }> };

    // Fetch video statistics in a batch
    const videoIds = data.items.map((i) => i.id.videoId).join(",");
    return this.getVideoDetails(videoIds);
  }

  async getVideoDetails(videoIds: string): Promise<YouTubeVideo[]> {
    const url = new URL(`${this.baseUrl}/videos`);
    url.searchParams.set("part", "snippet,statistics,contentDetails");
    url.searchParams.set("id", videoIds);
    url.searchParams.set("key", this.apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json() as { items: Array<{ id: string; snippet: { title: string; channelId: string; channelTitle: string; publishedAt: string; thumbnails: { high: { url: string } }; tags?: string[]; categoryId?: string }; statistics: { viewCount: string; likeCount: string; commentCount: string }; contentDetails: { duration: string } }> };

    return data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt),
      viewCount: parseInt(item.statistics.viewCount ?? "0"),
      likeCount: parseInt(item.statistics.likeCount ?? "0"),
      commentCount: parseInt(item.statistics.commentCount ?? "0"),
      duration: item.contentDetails.duration,
      thumbnailUrl: item.snippet.thumbnails.high?.url ?? "",
      tags: item.snippet.tags ?? [],
      categoryId: item.snippet.categoryId ?? "",
    }));
  }

  async getChannelStats(channelId: string): Promise<ChannelStats> {
    const url = new URL(`${this.baseUrl}/channels`);
    url.searchParams.set("part", "snippet,statistics");
    url.searchParams.set("id", channelId);
    url.searchParams.set("key", this.apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json() as { items: Array<{ id: string; snippet: { title: string }; statistics: { subscriberCount: string; videoCount: string; viewCount: string } }> };
    const ch = data.items[0];

    return {
      id: ch.id,
      title: ch.snippet.title,
      subscriberCount: parseInt(ch.statistics.subscriberCount ?? "0"),
      videoCount: parseInt(ch.statistics.videoCount ?? "0"),
      viewCount: parseInt(ch.statistics.viewCount ?? "0"),
      uploadFrequencyDays: 0, // computed separately
    };
  }
}

import { z } from "zod";

export const PlatformSchema = z.enum([
  "youtube",
  "youtube-shorts",
  "x",
  "tiktok",
  "linkedin",
  "instagram",
  "telegram",
]);
export type Platform = z.infer<typeof PlatformSchema>;

export const ContentTypeSchema = z.enum([
  "video-script",
  "short-script",
  "thread",
  "carousel",
  "email",
  "newsletter",
  "caption",
]);
export type ContentType = z.infer<typeof ContentTypeSchema>;

export const ContentAssetSchema = z.object({
  id: z.string(),
  missionId: z.string().optional(),
  type: ContentTypeSchema,
  platform: PlatformSchema,
  title: z.string(),
  body: z.string(),
  metadata: z.record(z.unknown()).optional(),
  status: z.enum(["draft", "review", "approved", "published", "rejected"]),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
});
export type ContentAsset = z.infer<typeof ContentAssetSchema>;

export const ContentBriefSchema = z.object({
  id: z.string(),
  title: z.string(),
  hook: z.string(),
  angle: z.string(),
  platforms: z.array(PlatformSchema),
  publishWindow: z.string(),
  estimatedPerformance: z.string().optional(),
  brandDnaAligned: z.boolean().default(true),
  createdAt: z.date(),
});
export type ContentBrief = z.infer<typeof ContentBriefSchema>;

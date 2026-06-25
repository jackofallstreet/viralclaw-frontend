import { z } from "zod";

export const PlanSchema = z.enum(["starter", "pro", "team"]);
export type Plan = z.infer<typeof PlanSchema>;

export const BrandDNASchema = z.object({
  userId: z.string(),
  voice: z.string().describe("Creator voice / tone description"),
  niche: z.string(),
  targetAudience: z.string(),
  platforms: z.array(z.string()),
  contentPillars: z.array(z.string()),
  performancePatterns: z.record(z.unknown()).optional(),
  updatedAt: z.date(),
});
export type BrandDNA = z.infer<typeof BrandDNASchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  plan: PlanSchema,
  brandDna: BrandDNASchema.optional(),
  createdAt: z.date(),
  onboardedAt: z.date().optional(),
});
export type User = z.infer<typeof UserSchema>;

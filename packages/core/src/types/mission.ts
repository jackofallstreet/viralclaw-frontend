import { z } from "zod";

export const MissionStatusSchema = z.enum([
  "queued",
  "decomposing",
  "running",
  "awaiting-review",
  "complete",
  "failed",
  "cancelled",
]);
export type MissionStatus = z.infer<typeof MissionStatusSchema>;

export const MissionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  input: z.string(),
  status: MissionStatusSchema,
  taskIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
  summary: z.string().optional(),
});
export type Mission = z.infer<typeof MissionSchema>;

export const CreateMissionInputSchema = z.object({
  input: z.string().min(10).max(5000),
});
export type CreateMissionInput = z.infer<typeof CreateMissionInputSchema>;

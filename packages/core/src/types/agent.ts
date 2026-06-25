import { z } from "zod";

export const AgentIdSchema = z.enum([
  "orchestrator",
  "trend-intelligence",
  "strategy",
  "production",
  "distribution",
  "analytics",
  "revenue",
]);
export type AgentId = z.infer<typeof AgentIdSchema>;

export const AgentStatusSchema = z.enum(["idle", "active", "paused", "error"]);
export type AgentStatus = z.infer<typeof AgentStatusSchema>;

export const AgentTaskSchema = z.object({
  id: z.string(),
  agentId: AgentIdSchema,
  type: z.string(),
  status: z.enum(["pending", "running", "complete", "failed"]),
  input: z.record(z.unknown()),
  output: z.record(z.unknown()).optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  error: z.string().optional(),
  requiresHumanReview: z.boolean().default(false),
});
export type AgentTask = z.infer<typeof AgentTaskSchema>;

export const AgentSchema = z.object({
  id: AgentIdSchema,
  name: z.string(),
  status: AgentStatusSchema,
  currentTaskId: z.string().optional(),
  lastRunAt: z.date().optional(),
  tasksCompletedToday: z.number().default(0),
});
export type Agent = z.infer<typeof AgentSchema>;

import type { Mission, AgentTask } from "@viralclawos/core";

export interface OrchestratorResult {
  missionId: string;
  tasks: AgentTask[];
  summary: string;
}

/**
 * Orchestrator Agent
 *
 * Responsible for:
 * - Decomposing a user mission into ordered agent tasks
 * - Routing tasks to the appropriate specialist agents
 * - Managing human-in-the-loop review gates
 * - Handling errors and retries
 *
 * Powered by LangGraph (see services/orchestrator for the runtime implementation)
 */
export class OrchestratorAgent {
  constructor(private readonly config: { anthropicApiKey: string }) {}

  async decomposeMission(mission: Mission): Promise<OrchestratorResult> {
    // TODO: Implement LangGraph state machine
    // 1. Send mission to Claude to decompose into subtasks
    // 2. Build a DAG of tasks with dependencies
    // 3. Assign each task to the correct agent
    // 4. Return the task plan for execution
    throw new Error("Not implemented — see services/orchestrator");
  }

  async routeTask(task: AgentTask): Promise<string> {
    // Returns the agent ID that should handle this task
    throw new Error("Not implemented");
  }
}

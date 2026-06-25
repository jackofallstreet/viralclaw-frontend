export const AGENT_NAMES = {
  "trend-intelligence": "Trend & Intelligence Agent",
  strategy: "Strategy Agent",
  production: "Production Agent",
  distribution: "Distribution Agent",
  analytics: "Analytics Agent",
  revenue: "Revenue Agent",
  orchestrator: "Orchestrator",
} as const;

export const PLAN_LIMITS = {
  starter: {
    briefs: 5,
    assets: 10,
    platforms: 3,
    botAnalyses: 20,
    analyticsAgent: false,
    revenueAgent: false,
    brandDna: false,
  },
  pro: {
    briefs: Infinity,
    assets: Infinity,
    platforms: 8,
    botAnalyses: Infinity,
    analyticsAgent: true,
    revenueAgent: true,
    brandDna: true,
  },
  team: {
    briefs: Infinity,
    assets: Infinity,
    platforms: 8,
    botAnalyses: Infinity,
    analyticsAgent: true,
    revenueAgent: true,
    brandDna: true,
    profiles: 3,
  },
} as const;

export const PUBLISH_GATES = {
  // Actions that always require human approval
  requireApproval: [
    "publish-video",
    "publish-thread",
    "sponsorship-accept",
    "financial-action",
  ],
} as const;

export const DEFAULT_MEMORY_COLLECTION = "viralclawos";

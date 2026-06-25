export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

export interface LLMConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * LLM Client — wraps Anthropic Claude (primary)
 *
 * Models used:
 * - claude-sonnet-4-20250514 — primary (fast, capable, cost-effective for most agent tasks)
 * - claude-opus-4-20250514   — reserved for complex planning / strategy tasks
 *
 * All agent prompts are defined in packages/agents/src/<agent>/prompts.ts
 */
export class LLMClient {
  private readonly base = "https://api.anthropic.com/v1";
  private readonly defaultModel: string;

  constructor(
    private readonly apiKey: string,
    defaultModel = "claude-sonnet-4-20250514"
  ) {
    this.defaultModel = defaultModel;
  }

  async complete(messages: LLMMessage[], config: LLMConfig = {}): Promise<LLMResponse> {
    const body = {
      model: config.model ?? this.defaultModel,
      max_tokens: config.maxTokens ?? 4096,
      temperature: config.temperature ?? 0.7,
      system: config.systemPrompt,
      messages,
    };

    const res = await fetch(`${this.base}/messages`, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error ${res.status}: ${err}`);
    }

    const data = await res.json() as {
      content: Array<{ type: string; text?: string }>;
      model: string;
      usage: { input_tokens: number; output_tokens: number };
    };

    const text = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("");

    return {
      content: text,
      model: data.model,
      inputTokens: data.usage.input_tokens,
      outputTokens: data.usage.output_tokens,
    };
  }

  async completeJSON<T>(
    messages: LLMMessage[],
    config: LLMConfig = {}
  ): Promise<T> {
    const response = await this.complete(messages, {
      ...config,
      systemPrompt: [
        config.systemPrompt,
        "Always respond with valid JSON only. No markdown, no explanation, no preamble.",
      ]
        .filter(Boolean)
        .join("\n\n"),
    });

    try {
      return JSON.parse(response.content) as T;
    } catch {
      // Strip potential markdown code fences
      const cleaned = response.content
        .replace(/^```json\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
      return JSON.parse(cleaned) as T;
    }
  }
}

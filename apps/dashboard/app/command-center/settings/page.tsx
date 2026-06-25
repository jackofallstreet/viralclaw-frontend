"use client";

import { useState } from "react";

const integrations = [
  { name: "YouTube",      key: "youtube",   status: "not connected", note: "Required for Intelligence Agent" },
  { name: "X (Twitter)",  key: "x",         status: "not connected", note: "Distribution Agent" },
  { name: "LinkedIn",     key: "linkedin",  status: "not connected", note: "Distribution Agent" },
  { name: "TikTok",       key: "tiktok",    status: "not connected", note: "Distribution Agent" },
];

const gates = [
  { label: "Require approval before Production runs",    enabled: true,  note: "Agent will pause and wait" },
  { label: "Require approval before Distribution runs",  enabled: true,  note: "Agent will pause and wait" },
  { label: "Require approval for sponsorship actions",   enabled: true,  note: "All financial actions" },
];


export default function SettingsPage() {
  const [pillars, setPillars] = useState(["Add your content pillars"]);
  const [newPillar, setNewPillar] = useState("");

  return (
    <div className="max-w-[860px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Settings
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Configure Brand DNA, integrations, and review gates. These settings feed directly into agent behaviour.
        </p>
      </div>

      {/* Brand DNA */}
      <section className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Brand DNA
          </span>
          <span className="font-mono text-[0.44rem] text-[var(--dim)]">
            Loaded by agents before every task
          </span>
        </div>
        <div className="bg-[var(--carbon)] p-5 space-y-5">
          {[
            { label: "Creator niche",    placeholder: "e.g. Personal finance, SaaS, fitness" },
            { label: "Target audience",  placeholder: "e.g. Young professionals, 25–38" },
          ].map((field) => (
            <div key={field.label}>
              <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-2">
                {field.label}
              </label>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-[var(--black)] border border-[var(--border-md)] px-3 py-2 font-mono text-[0.68rem] text-[var(--white)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--crimson)] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-2">
              Creator voice
            </label>
            <textarea
              placeholder="Describe your tone, style, what to avoid. The more specific, the better the output."
              rows={3}
              className="w-full bg-[var(--black)] border border-[var(--border-md)] p-3 font-mono text-[0.68rem] text-[var(--white)] placeholder:text-[var(--dim)] resize-none outline-none focus:border-[var(--crimson)] transition-colors leading-[1.7]"
            />
          </div>

          <div>
            <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-2">
              Content pillars
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {pillars.map((p) => (
                <div key={p} className="flex items-center gap-1 font-mono text-[0.52rem] tracking-[0.06em] px-2 py-[4px] text-[var(--cyan-light)] border border-[var(--cyan-border)] bg-[var(--cyan-dim)]">
                  {p}
                  <button
                    type="button"
                    onClick={() => setPillars(prev => prev.filter(x => x !== p))}
                    className="text-[var(--dim)] hover:text-[var(--crimson)] ml-1 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPillar}
                onChange={e => setNewPillar(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && newPillar.trim()) {
                    setPillars(prev => [...prev, newPillar.trim()]);
                    setNewPillar("");
                  }
                }}
                placeholder="Add pillar — press Enter"
                className="flex-1 bg-[var(--black)] border border-[var(--border-md)] px-3 py-2 font-mono text-[0.65rem] text-[var(--white)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--crimson)] transition-colors"
              />
            </div>
          </div>

          <button
            type="button"
            className="font-mono text-[0.57rem] tracking-[0.12em] uppercase text-[var(--white)] bg-[var(--crimson)] px-4 py-2 hover:bg-[var(--crimson-hover)] transition-colors"
          >
            Save Brand DNA
          </button>
        </div>
      </section>

      {/* Integrations */}
      <section className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Platform integrations
          </span>
        </div>
        <div className="bg-[var(--carbon)] divide-y divide-[var(--border)]">
          {integrations.map((integration) => (
            <div key={integration.key} className="px-4 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[0.82rem] text-[var(--white)]">{integration.name}</div>
                <div className="font-mono text-[0.48rem] text-[var(--dim)] mt-[2px]">{integration.note}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-[0.48rem] tracking-[0.08em] uppercase text-[var(--dim)]">
                  {integration.status}
                </span>
                <button
                  type="button"
                  disabled
                  className="font-mono text-[0.52rem] tracking-[0.1em] uppercase px-3 py-[5px] border border-[var(--border)] text-[var(--dim)] cursor-not-allowed"
                >
                  Connect →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[var(--surface)] px-4 py-3 border-t border-[var(--border)]">
          <p className="font-mono text-[0.48rem] text-[var(--dim)]">
            OAuth flows for platform integrations come online with the Distribution Agent.
          </p>
        </div>
      </section>

      {/* Review gates */}
      <section className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Review gates
          </span>
        </div>
        <div className="bg-[var(--carbon)] p-4 space-y-1">
          <p className="font-mono text-[0.52rem] text-[var(--dim)] leading-[1.6] mb-4">
            Gates pause the agent pipeline and wait for your approval. Disabling one means the agent proceeds automatically. All are on by default and cannot be fully disabled for Distribution.
          </p>
          {gates.map((gate) => (
            <div key={gate.label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <div>
                <span className="font-mono text-[0.57rem] text-[var(--body)]">{gate.label}</span>
                <p className="font-mono text-[0.46rem] text-[var(--dim)] mt-[2px]">{gate.note}</p>
              </div>
              <span className="font-mono text-[0.46rem] tracking-[0.08em] uppercase px-2 py-[3px] border text-[var(--green)] border-[var(--green-border)] bg-[var(--green-dim)] shrink-0 ml-4">
                On
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

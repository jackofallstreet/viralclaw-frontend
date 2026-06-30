"use client";

import { useState } from "react";

const integrations = [
  { name: "Telegram",     key: "telegram",  status: "not connected", note: "Signal delivery — webhook alternative" },
  { name: "Webhook",      key: "webhook",   status: "not connected", note: "Alpha + content brief delivery" },
  { name: "X (Twitter)",  key: "x",         status: "not connected", note: "Social velocity tracking" },
  { name: "Farcaster",    key: "farcaster", status: "not connected", note: "Social velocity tracking" },
];

const gates = [
  { label: "Require review before Alpha brief is delivered",    enabled: true, note: "Brief pauses for your confirmation" },
  { label: "Require review before Content brief is delivered",  enabled: true, note: "Brief pauses for your confirmation" },
  { label: "Notify on new high-conviction signal (score ≥ 8)", enabled: true, note: "Immediate push via your delivery channel" },
];

export default function SettingsPage() {
  const [ecosystems, setEcosystems] = useState(["ETH", "SOL", "BASE"]);
  const [newEco, setNewEco] = useState("");

  return (
    <div className="max-w-[860px] mx-auto space-y-6">
      <div>
        <h1 className="font-cond text-[clamp(1.5rem,4vw,2.2rem)] font-bold uppercase leading-none text-[var(--white)] tracking-[0.02em]">
          Settings
        </h1>
        <p className="text-[0.78rem] text-[var(--low)] mt-2 font-light">
          Configure signal preferences, delivery integrations, and review gates. These settings shape what the intelligence layer surfaces for you.
        </p>
      </div>

      {/* Signal Preferences */}
      <section className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Signal preferences
          </span>
          <span className="font-mono text-[0.44rem] text-[var(--dim)]">
            Loaded by the intelligence layer before every run
          </span>
        </div>
        <div className="bg-[var(--carbon)] p-5 space-y-5">
          {[
            { label: "Output type",       placeholder: "e.g. Alpha only, Content only, or Both", note: "What kind of briefs you want generated" },
            { label: "Focus area",        placeholder: "e.g. DeFi, NFTs, L2s, memecoins",        note: "Filters signal scoring to your focus" },
          ].map((field) => (
            <div key={field.label}>
              <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-1">
                {field.label}
              </label>
              <p className="font-mono text-[0.44rem] text-[var(--dim)] mb-2">{field.note}</p>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-[var(--black)] border border-[var(--border-md)] px-3 py-2 font-mono text-[0.68rem] text-[var(--white)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--crimson)] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-1">
              Minimum conviction threshold
            </label>
            <p className="font-mono text-[0.44rem] text-[var(--dim)] mb-2">Signals below this score are filtered out before brief generation</p>
            <input
              type="text"
              placeholder="e.g. 7.0 (range: 1–10)"
              className="w-full bg-[var(--black)] border border-[var(--border-md)] px-3 py-2 font-mono text-[0.68rem] text-[var(--white)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--crimson)] transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-1">
              Ecosystem watchlist
            </label>
            <p className="font-mono text-[0.44rem] text-[var(--dim)] mb-2">Signal scanner prioritises these chains for cross-chain correlation</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {ecosystems.map((e) => (
                <div key={e} className="flex items-center gap-1 font-mono text-[0.52rem] tracking-[0.06em] px-2 py-[4px] text-[var(--cyan-light)] border border-[var(--cyan-border)] bg-[var(--cyan-dim)]">
                  {e}
                  <button
                    type="button"
                    onClick={() => setEcosystems(prev => prev.filter(x => x !== e))}
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
                value={newEco}
                onChange={e => setNewEco(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && newEco.trim()) {
                    setEcosystems(prev => [...prev, newEco.trim().toUpperCase()]);
                    setNewEco("");
                  }
                }}
                placeholder="Add chain — press Enter (e.g. ARB, SUI)"
                className="flex-1 bg-[var(--black)] border border-[var(--border-md)] px-3 py-2 font-mono text-[0.65rem] text-[var(--white)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--crimson)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)] block mb-1">
              Creator voice (for content briefs)
            </label>
            <p className="font-mono text-[0.44rem] text-[var(--dim)] mb-2">Shapes angle variants and framing in content briefs</p>
            <textarea
              placeholder="Describe your tone, audience, what to emphasise. The more specific, the better the content brief output."
              rows={3}
              className="w-full bg-[var(--black)] border border-[var(--border-md)] p-3 font-mono text-[0.68rem] text-[var(--white)] placeholder:text-[var(--dim)] resize-none outline-none focus:border-[var(--crimson)] transition-colors leading-[1.7]"
            />
          </div>

          <button
            type="button"
            className="font-mono text-[0.57rem] tracking-[0.12em] uppercase text-[var(--white)] bg-[var(--crimson)] px-4 py-2 hover:bg-[var(--crimson-hover)] transition-colors"
          >
            Save preferences
          </button>
        </div>
      </section>

      {/* Integrations */}
      <section className="border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)]">
          <span className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-[var(--low)]">
            Signal delivery integrations
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
            Delivery integrations come online with the Alpha Engine and Content Engine.
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
            Gates pause brief delivery and wait for your confirmation. All are on by default. Disabling one means briefs are delivered immediately without review.
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

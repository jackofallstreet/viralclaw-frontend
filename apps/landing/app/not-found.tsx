"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const frames = ["404", "4\u00d84", "\u259304", "40\u2593", "404", "\u258004", "4\u25804", "404"];

export default function NotFound() {
  const [glyph, setGlyph] = useState("404");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { setGlyph(frames[i % frames.length]); i++; }, 110);
    const stop = setTimeout(() => { clearInterval(id); setGlyph("404"); }, 2200);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(var(--border-3) 1px,transparent 1px),linear-gradient(90deg,var(--border-3) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,var(--accent-dim) 0%,transparent 70%)" }} />

      {/* Status */}
      <div className="font-mono text-[0.57rem] tracking-[0.22em] uppercase flex items-center gap-2 mb-8"
        style={{ color: "var(--accent)" }}>
        <span className="w-[5px] h-[5px] rounded-full animate-[blinkA_1.4s_ease_infinite]"
          style={{ background: "var(--accent)" }} />
        Signal lost
      </div>

      {/* Number */}
      <div
        className="font-cond font-extrabold uppercase leading-none select-none"
        style={{
          fontSize: "clamp(7rem,26vw,20rem)",
          letterSpacing: "-0.04em",
          color: "var(--text-1)",
          textShadow: "3px 0 0 var(--accent-dim),-3px 0 0 var(--teal-dim)",
        }}
      >
        {glyph}
      </div>

      <div className="font-cond font-semibold uppercase tracking-[0.1em] mt-1 mb-3"
        style={{ fontSize: "clamp(1rem,3vw,1.5rem)", color: "var(--text-3)" }}>
        Page not found
      </div>

      <p className="font-mono text-center leading-[1.85] mb-10"
        style={{ fontSize: "clamp(0.64rem,1.6vw,0.76rem)", color: "var(--text-4)", maxWidth: "44ch" }}>
        The agent swarm searched every node in the graph. This URL doesn&apos;t exist.
      </p>

      {/* Diagnostic */}
      <div className="w-full max-w-[480px] mb-8 overflow-hidden border"
        style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}>
        <div className="px-4 py-2 border-b" style={{ background: "var(--bg-3)", borderColor: "var(--border)" }}>
          <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase" style={{ color: "var(--text-3)" }}>
            Orchestrator — diagnostic log
          </span>
        </div>
        <div className="p-4 space-y-[5px]">
          {[
            { ts: "00:00:01", msg: "Route lookup initiated",             c: "var(--text-3)" },
            { ts: "00:00:02", msg: "Checking Qdrant vector index...",    c: "var(--text-3)" },
            { ts: "00:00:03", msg: "Querying Neo4j sitemap graph...",    c: "var(--text-3)" },
            { ts: "00:00:04", msg: "No match found in any memory layer", c: "var(--amber)" },
            { ts: "00:00:05", msg: "ERR_ROUTE_NOT_FOUND — returning 404",c: "var(--accent)" },
          ].map(l => (
            <div key={l.ts} className="flex gap-3 font-mono text-[0.58rem]">
              <span style={{ color: "var(--text-4)" }} className="shrink-0">{l.ts}</span>
              <span style={{ color: l.c }}>{l.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase no-underline px-6 py-3 transition-colors"
          style={{ background: "var(--accent)", color: "#fff" }}>
          ← Back to home
        </Link>
        <Link href="/docs" className="font-mono text-[0.62rem] tracking-[0.1em] uppercase no-underline px-6 py-3 border transition-colors"
          style={{ color: "var(--teal)", borderColor: "var(--teal-border)", background: "var(--teal-dim)" }}>
          Read the docs
        </Link>
        <Link href="/#access" className="font-mono text-[0.62rem] tracking-[0.1em] uppercase no-underline px-6 py-3 border transition-colors"
          style={{ color: "var(--text-3)", borderColor: "var(--border-2)" }}>
          Join waitlist
        </Link>
      </div>

      <div className="absolute bottom-6 font-mono text-[0.52rem] tracking-[0.1em] uppercase" style={{ color: "var(--text-4)" }}>
        ViralClaw · All agents online · Just not on this page
      </div>
    </div>
  );
}

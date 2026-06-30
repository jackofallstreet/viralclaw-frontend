"use client";

import { usePrivy } from "@privy-io/react-auth";

function WaitlistButton() {
  const { login, authenticated, user, logout, ready } = usePrivy();
  const email = user?.email?.address ?? (user as any)?.google?.email ?? null;

  if (!ready) return null;

  if (authenticated && email) {
    return (
      <div className="max-w-[420px] mx-auto">
        <div className="border border-[var(--green-border)] bg-[var(--green-dim)] px-6 py-5 mb-4">
          <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--green)] mb-2 flex items-center justify-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--green)] animate-[blinkA_1.8s_ease_infinite]" />
            You're on the list
          </div>
          <p className="font-mono text-[0.65rem] text-[var(--text-2)] leading-[1.6]">{email}</p>
          <p className="font-mono text-[0.57rem] text-[var(--text-3)] mt-2">
            We'll reach out when your spot opens. Alpha first.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="font-mono text-[0.54rem] tracking-[0.1em] uppercase text-[var(--text-4)] hover:text-[var(--text-3)] transition-colors"
        >
          Not you? Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[380px] mx-auto">
      <button
        type="button"
        onClick={login}
        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors px-8 py-[1rem] font-mono text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[var(--text-1)] flex items-center justify-center gap-3"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Get early access →
      </button>
      <p className="font-mono text-[0.54rem] tracking-[0.1em] text-[var(--text-4)] uppercase mt-4">
        No credit card · No spam · Invite only
      </p>
    </div>
  );
}

function WaitlistFallback() {
  return (
    <div className="max-w-[380px] mx-auto">
      <a
        href="mailto:hello@viralclaw.com?subject=Early Access"
        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors px-8 py-[1rem] font-mono text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[var(--text-1)] flex items-center justify-center gap-3 no-underline"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Get early access →
      </a>
      <p className="font-mono text-[0.54rem] tracking-[0.1em] text-[var(--text-4)] uppercase mt-4">
        No credit card · No spam · Invite only
      </p>
    </div>
  );
}

export default function CtaSection() {
  const hasPrivy = !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  return (
    <div
      className="bg-[var(--bg-2)] border-t border-[var(--border)] py-[clamp(5rem,12vw,8rem)] px-[clamp(1.25rem,5vw,2.5rem)] text-center relative overflow-hidden"
      id="access"
    >
      <div
        className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[460px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(193,18,31,0.05) 0%, transparent 70%)" }}
      />

      <div className="font-mono text-[0.58rem] tracking-[0.17em] uppercase text-[var(--accent)] mb-6 flex items-center justify-center gap-2">
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] inline-block animate-[blinkA_1.5s_ease_infinite]" />
        Early access — invite only
      </div>

      <h2 className="font-cond text-[clamp(3rem,10vw,8rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-[var(--text-1)] mb-5">
        See it<br />
        <span className="text-[var(--accent)]">FIRST.</span>
      </h2>

      <p className="text-[clamp(0.88rem,2vw,0.96rem)] text-[var(--text-2)] max-w-[44ch] mx-auto mb-8 leading-[1.8] font-light">
        We're opening early access to a small cohort of degens and creators ready to operate
        on multi-signal intelligence. Join the waitlist — alpha and content edge before anyone else.
      </p>

      {hasPrivy ? <WaitlistButton /> : <WaitlistFallback />}
    </div>
  );
}

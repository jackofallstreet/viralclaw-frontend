import Link from "next/link";
import { VideoHeroBg } from "./video-hero-bg";

export default function Hero() {
  return (
    /*
      Layout on mobile:
        [video bg section]  ← full-width video behind text + CTAs only
          VIRAL CLAW headline
          body copy
          CTA buttons
        [cards section]     ← sits BELOW video section, on plain bg

      Layout on desktop (lg+):
        Two-column grid, video fills the whole hero behind both columns
    */
    <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,2.5rem)]">

      {/* ── Mobile layout: video only behind top text block ── */}
      <div className="lg:hidden">

        {/* Text + CTA — video behind this block only */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "75svh" }}
        >
          <VideoHeroBg opacity={0.45} />

          <div
            className="relative pt-[clamp(2rem,8vw,3.5rem)] pb-[clamp(2rem,6vw,3rem)]"
            style={{ zIndex: 3 }}
          >
            {/* Eyebrow */}
            <div
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--accent)] flex items-center gap-2 mb-5"
              style={{ animation: "fadeUp 0.6s 0.05s ease forwards", opacity: 0 }}
            >
              <span className="w-4 h-px bg-[var(--accent)] block" />
              Synchronization Intelligence Layer
            </div>

            {/* Headline */}
            <h1
              className="font-cond text-[clamp(4rem,18vw,7rem)] font-extrabold leading-[0.87] uppercase tracking-tight text-[var(--text-1)] mb-[clamp(0.8rem,4vw,1.4rem)]"
              style={{ animation: "fadeUp 0.65s 0.15s ease forwards", opacity: 0 }}
            >
              Viral
              <span className="text-[var(--accent)] block">Claw</span>
              <span className="block text-[0.37em] font-light tracking-[0.18em] text-[var(--text-3)] mt-[0.35em]">
                Alpha &amp; Content Edge
              </span>
            </h1>

            {/* Body */}
            <p
              className="text-[clamp(0.88rem,4vw,1rem)] text-[var(--text-2)] leading-[1.8] mb-[clamp(1.4rem,5vw,2rem)]"
              style={{ animation: "fadeUp 0.65s 0.28s ease forwards", opacity: 0 }}
            >
              One intelligence layer that captures viral trends across{" "}
              <strong className="text-[var(--text-1)] font-medium">on-chain data, social signals, and narrative cycles</strong>{" "}
              — and turns them into{" "}
              <strong className="text-[var(--text-1)] font-medium">participation alpha for degens</strong>{" "}
              and{" "}
              <strong className="text-[var(--text-1)] font-medium">content intelligence for creators</strong>.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3"
              style={{ animation: "fadeUp 0.65s 0.42s ease forwards", opacity: 0 }}
            >
              <Link
                href="#access"
                className="font-mono text-[0.68rem] font-medium tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-6 py-4 no-underline inline-flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-all duration-200 active:scale-[0.98]"
              >
                Get early access →
              </Link>
              <Link
                href="#how"
                className="font-mono text-[0.68rem] font-normal tracking-[0.1em] uppercase text-[var(--teal)] border border-[var(--teal-border)] bg-[var(--teal-dim)] px-6 py-4 no-underline inline-flex items-center justify-center gap-2 hover:border-[var(--cyan-light)] transition-all duration-200"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>

        {/* Cards — sit below video, on plain bg */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-[clamp(1.5rem,5vw,2.5rem)]"
          style={{ animation: "fadeUp 0.7s 0.55s ease forwards", opacity: 0 }}
        >
          <MobileAlphaPanel />
          <MobileContentPanel />
        </div>
      </div>

      {/* ── Desktop layout: full two-column hero with video behind everything ── */}
      <div
        className="hidden lg:block relative overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        <VideoHeroBg opacity={0.45} />

        <div
          className="relative pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(1rem,3vw,2rem)] grid grid-cols-2 items-start gap-16"
          style={{ zIndex: 3 }}
        >
          {/* Left */}
          <div>
            <div
              className="font-mono text-[clamp(0.57rem,1.4vw,0.63rem)] tracking-[0.2em] uppercase text-[var(--accent)] flex items-center gap-2 mb-5"
              style={{ animation: "fadeUp 0.6s 0.1s ease forwards", opacity: 0 }}
            >
              <span className="w-4 h-px bg-[var(--accent)] block" />
              Synchronization Intelligence Layer
            </div>

            <h1
              className="font-cond text-[clamp(3.2rem,9vw,7.5rem)] font-extrabold leading-[0.87] uppercase tracking-tight text-[var(--text-1)] mb-[clamp(1rem,3vw,1.8rem)]"
              style={{ animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0 }}
            >
              Viral
              <span className="text-[var(--accent)] block">Claw</span>
              <span className="block text-[0.37em] font-light tracking-[0.18em] text-[var(--text-3)] mt-[0.4em]">
                Alpha &amp; Content Edge
              </span>
            </h1>

            <p
              className="text-[clamp(0.88rem,2vw,0.98rem)] text-[var(--text-2)] leading-[1.8] max-w-[46ch] mb-[clamp(1.4rem,3.5vw,2rem)]"
              style={{ animation: "fadeUp 0.7s 0.35s ease forwards", opacity: 0 }}
            >
              One intelligence layer that captures viral trends across{" "}
              <strong className="text-[var(--text-1)] font-medium">on-chain data, social signals, and narrative cycles</strong>{" "}
              — and turns them into{" "}
              <strong className="text-[var(--text-1)] font-medium">participation alpha for degens</strong>{" "}
              and{" "}
              <strong className="text-[var(--text-1)] font-medium">content intelligence for creators</strong>.
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fadeUp 0.7s 0.5s ease forwards", opacity: 0 }}
            >
              <Link
                href="#access"
                className="font-mono text-[clamp(0.62rem,1.8vw,0.69rem)] font-medium tracking-[0.12em] uppercase text-[var(--text-1)] bg-[var(--accent)] px-[clamp(1.2rem,3vw,1.7rem)] py-[clamp(0.7rem,2vw,0.85rem)] no-underline inline-flex items-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-px transition-all duration-200"
              >
                Get early access →
              </Link>
              <Link
                href="#how"
                className="font-mono text-[clamp(0.62rem,1.8vw,0.69rem)] font-normal tracking-[0.1em] uppercase text-[var(--teal)] border border-[var(--teal-border)] bg-[var(--teal-dim)] px-[clamp(1rem,2.5vw,1.3rem)] py-[clamp(0.7rem,2vw,0.85rem)] no-underline inline-flex items-center gap-2 hover:border-[var(--cyan-light)] hover:bg-[rgba(8,145,178,0.14)] transition-all duration-200"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Right — panels */}
          <div
            className="grid grid-cols-1 xl:grid-cols-2 gap-4"
            style={{ animation: "fadeIn 0.9s 0.55s ease forwards", opacity: 0 }}
          >
            <DesktopAlphaPanel />
            <DesktopContentPanel />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Shared panel content, split so mobile can omit backdrop-filter ── */

function MobileAlphaPanel() {
  return (
    <div className="bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden">
      <PanelHeader label="Alpha Signal — ETH" badge="Live" badgeColor="accent" />
      <AlphaPanelBody />
    </div>
  );
}

function DesktopAlphaPanel() {
  return (
    <div
      className="bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <PanelHeader label="Alpha Signal — ETH" badge="Live" badgeColor="accent" />
      <AlphaPanelBody />
    </div>
  );
}

function MobileContentPanel() {
  return (
    <div className="bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden">
      <PanelHeader label="Content Intelligence" badge="Ready" badgeColor="teal" />
      <ContentPanelBody />
    </div>
  );
}

function DesktopContentPanel() {
  return (
    <div
      className="bg-[var(--bg-2)] border border-[var(--border)] overflow-hidden"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <PanelHeader label="Content Intelligence" badge="Ready" badgeColor="teal" />
      <ContentPanelBody />
    </div>
  );
}

function PanelHeader({
  label,
  badge,
  badgeColor,
}: {
  label: string;
  badge: string;
  badgeColor: "accent" | "teal";
}) {
  const isAccent = badgeColor === "accent";
  return (
    <div className="bg-[var(--bg-3)] px-3 py-2 flex items-center justify-between border-b border-[var(--border)]">
      <span className="font-mono text-[0.56rem] tracking-[0.12em] uppercase text-[var(--text-3)]">
        {label}
      </span>
      <span
        className={`font-mono text-[0.52rem] tracking-[0.08em] uppercase px-2 py-[2px] border flex items-center gap-1 ${
          isAccent
            ? "text-[var(--accent)] border-[var(--accent-border)] bg-[var(--accent-dim)]"
            : "text-[var(--teal)] border-[var(--teal-border)] bg-[var(--teal-dim)]"
        }`}
      >
        <span
          className={`w-1 h-1 rounded-full ${
            isAccent
              ? "bg-[var(--accent)] animate-[blinkA_1.5s_ease_infinite]"
              : "bg-[var(--cyan-light)] animate-[blinkA_2s_ease_infinite]"
          }`}
        />
        {badge}
      </span>
    </div>
  );
}

function AlphaPanelBody() {
  return (
    <div className="p-[1rem_1.1rem]">
      <div className="mb-4 pb-4 border-b border-[var(--border)]">
        <div className="font-mono text-[0.54rem] tracking-[0.12em] uppercase text-[var(--text-3)] mb-1">
          On-chain trend
        </div>
        <div className="text-[clamp(0.8rem,1.8vw,0.86rem)] text-[var(--text-1)] leading-[1.5]">
          <span className="text-[var(--teal)]">Whale cluster forming</span> around restaking
          narrative.{" "}
          <span className="text-[var(--green)]">4.2h ahead</span> of social peak — window still
          open.
        </div>
        <div className="flex gap-2 mt-2">
          <span className="font-mono text-[0.56rem] tracking-[0.07em] px-2 py-[3px] text-[var(--green)] border border-[var(--green-border)] bg-[var(--green-dim)]">
            ↑ Signal score: 9.1
          </span>
          <span className="font-mono text-[0.56rem] tracking-[0.07em] px-2 py-[3px] text-[var(--teal)] border border-[var(--teal-border)] bg-[var(--teal-dim)]">
            23 wallets
          </span>
        </div>
      </div>
      <div>
        <div className="font-mono text-[0.54rem] tracking-[0.12em] uppercase text-[var(--text-3)] mb-1">
          Alpha brief
        </div>
        <div className="text-[clamp(0.8rem,1.8vw,0.86rem)] text-[var(--text-1)] leading-[1.5]">
          Cross-chain rotation detected: ETH → Base.{" "}
          <span className="text-[var(--accent)]">Participation window: 6–18h</span>. Brief ready.
        </div>
      </div>
    </div>
  );
}

function ContentPanelBody() {
  return (
    <div className="p-[1rem_1.1rem]">
      <div className="mb-3 pb-3 border-b border-[var(--border)]">
        <div className="font-mono text-[0.54rem] tracking-[0.12em] uppercase text-[var(--text-3)] mb-1">
          Narrative window
        </div>
        <div className="text-[clamp(0.8rem,1.8vw,0.86rem)] text-[var(--text-1)] leading-[1.5]">
          <span className="text-[var(--teal)]">Restaking narrative</span> trending across Crypto
          Twitter.{" "}
          <span className="text-[var(--green)]">12× engagement</span> vs average posts in the last
          48h.
        </div>
      </div>
      <div className="font-mono text-[0.6rem] tracking-[0.04em]">
        {[
          { label: "Trend origin",    val: "On-chain first",   color: "var(--accent)" },
          { label: "Social velocity", val: "+340% / 48h",      color: "var(--green)" },
          { label: "Content window",  val: "Next 18–36h",      color: "var(--cyan-light)" },
          { label: "Ecosystem",       val: "ETH / Base / ARB", color: "var(--text-2)" },
          { label: "Brief generated", val: "Just now",         color: "var(--text-3)" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-[6px] border-b border-[var(--border)] last:border-0"
          >
            <span className="text-[var(--text-3)]">{row.label}</span>
            <span className="font-medium" style={{ color: row.color }}>
              {row.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

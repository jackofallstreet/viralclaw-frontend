const items = [
  { label: "Trend agent — monitoring YouTube signals", color: "crimson" as const },
  { label: "Audience intelligence — creator memory updated", color: "cyan" as const },
  { label: "Script agent — 3 briefs queued for review", color: "none" as const },
  { label: "Analytics agent — processing performance cycle", color: "cyan" as const },
  { label: "Distribution — 5 platforms scheduled", color: "none" as const },
  { label: "YouTube format intelligence — 12K channels indexed", color: "crimson" as const },
  { label: "Memory system — brand model updated", color: "cyan" as const },
  { label: "Optimization cycle — complete", color: "none" as const },
];

const dotColors = {
  crimson: "bg-[var(--accent)] animate-[blinkA_1.4s_ease_infinite]",
  cyan: "bg-[var(--cyan-light)] animate-[blinkA_2s_ease_infinite]",
  green: "bg-[var(--green)] animate-[blinkA_1.8s_ease_infinite]",
  none: "",
};

const textColors = {
  crimson: "text-[var(--accent)]",
  cyan: "text-[var(--teal)]",
  green: "text-[var(--green)]",
  none: "text-[var(--text-3)]",
};

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="mt-[54px] bg-[var(--bg-3)] border-b border-[var(--border)] overflow-hidden h-[33px] relative">
      <div className="absolute top-0 bottom-0 left-0 w-12 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-12 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent" />
      <div
        className="flex h-full items-center w-max"
        style={{ animation: "tickerScroll 40s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-mono text-[0.56rem] tracking-[0.1em] uppercase px-[1.8rem] whitespace-nowrap border-r border-[var(--border)] flex items-center gap-[7px] ${textColors[item.color]}`}
          >
            {item.color !== "none" && (
              <span className={`w-[5px] h-[5px] rounded-full ${dotColors[item.color]}`} />
            )}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

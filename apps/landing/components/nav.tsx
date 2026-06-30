"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] h-[56px] flex items-center justify-between px-[clamp(1.25rem,5vw,2.5rem)] border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 92%, transparent)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--border)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 no-underline"
        style={{ color: "var(--text-1)" }}
      >
        <Image
          src="/viralclaw_avi.png"
          alt="ViralClaw"
          width={26}
          height={26}
          className="object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <span className="font-cond text-[1rem] font-bold tracking-[0.12em] uppercase">
          ViralClaw
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <ul className="hidden md:flex items-center gap-1 list-none">
          {[
            { href: "#how",      label: "How it works" },
            { href: "#signals",  label: "Signals" },
            { href: "/docs",     label: "Docs" },
            { href: "#access",   label: "Early access" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-[0.6rem] tracking-[0.08em] uppercase no-underline px-3 py-2 rounded transition-colors"
                style={{ color: "var(--text-3)" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-px h-4 hidden md:block" style={{ background: "var(--border-2)" }} />

        <ThemeToggle />

        <Link
          href="#access"
          className="font-mono text-[0.6rem] font-medium tracking-[0.12em] uppercase no-underline px-4 py-2 transition-colors"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Get early access →
        </Link>
      </div>
    </nav>
  );
}

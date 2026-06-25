import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@viralclawos/utils";
import type { ReactNode } from "react";

// ─── Badge ───────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-mono tracking-[0.08em] uppercase border px-2 py-[2px]",
  {
    variants: {
      variant: {
        crimson: "text-[#C1121F] border-[rgba(193,18,31,0.26)] bg-[rgba(193,18,31,0.09)]",
        cyan:    "text-[#06B6D4] border-[rgba(8,145,178,0.2)] bg-[rgba(8,145,178,0.08)]",
        green:   "text-[#22C55E] border-[rgba(34,197,94,0.22)] bg-[rgba(34,197,94,0.1)]",
        amber:   "text-[#F59E0B] border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.1)]",
        ghost:   "text-[#71717A] border-[rgba(255,255,255,0.12)]",
      },
      size: {
        xs: "text-[0.5rem]",
        sm: "text-[0.56rem]",
        md: "text-[0.62rem]",
      },
    },
    defaultVariants: { variant: "ghost", size: "sm" },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}

// ─── Button ──────────────────────────────────────────────────

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono tracking-[0.12em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:  "bg-[#C1121F] text-[#F5F5F5] hover:bg-[#A80E1A]",
        outline:  "border border-[rgba(255,255,255,0.12)] text-[#F5F5F5] hover:bg-[#18181B]",
        ghost:    "text-[#71717A] hover:text-[#F5F5F5] hover:bg-[#18181B]",
        cyan:     "border border-[rgba(8,145,178,0.2)] bg-[rgba(8,145,178,0.08)] text-[#06B6D4] hover:bg-[rgba(8,145,178,0.14)] hover:border-[#06B6D4]",
      },
      size: {
        sm: "text-[0.57rem] px-3 py-[5px]",
        md: "text-[0.63rem] px-4 py-[8px]",
        lg: "text-[0.69rem] px-[1.4rem] py-[0.85rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

// ─── Card / Panel ────────────────────────────────────────────

export interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "crimson" | "cyan" | "green" | "none";
}

export function Card({ children, className, accent = "none" }: CardProps) {
  const accentClass = {
    crimson: "border-t-2 border-t-[#C1121F]",
    cyan: "border-t-2 border-t-[#06B6D4]",
    green: "border-t-2 border-t-[#22C55E]",
    none: "",
  }[accent];

  return (
    <div
      className={cn(
        "bg-[#0B0B0D] border border-[rgba(255,255,255,0.07)] overflow-hidden",
        accentClass,
        className
      )}
    >
      {children}
    </div>
  );
}

export interface PanelHeaderProps {
  label: string;
  right?: ReactNode;
}

export function PanelHeader({ label, right }: PanelHeaderProps) {
  return (
    <div className="bg-[#121214] px-4 py-[9px] flex items-center justify-between border-b border-[rgba(255,255,255,0.07)]">
      <span className="font-mono text-[0.56rem] tracking-[0.12em] uppercase text-[#71717A]">
        {label}
      </span>
      {right}
    </div>
  );
}

// Re-export Panel as an alias for Card
export const Panel = Card;

// ─── StatusDot ───────────────────────────────────────────────

const dotColor = {
  crimson: "bg-[#C1121F]",
  cyan:    "bg-[#06B6D4]",
  green:   "bg-[#22C55E]",
  amber:   "bg-[#F59E0B]",
  muted:   "bg-[#71717A]",
};

export interface StatusDotProps {
  color?: keyof typeof dotColor;
  pulse?: boolean;
  size?: "sm" | "md";
}

export function StatusDot({ color = "green", pulse = true, size = "sm" }: StatusDotProps) {
  const sz = size === "sm" ? "w-[5px] h-[5px]" : "w-[7px] h-[7px]";
  return (
    <span
      className={cn(
        "rounded-full inline-block shrink-0",
        sz,
        dotColor[color],
        pulse && "animate-[blinkA_1.8s_ease_infinite]"
      )}
    />
  );
}

// ─── Tag ─────────────────────────────────────────────────────

export interface TagProps {
  children: ReactNode;
  color?: "crimson" | "cyan" | "green" | "amber" | "ghost";
  className?: string;
}

export function Tag({ children, color = "ghost", className }: TagProps) {
  return <Badge variant={color} size="xs" className={className}>{children}</Badge>;
}

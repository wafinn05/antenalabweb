import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/* ------------------------------------------------------------------ */
/* Index mark — "01 —— Tentang"                                        */
/* ------------------------------------------------------------------ */

export function IndexMark({
  index,
  label,
  tone = "light",
  className,
}: {
  index: string;
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("t-meta flex items-center gap-3", className)}>
      <span className={tone === "dark" ? "text-maroon-bright" : "text-maroon"}>{index}</span>
      <span
        aria-hidden
        className={cn("h-px w-6", tone === "dark" ? "bg-white/25" : "bg-graphite-300")}
      />
      <span className={tone === "dark" ? "text-graphite-400" : "text-graphite-500"}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

export function SectionHeader({
  index,
  label,
  title,
  lead,
  action,
  tone = "light",
  align = "split",
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  tone?: Tone;
  align?: "split" | "stack";
  className?: string;
}) {
  const split = align === "split";
  return (
    <div className={className}>
      <IndexMark index={index} label={label} tone={tone} />
      <div className={cn("mt-7 gap-x-16", split && "lg:grid lg:grid-cols-12")}>
        <h2 className={cn("t-h2 max-w-[19ch]", split && "lg:col-span-6")}>{title}</h2>
        {(lead || action) && (
          <div
            className={cn(
              "mt-6 lg:mt-1.5",
              split ? "lg:col-span-5 lg:col-start-8" : "max-w-[58ch]",
            )}
          >
            {lead && <p className={cn("t-lead", tone === "dark" && "text-graphite-400")}>{lead}</p>}
            {action && <div className="mt-7">{action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

const ARROW = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
  >
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center gap-2.5 text-sm font-medium transition-colors duration-300",
    tone === "dark" ? "text-white hover:text-maroon-bright" : "text-ink hover:text-maroon",
    className,
  );

  const inner = (
    <>
      <span className="link-sweep">{children}</span>
      {ARROW}
    </>
  );

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "light" | "outline" | "outlineDark";
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300",
    variant === "solid" && "bg-maroon text-white hover:bg-maroon-bright",
    variant === "light" && "bg-white text-ink hover:bg-paper-200",
    variant === "outline" && "border border-ink text-ink hover:bg-ink hover:text-white",
    variant === "outlineDark" &&
      "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
    className,
  );

  const inner = (
    <>
      {children}
      {ARROW}
    </>
  );

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Stat band — tabular figures on a hairline grid                      */
/* ------------------------------------------------------------------ */

export type StatItem = { value: string; unit?: string; label: string; note?: string };

export function StatBand({
  items,
  tone = "light",
  className,
}: {
  items: StatItem[];
  tone?: Tone;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "rule-grid grid-cols-2 lg:grid-cols-4",
        tone === "dark" && "rule-grid-dark",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="px-5 py-8 sm:px-7 sm:py-9">
          <dd className="t-num flex items-baseline gap-0.5 text-[clamp(2rem,3.2vw,2.8rem)] leading-none font-medium">
            <span>{item.value}</span>
            {item.unit && (
              <span
                className={cn(
                  "text-[0.42em]",
                  tone === "dark" ? "text-maroon-bright" : "text-maroon",
                )}
              >
                {item.unit}
              </span>
            )}
          </dd>
          <dt
            className={cn(
              "mt-4 text-[0.8125rem] leading-snug font-medium",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            {item.label}
          </dt>
          {item.note && (
            <p
              className={cn(
                "t-meta mt-1.5",
                tone === "dark" ? "text-graphite-500" : "text-graphite-400",
              )}
            >
              {item.note}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Spec table — key/value pairs on hairlines                           */
/* ------------------------------------------------------------------ */

export function SpecTable({
  rows,
  tone = "light",
  className,
}: {
  rows: { key: string; value: string }[];
  tone?: Tone;
  className?: string;
}) {
  return (
    <dl className={cn("text-sm", className)}>
      {rows.map((row) => (
        <div
          key={row.key}
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-6 py-3.5",
            tone === "dark" ? "rule-b-d" : "rule-b",
          )}
        >
          <dt className={tone === "dark" ? "text-graphite-400" : "text-graphite-500"}>{row.key}</dt>
          <dd
            className={cn(
              "t-num text-[0.8125rem]",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Tag / pill                                                          */
/* ------------------------------------------------------------------ */

export function Tag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-meta inline-flex items-center border px-2.5 py-1",
        tone === "dark"
          ? "border-white/20 text-graphite-400"
          : "border-graphite-300 text-graphite-500",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hairline divider with an optional inline label                      */
/* ------------------------------------------------------------------ */

export function RuledHeading({
  label,
  tone = "light",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <span className={cn("t-meta", tone === "dark" ? "text-graphite-400" : "text-graphite-500")}>
        {label}
      </span>
      <span
        aria-hidden
        className={cn("h-px flex-1", tone === "dark" ? "bg-white/14" : "bg-rule")}
      />
    </div>
  );
}

export type { Tone };

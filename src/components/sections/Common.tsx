import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink, IndexMark } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Page hero — dark band used by every inner page                      */
/* ------------------------------------------------------------------ */

export function PageHero({
  index,
  label,
  title,
  lead,
  aside,
  figure,
}: {
  index: string;
  label: string;
  title: string;
  lead: string;
  aside?: ReactNode;
  figure?: ReactNode;
}) {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-ink text-white">
      <div className="shell relative">
        <nav aria-label="Remah roti" className="t-meta rule-b-d flex items-center gap-2.5 py-4">
          <Link href="/" className="text-graphite-500 transition-colors hover:text-white">
            Beranda
          </Link>
          <span aria-hidden className="text-graphite-600">
            /
          </span>
          <span className="text-graphite-400">{label}</span>
        </nav>

        <div className="grid gap-x-16 gap-y-10 pt-14 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <IndexMark index={index} label={label} tone="dark" />
              <h1 className="t-h1 mt-7 max-w-[16ch]">{title}</h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={90}>
              <p className="t-lead text-graphite-400">{lead}</p>
              {aside && <div className="mt-8">{aside}</div>}
            </Reveal>
          </div>
        </div>

        {figure && <div className="rule-t-d py-10">{figure}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing call to action                                              */
/* ------------------------------------------------------------------ */

export function CtaBand({
  eyebrow = "Terbuka",
  title = "Laboratorium ini terbuka bagi siapa saja yang ingin belajar.",
  body = "Rasa ingin tahu dan kemauan belajar yang besar adalah syarat utamanya. Sampaikan minat Anda pada antena, propagasi, atau transmisi radio.",
  primary = { href: "/kontak", label: "Sampaikan minat" },
  secondary = { href: "/riset", label: "Lihat arah riset" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section data-tone="dark" className="bg-maroon-deep text-white">
      <div className="shell section-y">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-meta text-white/55">{eyebrow}</p>
            <h2 className="t-h2 mt-6 max-w-[17ch]">{title}</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-white/75">{body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="light">
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="outlineDark">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered row list — the workhorse layout of this site               */
/* ------------------------------------------------------------------ */

export function RowList({
  items,
  tone = "light",
  className,
}: {
  items: {
    id: string;
    index: string;
    title: string;
    lead: string;
    meta?: string;
    href?: string;
  }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal as="ul" stagger className={cn(tone === "dark" ? "rule-t-d" : "rule-t", className)}>
      {items.map((item) => {
        const inner = (
          <div
            className={cn(
              "grid gap-x-10 gap-y-3 py-8 transition-colors duration-400 lg:grid-cols-12 lg:py-10",
              item.href && (tone === "dark" ? "group-hover:bg-white/4" : "group-hover:bg-paper-50"),
            )}
          >
            <div className="lg:col-span-1">
              <span
                className={cn("t-meta", tone === "dark" ? "text-maroon-bright" : "text-maroon")}
              >
                {item.index}
              </span>
            </div>
            <div className="lg:col-span-4">
              <h3
                className={cn(
                  "t-h3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  item.href && "group-hover:translate-x-1.5",
                )}
              >
                {item.title}
              </h3>
              {item.meta && (
                <p
                  className={cn(
                    "t-meta mt-3",
                    tone === "dark" ? "text-graphite-500" : "text-graphite-400",
                  )}
                >
                  {item.meta}
                </p>
              )}
            </div>
            <div className="lg:col-span-6">
              <p
                className={cn(
                  "text-[0.9375rem] leading-relaxed",
                  tone === "dark" ? "text-graphite-400" : "text-graphite-600",
                )}
              >
                {item.lead}
              </p>
            </div>
            {item.href && (
              <div className="flex items-start justify-end lg:col-span-1">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
                    tone === "dark" ? "text-graphite-500" : "text-graphite-400",
                  )}
                >
                  <path
                    d="M2 8h11M9 3.5 13.5 8 9 12.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
            )}
          </div>
        );

        return (
          <li key={item.id} className={cn(tone === "dark" ? "rule-b-d" : "rule-b")}>
            {item.href ? (
              <Link href={item.href} className="group block">
                {inner}
              </Link>
            ) : (
              <div className="group">{inner}</div>
            )}
          </li>
        );
      })}
    </Reveal>
  );
}

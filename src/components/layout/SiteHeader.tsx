"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Tutup panel saat rute berpindah. Disesuaikan ketika render, bukan
  // lewat effect, agar tidak memicu render berantai.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-maroon focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Lompat ke konten utama
      </a>

      <header
        data-tone="dark"
        className={cn(
          "sticky top-0 z-50 bg-ink transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.14)]",
        )}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Navigasi utama" className="hidden xl:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative block px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                      isActive(item.href) ? "text-white" : "text-graphite-400 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 -bottom-px h-px origin-left bg-maroon-bright transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/kontak"
              className="hidden bg-maroon px-5 py-2.5 text-[0.75rem] font-medium tracking-wide text-white transition-colors duration-300 hover:bg-maroon-bright sm:inline-block"
            >
              Ajukan Pengujian
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-utama"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-white xl:hidden"
            >
              <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1/2 -rotate-45" : "top-full",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet panel */}
      <div
        id="menu-utama"
        data-tone="dark"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-ink xl:hidden"
      >
        <nav aria-label="Navigasi seluler" className="shell py-6">
          <ul>
            {primaryNav.map((item, i) => (
              <li key={item.href} className="rule-b-d">
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-5 py-5 text-white"
                >
                  <span className="t-meta w-6 shrink-0 text-maroon-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="t-h3 block">{item.label}</span>
                    <span className="mt-1.5 block text-[0.8125rem] leading-snug text-graphite-500">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3">
            <Link
              href="/kontak"
              className="flex items-center justify-between bg-maroon px-6 py-4 text-sm font-medium text-white"
            >
              Ajukan Pengujian
              <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5">
                <path
                  d="M2 8h11M9 3.5 13.5 8 9 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </Link>
            <div className="rule-t-d pt-6 text-[0.8125rem] text-graphite-400">
              <p>{site.address.building}</p>
              <p className="mt-1">
                {site.address.street}, {site.address.city}
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-4 block text-white underline underline-offset-4"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

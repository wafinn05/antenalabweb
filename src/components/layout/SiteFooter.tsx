import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { primaryNav, site } from "@/content/site";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-ink text-white">
      <div className="shell">
        {/* Masthead */}
        <div className="rule-b-d grid gap-10 py-14 lg:grid-cols-12 lg:items-end lg:py-16">
          <div className="lg:col-span-7">
            <LogoMark alt="Lambang Laboratorium Antena Telkom University" className="h-10" />
            <p lang="en" className="t-h2 mt-7 max-w-[14ch]">
              No risk, no gain
              <span className="text-maroon-bright">!</span>
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-graphite-400">
              Rasa ingin tahu dan kemauan belajar yang besar adalah syarat utamanya. Sampaikan minat
              Anda pada antena, propagasi, dan transmisi radio.
            </p>
            <Link
              href="/kontak"
              className="group mt-7 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-sm font-medium transition-colors duration-300 hover:border-maroon-bright hover:text-maroon-bright"
            >
              Hubungi laboratorium
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                <path
                  d="M2 8h11M9 3.5 13.5 8 9 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="t-meta text-graphite-500">Alamat</h2>
            <address className="mt-5 text-[0.9375rem] leading-relaxed text-graphite-400 not-italic">
              {site.faculty}, {site.parent}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}
              <br />
              {site.address.country}
            </address>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-block text-[0.8125rem] text-white underline underline-offset-4 transition-colors hover:text-maroon-bright"
            >
              Lihat di peta
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-meta text-graphite-500">Navigasi</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-graphite-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="t-meta text-graphite-500">Laman terkait</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              <li>
                <a
                  href={site.faculty_site.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-graphite-400 transition-colors hover:text-white"
                >
                  {site.faculty}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="rule-t-d flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta text-graphite-600">
            © {year} {site.name} · {site.parent}
          </p>
          <p className="t-meta text-graphite-600">Bandung, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}

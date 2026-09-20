import Link from "next/link";
import { ButtonLink, IndexMark } from "@/components/ui/Primitives";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <section data-tone="dark" className="bg-ink text-white">
      <div className="shell section-y">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <IndexMark index="404" label="Halaman tidak ditemukan" tone="dark" />
            <h1 className="t-h1 mt-8 max-w-[14ch]">Sinyal yang Anda cari tidak terdeteksi</h1>
            <p className="t-lead mt-8 max-w-[44ch] text-graphite-400">
              Alamat yang dibuka mungkin sudah berubah atau tidak pernah ada. Gunakan tautan di
              samping untuk melanjutkan.
            </p>
            <div className="mt-10">
              <ButtonLink href="/" variant="outlineDark">
                Kembali ke beranda
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Navigasi cadangan" className="lg:col-span-5 lg:col-start-8">
            <p className="t-meta text-graphite-500">Halaman utama</p>
            <ul className="rule-t-d mt-6">
              {primaryNav.map((item, i) => (
                <li key={item.href} className="rule-b-d">
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-5 py-4 transition-colors duration-300 hover:text-maroon-bright"
                  >
                    <span className="t-meta w-6 shrink-0 text-graphite-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="link-sweep text-[0.9375rem]">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

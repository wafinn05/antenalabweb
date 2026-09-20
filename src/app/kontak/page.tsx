import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Common";
import { ArrowLink, IndexMark, SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Alamat dan formulir permohonan Laboratorium Antena, Fakultas Teknik Elektro Telkom University.",
};

const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&z=16&output=embed`;

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export default function KontakPage() {
  return (
    <>
      <PageHero
        index="04"
        label="Kontak"
        title="Sampaikan minat atau kebutuhan Anda"
        lead="Laboratorium terbuka bagi mahasiswa yang ingin meneliti, maupun pihak luar yang membutuhkan rancang bangun antena dan pelatihan."
      />

      {/* Keterangan */}
      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <IndexMark index="01" label="Keterangan" />

              <dl className="mt-10 space-y-9">
                <div>
                  <dt className="t-meta text-graphite-400">Alamat kampus</dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-graphite-600">
                    {site.faculty}
                    <br />
                    {site.parent}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region}
                  </dd>
                </div>

                <div>
                  <dt className="t-meta text-graphite-400">Laman fakultas</dt>
                  <dd className="mt-3">
                    <ArrowLink href={site.faculty_site.href}>{site.faculty_site.label}</ArrowLink>
                  </dd>
                </div>
              </dl>

              <div className="rule-t mt-10 pt-6">
                <p className="text-[0.875rem] leading-relaxed text-graphite-500">
                  Surel, nomor telepon, dan nomor ruang laboratorium belum dicantumkan karena belum
                  tersedia pada sumber resmi. Sementara itu, gunakan formulir di samping.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <IndexMark index="02" label="Formulir" />
              <h2 className="t-h2 mt-7 max-w-[16ch]">Kirim permohonan</h2>
              <p className="t-lead mt-6 max-w-[48ch]">
                Kolom bertanda bintang wajib diisi. Sebutkan latar belakang Anda dan topik yang
                ingin dikerjakan agar mudah diarahkan.
              </p>
              <div className="mt-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Peta */}
      <section className="bg-paper-50">
        <div className="shell section-y">
          <Reveal>
            <SectionHeader
              index="03"
              label="Lokasi"
              title="Kampus Telkom University, Bandung"
              lead="Fakultas Teknik Elektro berada di kawasan kampus Telkom University, Terusan Buah Batu."
            />
          </Reveal>

          <Reveal className="mt-14">
            <div className="rule-t rule-b aspect-[16/9] w-full overflow-hidden bg-paper-200 sm:aspect-[21/9]">
              <iframe
                title="Peta lokasi Telkom University"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.9] contrast-[1.05]"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="t-meta text-graphite-400">
                Gambar 01 — Peta lokasi kampus. Sumber: Google Maps
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer noopener"
                className="t-meta text-ink underline underline-offset-4 transition-colors hover:text-maroon"
              >
                Buka di Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

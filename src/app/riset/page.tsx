import type { Metadata } from "next";
import { PolarPattern, ReturnLossPlot } from "@/components/figures/TechnicalFigures";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { ArrowLink, IndexMark, SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { researchAreas, researchTracks } from "@/content/research";

export const metadata: Metadata = {
  title: "Riset",
  description:
    "Sepuluh arah pengembangan penelitian Laboratorium Antena, dari elektromagnetika telekomunikasi sampai perangkat ukur RF dan gelombang mikro.",
};

export default function RisetPage() {
  return (
    <>
      <PageHero
        index="02"
        label="Riset"
        title="Arah pengembangan penelitian"
        lead="Dalam ruang lingkup aktivitasnya, laboratorium memiliki arahan dan patokan pengembangan yang dirintis pada sepuluh bidang penelitian berikut."
      />

      {/* Jalur penelitian */}
      <section className="shell section-y">
        <Reveal>
          <SectionHeader
            index="01"
            label="Jalur"
            title="Tiga cara penelitian dikerjakan"
            lead="Penelitian berjalan perorangan maupun berkelompok, dan hasilnya dievaluasi kembali secara berkala."
          />
        </Reveal>

        <Reveal stagger className="rule-grid mt-14 grid-cols-1 md:grid-cols-3">
          {researchTracks.map((track, i) => (
              <div key={track.title} className="px-6 py-9 sm:px-8 sm:py-10">
                <span className="t-meta text-maroon">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-6">{track.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite-600">
                  {track.detail}
                </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Sepuluh arah */}
      <section data-tone="dark" className="bg-ink text-white">
        <div className="shell section-y">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <IndexMark index="02" label="Arah pengembangan" tone="dark" />
                <h2 className="t-h2 mt-7 max-w-[14ch]">Sepuluh bidang yang dirintis</h2>
              </Reveal>
            </div>
            <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
              <Reveal delay={120}>
                <PolarPattern elements={8} tone="dark" />
                <p className="t-meta mt-5 text-graphite-500">
                  Gambar 01 — Array faktor 8 elemen, jarak antarelemen 0,5 λ
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal as="ol" stagger className="rule-t-d mt-16 lg:mt-20">
            {researchAreas.map((area) => (
                <li
                  key={area.id}
                  id={area.id}
                  className="rule-b-d grid scroll-mt-28 gap-x-12 gap-y-3 py-8 lg:grid-cols-12 lg:py-9"
                >
                  <span className="t-meta text-maroon-bright lg:col-span-1">{area.index}</span>
                  <h3 className="t-h3 lg:col-span-4">{area.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-graphite-400 lg:col-span-7">
                    {area.body}
                  </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Ilustrasi */}
      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <IndexMark index="03" label="Ilustrasi" />
              <h2 className="t-h2 mt-7 max-w-[13ch]">Besaran yang dikerjakan</h2>
              <p className="t-lead mt-6">
                Dua grafik di samping adalah gambaran umum besaran yang ditangani dalam perancangan
                antena — pola radiasi dan rugi-rugi balik. Keduanya dihitung dari rumus, bukan data
                pengukuran laboratorium.
              </p>
              <div className="mt-9">
                <ArrowLink href="/kegiatan">Kegiatan laboratorium</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <div className="rule-t rule-b bg-paper-50 px-5 py-8 sm:px-8">
                <ReturnLossPlot tone="light" />
              </div>
              <p className="t-meta mt-4 text-graphite-400">
                Gambar 02 — Kurva return loss dua resonansi terhadap ambang −10 dB
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Penelitian"
        title="Ingin mengerjakan topik antena bersama laboratorium?"
        body="Penelitian dapat ditempuh melalui Tugas Akhir, Proyek Akhir, atau bergabung dengan research group yang berjalan."
        primary={{ href: "/kontak", label: "Sampaikan topik" }}
        secondary={{ href: "/kegiatan", label: "Lihat research group" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { ArrowLink, IndexMark, SectionHeader, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { activities, pastEvents } from "@/content/activities";

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Research Group Smart Antenna, Workshop Antena, serta pelatihan dan seminar yang diselenggarakan Laboratorium Antena.",
};

export default function KegiatanPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Kegiatan"
        title="Yang berjalan di laboratorium"
        lead="Di luar penelitian perorangan, tiga kegiatan berikut dijalankan secara berkelanjutan dan terbuka bagi mahasiswa maupun pihak luar."
      />

      {/* Tiga kegiatan */}
      <section className="shell section-y">
        <div className="space-y-20 lg:space-y-24">
          {activities.map((item) => (
            <Reveal key={item.id}>
              <article
                id={item.id}
                className="rule-t grid scroll-mt-28 gap-x-16 gap-y-8 pt-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <IndexMark index={item.index} label="Kegiatan" />
                  <h2 className="t-h2 mt-7 max-w-[14ch]">{item.title}</h2>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="t-lead">{item.lead}</p>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite-600">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Acara yang pernah diadakan */}
      <section data-tone="dark" className="bg-ink text-white">
        <div className="shell section-y">
          <Reveal>
            <SectionHeader
              index="04"
              label="Rekam jejak"
              tone="dark"
              title="Acara yang pernah diselenggarakan"
              lead="Daftar berikut dikutip dari profil laboratorium. Sumbernya tidak mencantumkan tanggal penyelenggaraan tiap acara."
            />
          </Reveal>

          <Reveal as="ol" stagger className="rule-t-d mt-16">
            {pastEvents.map((event, i) => (
                <li
                  key={event}
                  className="rule-b-d flex items-baseline gap-6 py-5 sm:gap-10"
                >
                  <span className="t-meta shrink-0 text-maroon-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] leading-snug">{event}</span>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <Tag tone="dark">Daftar belum mencakup kegiatan terbaru</Tag>
          </Reveal>
        </div>
      </section>

      {/* Keterlibatan */}
      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <IndexMark index="05" label="Keterlibatan" />
              <h2 className="t-h2 mt-7 max-w-[14ch]">Cara ikut serta</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <div className="prose-lab">
                <ul>
                  <li>
                    Mengambil topik Tugas Akhir atau Proyek Akhir di bidang antena, propagasi, atau
                    transmisi radio dengan pendampingan dosen.
                  </li>
                  <li>
                    Bergabung dengan Research Group Smart Antenna, yang dijalankan berkelanjutan
                    antarangkatan.
                  </li>
                  <li>
                    Terlibat pada Workshop Antena untuk pekerjaan rancang bangun antena bagi
                    kebutuhan nyata.
                  </li>
                  <li>
                    Mengikuti pelatihan, seminar, dan kursus yang diselenggarakan laboratorium
                    secara berkala.
                  </li>
                </ul>
              </div>
              <div className="mt-9">
                <ArrowLink href="/kontak">Hubungi laboratorium</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

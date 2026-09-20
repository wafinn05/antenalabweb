import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { ArrowLink, IndexMark, SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { intro, objectives, siblingCaption, siblingLabs } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Deskripsi, tujuan, dan kedudukan Laboratorium Antena di bawah Fakultas Teknik Elektro Telkom University.",
};

export default function TentangPage() {
  return (
    <>
      <PageHero
        index="01"
        label="Tentang"
        title="Laboratorium Antena"
        lead="Arah pengembangan utamanya adalah pembinaan, pengembangan, serta peningkatan budaya ilmiah penelitian di bidang sistem antena."
      />

      {/* Deskripsi */}
      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <IndexMark index="01" label="Deskripsi" />
              <p
                lang="en"
                className="t-h3 mt-9 border-l-2 border-maroon pl-5"
              >
                {site.motto}
              </p>
              <p className="t-meta mt-4 pl-5 text-graphite-400">Moto laboratorium</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <div className="prose-lab">
                {intro.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "text-[1.0625rem] leading-relaxed" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kedudukan */}
      <section data-tone="dark" className="bg-ink text-white">
        <div className="shell section-y">
          <Reveal>
            <SectionHeader
              index="02"
              label="Kedudukan"
              tone="dark"
              title="Bagian dari rumpun laboratorium transmisi"
              lead={siblingCaption}
            />
          </Reveal>

          <Reveal stagger className="rule-grid rule-grid-dark mt-16 grid-cols-1 sm:grid-cols-3">
            {siblingLabs.map((lab, i) => (
                <div key={lab} className="px-6 py-9 sm:px-7 sm:py-10">
                  <span className="t-meta text-maroon-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-6">{lab}</h3>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <p className="t-meta mt-6 text-graphite-500">
              Laboratorium serumpun di bawah Laboratoria Transmisi Telekomunikasi
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tujuan */}
      <section className="shell section-y">
        <Reveal>
          <SectionHeader
            index="03"
            label="Tujuan"
            title="Enam tujuan laboratorium"
            lead="Tujuan berikut dikutip dari dokumen profil laboratorium dan menjadi dasar seluruh kegiatan yang dijalankan."
          />
        </Reveal>

        <Reveal as="ol" stagger className="rule-t mt-16">
          {objectives.map((objective) => (
              <li
                key={objective.index}
                className="rule-b grid gap-x-12 gap-y-3 py-8 lg:grid-cols-12"
              >
                <span className="t-meta text-maroon lg:col-span-1">{objective.index}</span>
                <p className="text-[0.9375rem] leading-relaxed text-graphite-600 lg:col-span-11">
                  {objective.text}
                </p>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <ArrowLink href="/riset">Arah pengembangan penelitian</ArrowLink>
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Terbuka"
        title="Terbuka bagi siapa saja yang ingin belajar."
        body="Rasa ingin tahu dan kemauan belajar yang besar adalah syaratnya, didukung semangat untuk mengembangkan pengetahuan tentang antena, propagasi, dan transmisi telekomunikasi."
        primary={{ href: "/kontak", label: "Sampaikan minat" }}
        secondary={{ href: "/kegiatan", label: "Lihat kegiatan" }}
      />
    </>
  );
}

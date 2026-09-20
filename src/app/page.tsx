import Image from "next/image";
import { ArrayLayout } from "@/components/figures/TechnicalFigures";
import { CtaBand, RowList } from "@/components/sections/Common";
import { ArrowLink, IndexMark, SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { intro } from "@/content/about";
import { activities } from "@/content/activities";
import { researchAreas } from "@/content/research";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Profil />
      <Riset />
      <Kegiatan />
      <CtaBand />
    </>
  );
}

/* ================================================================== */
/* Hero                                                                */
/* ================================================================== */

function Hero() {
  return (
    <section data-tone="dark" className="bg-ink text-white">
      <div className="hero-veil hero-fill relative flex items-center justify-center overflow-hidden">
        {/* Titik potong 42% dari atas: pada rasio hero yang lebar, jendela
            tampilan jatuh dari ujung mast sampai kaki teknisi. Yang terbuang
            hanya atap perumahan di kaki gambar. */}
        <Image
          src="/images/hero-tower.png"
          alt="Teknisi memeriksa antena sektoral pada menara telekomunikasi di atas kota"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />

        <div className="shell relative z-10 flex flex-col items-center text-center">
          {/* Frasa Inggris di dalam dokumen lang="id" — ditandai agar pembaca
              layar melafalkannya dengan benar. "We Are" tetap di dalam h1 demi
              keutuhan kalimat, tetapi diperkecil agar bobot jatuh ke nama.
              Maroon dipindah ke garis dan titik: sebagai teks, rasio kontrasnya
              di atas foto ini hanya 1,45:1. */}
          <Reveal>
            <h1 lang="en" className="flex flex-col items-center">
              <span className="flex items-center gap-4 text-[0.75rem] font-medium tracking-[0.34em] text-graphite-300 uppercase">
                <span aria-hidden className="h-px w-8 bg-maroon-bright sm:w-12" />
                We Are
                <span aria-hidden className="h-px w-8 bg-maroon-bright sm:w-12" />
              </span>
              <span className="t-masthead mt-7 block max-w-[18ch]">
                Antenna Laboratory<span className="text-maroon-bright">.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="t-meta mt-8 text-graphite-300">
              {site.faculty} · {site.parent}
            </p>
          </Reveal>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 pb-8">
          <span className="t-meta text-graphite-400">Gulir</span>
          <span aria-hidden className="h-9 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01 — Profil                                                         */
/* ================================================================== */

function Profil() {
  return (
    <section className="shell section-y">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <IndexMark index="01" label="Profil" />
            <h2 className="t-h2 mt-7 max-w-[15ch]">
              Laboratorium penelitian dan pengembangan
            </h2>
            <p lang="en" className="t-meta mt-9 border-l-2 border-maroon pl-5 text-ink">
              {site.motto}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={80}>
            <div className="prose-lab">
              <p className="text-[1.0625rem] leading-relaxed">{intro[0]}</p>
              <p>{intro[2]}</p>
            </div>
            <div className="mt-9">
              <ArrowLink href="/tentang">Profil lengkap laboratorium</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02 — Arah riset                                                     */
/* ================================================================== */

function Riset() {
  const shown = researchAreas.slice(0, 5);

  return (
    <section data-tone="dark" className="bg-ink text-white">
      <div className="shell section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeader
                index="02"
                label="Riset"
                tone="dark"
                align="stack"
                title="Sepuluh arah pengembangan"
                lead="Arah penelitian laboratorium membentang dari konsep elektromagnetika telekomunikasi sampai eksploitasi perangkat ukur RF dan gelombang mikro."
                action={
                  <ArrowLink href="/riset" tone="dark">
                    Lihat kesepuluhnya
                  </ArrowLink>
                }
              />
            </Reveal>
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <Reveal delay={120}>
              <ArrayLayout cols={6} rows={4} tone="dark" />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <RowList
            tone="dark"
            items={shown.map((area) => ({
              id: area.id,
              index: area.index,
              title: area.title,
              lead: area.body,
              href: `/riset#${area.id}`,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 03 — Kegiatan                                                       */
/* ================================================================== */

function Kegiatan() {
  return (
    <section className="bg-paper-50">
      <div className="shell section-y">
        <Reveal>
          <SectionHeader
            index="03"
            label="Kegiatan"
            title="Tiga kegiatan yang berjalan"
            lead="Di luar penelitian perorangan, laboratorium menjalankan kelompok riset berkelanjutan, divisi rancang bangun antena, serta pelatihan dan seminar."
            action={<ArrowLink href="/kegiatan">Rincian kegiatan</ArrowLink>}
          />
        </Reveal>

        <Reveal stagger className="rule-grid mt-16 grid-cols-1 md:grid-cols-3 lg:mt-20">
          {activities.map((item) => (
              <article key={item.id} className="flex flex-col px-6 py-9 sm:px-8 sm:py-10">
                <span className="t-meta text-maroon">{item.index}</span>
                <h3 className="t-h3 mt-6">{item.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite-600">
                  {item.lead}
                </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

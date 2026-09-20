/**
 * Identitas laboratorium.
 *
 * Sumber: https://antennalaboratory.wordpress.com/about/
 * Nama institusi disesuaikan ke penyebutan sekarang: situs sumber ditulis pada
 * era IT Telkom dengan "Fakultas Elektro dan Komunikasi (FEK)", yang kini
 * menjadi Fakultas Teknik Elektro, Telkom University.
 *
 * Kolom bertanda BELUM TERVERIFIKASI tidak ada pada sumber mana pun dan harus
 * diisi oleh pengelola laboratorium sebelum situs ditayangkan.
 */
/**
 * Menentukan alamat publik situs.
 *
 * Urutannya: NEXT_PUBLIC_SITE_URL, lalu variabel bawaan Vercel, lalu localhost.
 *
 * Dibuat tahan banting karena `new URL()` di metadata akan menggagalkan seluruh
 * build bila nilainya tidak sah. Variabel lingkungan yang disetel tetapi
 * dikosongkan menghasilkan string kosong, bukan undefined, sehingga `??` tidak
 * menangkapnya — itu yang dulu menggagalkan build. Di sini setiap kandidat
 * dipangkas, dilengkapi skema bila perlu, lalu diuji sungguhan dengan
 * `new URL()` sebelum dipakai.
 */
function resolveSiteUrl(): string {
  const fallback = "http://localhost:3000";

  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    // Variabel bawaan Vercel hanya berisi host, tanpa skema.
    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
      return new URL(withScheme).origin;
    } catch {
      // Nilai tidak sah diabaikan, lanjut ke kandidat berikutnya.
    }
  }

  return fallback;
}

export const site = {
  name: "Laboratorium Antena",
  nameEn: "Antenna Laboratory",
  shortName: "Antenna Lab",
  parent: "Telkom University",
  faculty: "Fakultas Teknik Elektro",
  motto: "No risk, no gain!",
  tagline:
    "Penelitian, pengembangan, dan pembinaan budaya ilmiah di bidang sistem antena, propagasi, dan transmisi radio.",
  description:
    "Laboratorium Antena adalah salah satu laboratorium di bawah Fakultas Teknik Elektro Telkom University, dengan arah pengembangan utama pada pembinaan, pengembangan, serta peningkatan budaya ilmiah penelitian di bidang sistem antena.",
  /**
   * Alamat situs ini sendiri, dipakai metadata, sitemap, dan robots.txt.
   * Lihat resolveSiteUrl() di bawah untuk urutan sumbernya.
   */
  url: resolveSiteUrl(),
  locale: "id_ID",

  contact: {
    // BELUM TERVERIFIKASI — tidak tercantum pada sumber.
    email: "",
    phone: "",
    phoneHref: "",
    hours: "",
  },

  address: {
    // Alamat kampus terverifikasi dari telkomuniversity.ac.id.
    street: "Jl. Telekomunikasi No. 1, Terusan Buah Batu",
    city: "Bandung",
    region: "Jawa Barat 40257",
    country: "Indonesia",
    mapsQuery: "Telkom University Bandung",
    // BELUM TERVERIFIKASI — gedung dan nomor ruang laboratorium.
    building: "",
  },

  faculty_site: {
    label: "see.telkomuniversity.ac.id",
    href: "https://see.telkomuniversity.ac.id/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  desc: string;
};

export const primaryNav: NavItem[] = [
  { label: "Tentang", href: "/tentang", desc: "Deskripsi, tujuan, dan kedudukan laboratorium" },
  { label: "Riset", href: "/riset", desc: "Sepuluh arah pengembangan penelitian" },
  { label: "Kegiatan", href: "/kegiatan", desc: "Research group, workshop, pelatihan dan seminar" },
  { label: "Kontak", href: "/kontak", desc: "Alamat dan formulir permohonan" },
];

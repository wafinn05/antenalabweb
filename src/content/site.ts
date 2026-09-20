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
   * Setel NEXT_PUBLIC_SITE_URL sebelum ditayangkan — nilai cadangan di bawah
   * hanya benar saat pengembangan lokal.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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

/**
 * "Arah Perkembangan" pada sumber:
 * https://antennalaboratory.wordpress.com/about/
 *
 * Kesepuluh butir dimuat lengkap dan berurutan sesuai sumber. Judul singkat
 * pada tiap butir adalah ringkasan penyajian, bukan tambahan informasi —
 * kalimat aslinya tetap dimuat utuh pada `body`.
 */

export type ResearchArea = {
  id: string;
  index: string;
  title: string;
  body: string;
};

export const researchAreas: ResearchArea[] = [
  {
    id: "elektromagnetika",
    index: "01",
    title: "Elektromagnetika Telekomunikasi",
    body: "Studi dan pemodelan tentang konsep elektromagnetika telekomunikasi.",
  },
  {
    id: "saluran-transmisi",
    index: "02",
    title: "Sistem Saluran Transmisi Radio",
    body: "Studi pemodelan, simulasi, dan implementasi sistem saluran transmisi radio.",
  },
  {
    id: "jenis-antena",
    index: "03",
    title: "Jenis-Jenis Antena dan Perkembangannya",
    body: "Studi pemodelan, simulasi, dan implementasi berbagai jenis antena serta perkembangannya dalam teknologi terapan dan generik.",
  },
  {
    id: "smart-antenna",
    index: "04",
    title: "Smart Antenna — Sistem Antena Adaptif",
    body: "Studi pemodelan, simulasi, dan implementasi smart antenna atau sistem antena adaptif, beserta pengembangan perangkatnya.",
  },
  {
    id: "cdma",
    index: "05",
    title: "Sistem Komunikasi CDMA Tetap dan Bergerak",
    body: "Studi pemodelan, simulasi, dan implementasi perencanaan sistem komunikasi tetap dan bergerak CDMA, beserta pengembangan perangkatnya.",
  },
  {
    id: "seluler",
    index: "06",
    title: "Sistem Komunikasi Bergerak Seluler",
    body: "Studi pemodelan, simulasi, dan implementasi perencanaan sistem komunikasi bergerak AMPS, GSM, CDMA, GPRS, GPRS-EDGE, W-CDMA (UMTS), dan WiMAX, beserta pengembangan perangkatnya.",
  },
  {
    id: "satelit",
    index: "07",
    title: "Sistem Komunikasi Satelit",
    body: "Studi pemodelan, simulasi, dan implementasi perencanaan sistem komunikasi satelit, beserta pengembangan perangkatnya.",
  },
  {
    id: "haps",
    index: "08",
    title: "High Altitude Platform System",
    body: "Studi pemodelan, simulasi, dan implementasi perencanaan sistem komunikasi High Altitude Platform System (HAPS), beserta pengembangan perangkatnya.",
  },
  {
    id: "ofdm",
    index: "09",
    title: "Sistem OFDM",
    body: "Studi pemodelan, simulasi, dan implementasi perencanaan sistem komunikasi OFDM (Orthogonal Frequency Division Multiplexing), beserta pengembangan perangkatnya.",
  },
  {
    id: "alat-ukur",
    index: "10",
    title: "Perangkat Ukur RF dan Gelombang Mikro",
    body: "Studi dan pengembangan eksploitasi penggunaan perangkat alat ukur transmisi radio, khususnya RF and microwave measuring.",
  },
];

/** Jalur penelitian yang dikerjakan di laboratorium. */
export const researchTracks: { title: string; detail: string }[] = [
  {
    title: "Tugas Akhir dan Proyek Akhir",
    detail:
      "Penelitian perorangan yang dikerjakan mahasiswa di bawah pendampingan dosen, menjadi bentuk keterlibatan paling umum di laboratorium ini.",
  },
  {
    title: "Research Group",
    detail:
      "Penelitian berkelompok yang berjalan berkesinambungan, tidak berhenti pada satu angkatan. Research Group Smart Antenna adalah kelompok yang berjalan aktif.",
  },
  {
    title: "Evaluasi berkala",
    detail:
      "Setiap hasil penelitian dan pengembangan dievaluasi melalui seminar, kursus, dan pelatihan agar hasilnya benar-benar bermanfaat.",
  },
];

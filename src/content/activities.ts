/**
 * "Kegiatan" pada sumber:
 * https://antennalaboratory.wordpress.com/about/
 *
 * Butir praktikum sengaja tidak dimuat sesuai permintaan pengelola.
 */

export type Activity = {
  id: string;
  index: string;
  title: string;
  lead: string;
  body: string;
};

export const activities: Activity[] = [
  {
    id: "research-group",
    index: "01",
    title: "Research Group Smart Antenna",
    lead: "Kelompok riset dengan tujuan akhir mengimplementasikan teknologi smart antenna.",
    body: "Research Group Smart Antenna dijalankan dengan tujuan akhir mengimplementasikan teknologi smart antenna, dan terus dikembangkan secara kontinyu. Berbeda dengan penelitian Tugas Akhir yang selesai bersama kelulusan mahasiswanya, kelompok ini dirancang agar pengetahuannya berpindah antarangkatan.",
  },
  {
    id: "workshop-antena",
    index: "02",
    title: "Workshop Antena",
    lead: "Divisi rancang bangun antena untuk berbagai macam aplikasi.",
    body: "Workshop Antena adalah kegiatan penelitian sekaligus realisasi rancang bangun antena untuk berbagai macam aplikasi. Divisi ini muncul di laboratorium karena adanya tuntutan pasar dan industri akan kebutuhan berbagai jenis antena, sehingga hasil rancangannya tidak berhenti sebagai simulasi.",
  },
  {
    id: "pelatihan",
    index: "03",
    title: "Pelatihan, Seminar, dan Kursus",
    lead: "Penyelenggaraan pelatihan dan seminar secara kontinyu.",
    body: "Laboratorium Antena secara kontinyu mengadakan pelatihan, workshop, dan seminar. Kegiatan ini menjadi sarana evaluasi atas hasil penelitian yang dikerjakan di laboratorium, sekaligus membuka akses pengetahuan ke luar lingkungan laboratorium.",
  },
];

/**
 * Acara yang telah diselenggarakan, sesuai daftar pada sumber.
 * Sumber tidak mencantumkan tanggal maupun penyelenggara tiap acara.
 */
export const pastEvents: string[] = [
  "Seminar Smart Antenna",
  "RF Network Planning",
  "3G Total Solution",
  "Rancang Bangun Antena untuk Aplikasi TV, Mini BTS, dan WiFi",
  "Workshop Nanosatelit",
  "Drive Test GSM, CDMA, dan 3G",
  "Seminar Radar",
  "Seminar Nanosatelit",
];

/** Pilihan keperluan pada formulir kontak. Dipakai klien dan route handler. */
export const inquiryTypes = [
  "Bergabung dengan research group",
  "Tugas Akhir atau Proyek Akhir",
  "Rancang bangun antena",
  "Pelatihan, seminar, atau kursus",
  "Kerja sama penelitian",
  "Lainnya",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

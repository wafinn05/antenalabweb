/**
 * Isi halaman Tentang.
 * Seluruhnya bersumber dari https://antennalaboratory.wordpress.com/about/
 * Penyuntingan terbatas pada ejaan dan penyebutan institusi yang kini berlaku.
 */

export const intro: string[] = [
  "Laboratorium Antena adalah salah satu dari beberapa laboratorium yang berada di bawah naungan Fakultas Teknik Elektro. Arah pengembangan utamanya adalah pembinaan, pengembangan, serta peningkatan budaya ilmiah penelitian, sehingga budaya ilmiah di lingkungan kampus dapat lebih dinamis dan berkembang.",
  "Laboratorium Antena merupakan salah satu fasilitas utama dalam pelaksanaan Tri Darma Perguruan Tinggi, yang bertujuan membentuk sumber daya manusia seutuhnya sesuai disiplin ilmunya, yaitu bidang sistem antena.",
  "Aktivitas laboratorium lebih berorientasi pada penelitian dan pengembangan, baik yang dikerjakan secara individu dalam bentuk Tugas Akhir dan Proyek Akhir, maupun secara berkelompok melalui Research Group. Setiap hasil penelitian terus dievaluasi melalui seminar, kursus, dan pelatihan agar benar-benar bermanfaat.",
  "Karena itu Laboratorium Antena terbuka bagi siapa saja yang memiliki rasa ingin tahu dan kemauan belajar yang besar, didukung semangat berusaha yang tinggi untuk mengembangkan pengetahuan tentang antena, propagasi, dan transmisi telekomunikasi pada umumnya.",
];

/** Laboratorium serumpun di bawah Laboratoria Transmisi Telekomunikasi. */
export const siblingLabs: string[] = [
  "Laboratorium Gelombang Mikro",
  "Laboratorium Dasar Transmisi",
  "Laboratorium Sistem Komunikasi Serat Optik",
];

export const siblingCaption =
  "Bersama laboratorium-laboratorium di bawah Laboratoria Transmisi Telekomunikasi, Laboratorium Antena diarahkan untuk menunjang mata kuliah rumpun transmisi — dalam proses belajar-mengajar, penelitian dan pengembangan, maupun pengabdian — dan dapat diakses oleh dosen maupun mahasiswa.";

export type Objective = { index: string; text: string };

/** "Tujuan" pada sumber. */
export const objectives: Objective[] = [
  {
    index: "01",
    text: "Penciptaan iklim dan lingkungan ilmiah yang kondusif, dinamis, serta kreatif di kalangan mahasiswa, dengan menyelenggarakan berbagai kegiatan akademis intrakurikuler maupun ekstrakurikuler yang berbasis penelitian dan pengembangan, di antaranya melalui Tugas Akhir, Proyek Akhir, dan Research Group.",
  },
  {
    index: "02",
    text: "Peningkatan eksistensi laboratorium dalam pelaksanaan evaluasi hasil penelitian dan pengembangan, melalui seminar, kursus, dan pelatihan yang digelar secara berkala dan terjadwal.",
  },
  {
    index: "03",
    text: "Pembinaan serta pendalaman pemahaman dan penguasaan konsep-konsep transmisi radio melalui pendampingan dalam kelompok-kelompok belajar.",
  },
  {
    index: "04",
    text: "Mengembangkan berbagai fasilitas dan sumber daya manusia untuk meningkatkan kemampuan serta kehandalan laboratorium dalam mendukung kegiatan pengabdian masyarakat, pendidikan dan pelatihan, seminar, kursus, serta proyek — baik dalam lingkup sosial, komersial, maupun internal yang terkait disiplin ilmu transmisi radio.",
  },
  {
    index: "05",
    text: "Memfasilitasi dan mengatur kelompok maupun perorangan dalam penelitian yang melibatkan dosen dan mahasiswa, agar dapat secara optimal ikut membangun budaya ilmiah kampus sebagai kontribusi bagi pengembangan ilmu pengetahuan dan teknologi, khususnya di bidang transmisi radio.",
  },
  {
    index: "06",
    text: "Memperluas kerja sama dengan berbagai lembaga atau pihak, khususnya dalam proyek penelitian dan pengembangan serta penerapannya pada berbagai persoalan, baik generik maupun terapan, dalam proyek lintas disiplin.",
  },
];

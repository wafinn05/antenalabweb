# Laboratorium Antena — Telkom University

Situs profil Laboratorium Antena, Fakultas Teknik Elektro, Telkom University.

Dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan
**Tailwind CSS v4**. Seluruh isi halaman disimpan sebagai modul TypeScript
bertipe di `src/content/`, terpisah dari kode tampilan.

---

## Asal isi halaman

Seluruh teks pada situs ini bersumber dari laman resmi laboratorium:

> https://antennalaboratory.wordpress.com/about/

Penyuntingan terbatas pada ejaan dan penyebutan institusi. Situs sumber ditulis
pada era **IT Telkom** dengan sebutan "Fakultas Elektro dan Komunikasi (FEK)";
di situs ini disesuaikan menjadi **Fakultas Teknik Elektro, Telkom University**,
sesuai penamaan yang berlaku sekarang.

Alamat kampus diverifikasi terpisah dari `telkomuniversity.ac.id`.

Isi tentang **praktikum tidak dimuat** sesuai permintaan pengelola.

### Yang belum ada dan harus dilengkapi

Hal-hal berikut tidak tercantum pada sumber mana pun, sehingga dibiarkan kosong
dan ditandai `BELUM TERVERIFIKASI` di `src/content/site.ts`:

- Surel resmi laboratorium
- Nomor telepon
- Gedung dan nomor ruang laboratorium
- Daftar personel yang sedang menjabat
- Daftar peralatan dan fasilitas
- Daftar publikasi

Halaman Kontak menyatakan secara terbuka bahwa data ini belum tersedia, alih-alih
menampilkan nilai contoh yang bisa disalahpahami sebagai data asli.

---

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

| Perintah            | Kegunaan                                   |
| ------------------- | ------------------------------------------ |
| `npm run build`     | Build produksi                             |
| `npm run start`     | Menjalankan hasil build                    |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | Pemeriksaan tipe tanpa emit                |

Alamat publik situs diambil dari `NEXT_PUBLIC_SITE_URL`. Bila kosong atau tidak
disetel, variabel bawaan Vercel dipakai sebagai cadangan, lalu `localhost`.
Nilai tanpa skema (mis. `situs.vercel.app`) otomatis dilengkapi `https://`, dan
nilai yang tidak sah diabaikan alih-alih menggagalkan build. Lihat
`resolveSiteUrl()` di `src/content/site.ts`.

Untuk pengembangan lokal, salin `.env.example` menjadi `.env.local`.

> Catatan pemasangan: `typescript` dipatok ke `5.9.3` lewat `overrides` di
> `package.json`. Tanpa patokan ini, npm berputar tanpa henti saat menyelaraskan
> peer dependency `typescript-eslint`.

---

## Struktur

```
src/
├── app/
│   ├── layout.tsx              Root layout, font, metadata, JSON-LD
│   ├── page.tsx                Beranda
│   ├── globals.css             Design token + kelas komponen
│   ├── icon.png                Favicon (dibuat dari logo, perbarui manual)
│   ├── tentang/                Deskripsi, kedudukan, enam tujuan
│   ├── riset/                  Sepuluh arah pengembangan
│   ├── kegiatan/               Research group, workshop, pelatihan
│   ├── kontak/                 Keterangan, formulir, peta
│   ├── api/kontak/route.ts     Penerima formulir (validasi + rate limit)
│   ├── sitemap.ts · robots.ts  SEO
│   └── not-found.tsx           Halaman 404
├── components/
│   ├── layout/                 SiteHeader, SiteFooter
│   ├── ui/                     Primitives, Reveal, Logo
│   ├── sections/               PageHero, CtaBand, RowList
│   └── figures/                Figur teknis SVG
├── content/                    <- SUNTING DI SINI
└── lib/utils.ts
```

---

## Menyunting isi

| Berkas          | Isi                                                  |
| --------------- | ---------------------------------------------------- |
| `site.ts`       | Nama, moto, alamat, kontak, menu navigasi             |
| `about.ts`      | Deskripsi, laboratorium serumpun, enam tujuan         |
| `research.ts`   | Sepuluh arah pengembangan, tiga jalur penelitian      |
| `activities.ts` | Tiga kegiatan, daftar acara, pilihan formulir kontak  |

Setiap berkas punya tipe, sehingga kesalahan isian tertangkap
`npm run typecheck` sebelum sampai ke produksi.

### Mengganti logo

Timpa `public/images/logo.png`. Berkas itu dirujuk langsung oleh header dan
footer, jadi tidak ada berkas turunan yang perlu dibuat ulang. Bila rasionya
berubah, sesuaikan atribut `width`/`height` di `src/components/ui/Logo.tsx`.
Favicon (`src/app/icon.png`) dibuat terpisah dan perlu diperbarui manual.

### Mengganti foto hero

Timpa `public/images/hero-tower.png`. Rasio 4:3 dengan subjek di tengah bekerja
paling baik: hero memotong secara vertikal, dan `object-position` disetel 42%
dari atas agar jendela tampilan jatuh dari ujung mast sampai kaki teknisi.

---

## Sistem desain

Token didefinisikan sekali sebagai custom property di `:root`
(`src/app/globals.css`), lalu dipetakan ke Tailwind lewat `@theme inline`.

**Palet**

| Peran  | Token                              | Nilai                              |
| ------ | ---------------------------------- | ---------------------------------- |
| Hitam  | `--c-ink` ... `--c-ink-600`        | `#0b0b0c` ke `#2b2b30`             |
| Maroon | `--c-maroon` / `-deep` / `-bright` | `#8e1b2c` `#5c1019` `#ad2236`      |
| Putih  | `--c-paper` ... `--c-paper-200`    | `#ffffff` ke `#eae8e5`             |
| Abu    | `--c-graphite-300` ... `-600`      | `#d6d4d1` ke `#585655`             |
| Garis  | `--c-rule`, `--c-rule-dark`        | `#e2e0dd`, `rgba(255,255,255,.14)` |

Maroon adalah satu-satunya aksen. Di atas latar gelap ia **tidak dipakai untuk
teks** — rasio kontrasnya hanya 1,45:1 di atas foto hero, jauh di bawah ambang
3:1. Pada latar gelap maroon hanya muncul sebagai garis, titik, dan penanda.

**Tipografi** — Archivo (judul), IBM Plex Sans (teks), IBM Plex Mono (label,
angka, keterangan gambar).

**Bentuk** — tanpa sudut membulat, tanpa bayangan. Pemisah berupa garis rambut
1 px. Kisi dibuat lewat `.rule-grid` (celah 1 px yang memperlihatkan warna
latar), bukan border per sel.

> Catatan: `cn()` di `src/lib/utils.ts` hanya menggabung string dan **tidak**
> menyelesaikan konflik utilitas Tailwind. Bila dua utilitas segrup bertemu
> (mis. `h-6` dan `h-8`), pemenangnya ditentukan urutan stylesheet, bukan urutan
> penulisan. Hindari memberi nilai bawaan yang bisa bertabrakan dengan nilai
> dari pemanggil.

**Figur teknis** (`src/components/figures/TechnicalFigures.tsx`) — grafik
digambar dari perhitungan, bukan hiasan:

- `PolarPattern` — array factor `|sin(N.psi/2) / (N.sin(psi/2))|`, jarak 0,5 lambda
- `ReturnLossPlot` — kurva S11 dari penjumlahan resonansi Lorentzian
- `ArrayLayout` — denah patch beserta jaringan umpan

Ketiganya adalah ilustrasi teori umum, **bukan** data pengukuran laboratorium.

---

## Formulir kontak

`POST /api/kontak` memvalidasi kiriman di sisi peladen, menolak bot lewat kolom
honeypot, dan membatasi lima kiriman per IP tiap sepuluh menit.

**Belum tersambung ke transport surel.** Permohonan hanya dicatat ke log
peladen. Sebelum tayang, sambungkan pada bagian bertanda `TODO produksi` di
`src/app/api/kontak/route.ts`. Pembatas laju menyimpan hitungan di memori, jadi
ganti dengan Redis bila di-deploy ke lebih dari satu instance.

---

## Aksesibilitas

- Tautan lewati-ke-konten, penanda `aria-current` pada menu aktif
- Figur SVG memiliki `role="img"` dan `aria-label` deskriptif
- Frasa berbahasa Inggris di dalam dokumen `lang="id"` ditandai `lang="en"`
- Cincin fokus maroon pada latar terang, putih pada latar gelap
- Formulir memakai `<label>` eksplisit, `aria-invalid`, dan galat per kolom

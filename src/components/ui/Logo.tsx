import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Lambang resmi laboratorium.
 *
 * Dirujuk langsung dari `public/images/logo.png`, tanpa berkas turunan apa
 * pun. Mengganti berkas itu langsung mengubah tampilan situs.
 *
 * Logo memakai tinta biru-teal yang tidak terbaca di atas latar gelap, karena
 * itu di header dan footer ia dipasang pada plat putih — warna aslinya tetap
 * utuh, tanpa perlu diubah sama sekali. Latar putih bawaan logo menyatu mulus
 * dengan plat tersebut.
 *
 * Rasio gambar 1254 : 709. Bila berkasnya diganti dengan rasio berbeda,
 * perbarui juga atribut width/height di bawah agar tidak terjadi geseran tata
 * letak saat gambar dimuat.
 */
export function LogoMark({
  className,
  alt = "",
  priority = false,
  plate = true,
}: {
  /** Mengatur tinggi gambar, mis. "h-7". */
  className?: string;
  alt?: string;
  priority?: boolean;
  /** Plat putih di belakang logo. Matikan bila latarnya sudah terang. */
  plate?: boolean;
}) {
  // Tinggi bawaan hanya dipasang bila pemanggil belum menentukannya.
  // cn() sekadar menggabung string, sehingga dua utilitas tinggi sekaligus
  // akan diadu oleh urutan stylesheet, bukan urutan penulisan — dan yang
  // menang justru bisa yang bawaan.
  const hasHeight = /(?:^|\s)(?:h-|max-h-|size-)/.test(className ?? "");

  const image = (
    <Image
      src="/images/logo.png"
      alt={alt}
      width={1254}
      height={709}
      priority={priority}
      className={cn(!hasHeight && "h-8", "w-auto", className)}
    />
  );

  if (!plate) return image;

  return <span className="inline-flex items-center bg-white px-3 py-2">{image}</span>;
}

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Antenna Laboratory — Beranda"
      className={cn(
        "group flex items-center gap-4",
        tone === "dark" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark
        priority
        plate={tone === "dark"}
        className="h-6 shrink-0 transition-opacity duration-300 group-hover:opacity-85 sm:h-7"
      />

      {/* Nama tetap diketik terpisah: pada tinggi header, teks di dalam logo
          terlalu kecil untuk terbaca dan hanya berfungsi sebagai lambang. */}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.9375rem] leading-none font-semibold tracking-[0.06em] uppercase">
          Antenna Lab
        </span>
        <span
          className={cn(
            "t-meta mt-1.5 text-[0.5625rem] tracking-[0.2em]",
            tone === "dark" ? "text-graphite-500" : "text-graphite-400",
          )}
        >
          Telkom University
        </span>
      </span>
    </Link>
  );
}

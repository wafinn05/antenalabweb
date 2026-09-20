import { NextResponse } from "next/server";
import { inquiryTypes, type InquiryType } from "@/content/activities";

/**
 * Penerima formulir kontak.
 *
 * Saat ini permohonan divalidasi lalu dicatat ke log server. Untuk
 * produksi, sambungkan ke transport surel pada bagian yang ditandai
 * di bawah (SMTP kampus, Resend, SendGrid, atau sejenisnya) dan
 * simpan salinannya ke basis data bila diperlukan jejak audit.
 */

type Payload = {
  nama: string;
  institusi: string;
  email: string;
  telepon?: string;
  layanan: string;
  pesan: string;
  /** Honeypot — harus kosong. Diisi berarti bot. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Pembatas laju sederhana per-instance. Ganti dengan Redis bila di-deploy multi-instance. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function validate(body: Partial<Payload>) {
  const errors: Record<string, string> = {};

  if (!body.nama?.trim() || body.nama.trim().length < 2) {
    errors.nama = "Nama wajib diisi.";
  }
  if (!body.institusi?.trim()) {
    errors.institusi = "Institusi atau perusahaan wajib diisi.";
  }
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim())) {
    errors.email = "Alamat surel tidak valid.";
  }
  if (!body.layanan || !inquiryTypes.includes(body.layanan as InquiryType)) {
    errors.layanan = "Pilih salah satu jenis keperluan.";
  }
  if (!body.pesan?.trim() || body.pesan.trim().length < 20) {
    errors.pesan = "Uraikan kebutuhan Anda minimal 20 karakter.";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<Payload>;

  try {
    body = (await request.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, message: "Format permintaan tidak valid." }, { status: 400 });
  }

  // Honeypot: bot mengisi kolom tersembunyi, manusia tidak.
  if (body.website) {
    return NextResponse.json({ ok: true, message: "Permohonan diterima." });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Terlalu banyak pengiriman. Coba lagi dalam beberapa menit." },
      { status: 429 },
    );
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Periksa kembali isian formulir.", errors },
      { status: 422 },
    );
  }

  // ---------------------------------------------------------------
  // TODO produksi: kirim surel ke alamat resmi laboratorium dan simpan
  // salinan permohonan. Contoh:
  //   await resend.emails.send({ ... })
  // ---------------------------------------------------------------
  console.info("[kontak] permohonan baru", {
    nama: body.nama,
    institusi: body.institusi,
    email: body.email,
    layanan: body.layanan,
    diterima: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Permohonan terkirim. Laboratorium akan menghubungi Anda melalui surel.",
  });
}

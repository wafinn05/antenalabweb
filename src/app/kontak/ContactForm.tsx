"use client";

import { useId, useState, type FormEvent } from "react";
import { inquiryTypes } from "@/content/activities";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_BASE =
  "w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-graphite-400 focus:border-maroon";

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; // disimpan: currentTarget kosong setelah await
    setStatus("sending");
    setErrors({});
    setMessage("");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Pengiriman gagal. Coba beberapa saat lagi.");
        return;
      }

      setStatus("sent");
      setMessage(result.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Jaringan bermasalah. Periksa koneksi Anda lalu coba lagi.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rule-t rule-b py-16 text-center">
        <p className="t-meta text-maroon">Terkirim</p>
        <p className="t-h3 mt-5 max-w-[26ch] mx-auto">{message}</p>
        <p className="mt-5 text-[0.9375rem] text-graphite-500">
          Salinan permohonan tidak dikirimkan otomatis ke surel Anda. Simpan catatan Anda sendiri
          bila diperlukan.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="t-meta mt-8 text-ink underline underline-offset-4 transition-colors hover:text-maroon"
        >
          Kirim permohonan lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rule-t pt-10">
      {/* Honeypot, disembunyikan dari pengguna dan pembaca layar */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        <Field
          id={`${uid}-nama`}
          name="nama"
          label="Nama lengkap"
          placeholder="Nama dan gelar bila ada"
          required
          error={errors.nama}
        />
        <Field
          id={`${uid}-institusi`}
          name="institusi"
          label="Institusi / perusahaan"
          placeholder="Nama lembaga asal"
          required
          error={errors.institusi}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Alamat surel"
          placeholder="nama@institusi.ac.id"
          required
          error={errors.email}
        />
        <Field
          id={`${uid}-telepon`}
          name="telepon"
          type="tel"
          label="Telepon"
          placeholder="Opsional"
          error={errors.telepon}
        />
      </div>

      <div className="mt-9">
        <label htmlFor={`${uid}-layanan`} className="t-meta text-graphite-500">
          Jenis keperluan <span className="text-maroon">*</span>
        </label>
        <select
          id={`${uid}-layanan`}
          name="layanan"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.layanan)}
          className={cn(FIELD_BASE, "mt-2 appearance-none", errors.layanan && "border-maroon")}
        >
          <option value="" disabled>
            Pilih salah satu
          </option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.layanan && <p className="t-meta mt-2 text-maroon">{errors.layanan}</p>}
      </div>

      <div className="mt-9">
        <label htmlFor={`${uid}-pesan`} className="t-meta text-graphite-500">
          Uraian kebutuhan <span className="text-maroon">*</span>
        </label>
        <textarea
          id={`${uid}-pesan`}
          name="pesan"
          rows={5}
          required
          placeholder="Sebutkan rentang frekuensi, dimensi sampel, parameter yang ingin diukur, dan tenggat yang diharapkan."
          aria-invalid={Boolean(errors.pesan)}
          className={cn(FIELD_BASE, "mt-2 resize-y leading-relaxed", errors.pesan && "border-maroon")}
        />
        {errors.pesan && <p className="t-meta mt-2 text-maroon">{errors.pesan}</p>}
      </div>

      {status === "error" && message && (
        <p role="alert" className="rule-t mt-8 pt-5 text-[0.875rem] text-maroon">
          {message}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-3 bg-maroon px-8 py-3.5 text-[0.8125rem] font-medium tracking-wide text-white transition-colors duration-300 hover:bg-maroon-bright disabled:cursor-not-allowed disabled:bg-graphite-400"
        >
          {status === "sending" ? "Mengirim…" : "Kirim permohonan"}
          {status !== "sending" && (
            <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3">
              <path
                d="M2 8h11M9 3.5 13.5 8 9 12.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
        <p className="max-w-[34ch] text-[0.8125rem] leading-relaxed text-graphite-500">
          Dengan mengirim formulir ini Anda menyetujui data di atas digunakan untuk menindaklanjuti
          permohonan.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-meta text-graphite-500">
        {label} {required && <span className="text-maroon">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(FIELD_BASE, "mt-2", error && "border-maroon")}
      />
      {error && <p className="t-meta mt-2 text-maroon">{error}</p>}
    </div>
  );
}

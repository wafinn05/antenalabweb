import { cn } from "@/lib/utils";

/* ==================================================================
   Figur teknis.
   Kurva digambar dari perhitungan nyata, bukan bentuk dekoratif:
   pola array dihitung dari array factor, kurva S11 dari model
   resonator Lorentzian. Semua digambar sebagai garis — tanpa isian
   gradasi, tanpa bayangan.
   ================================================================== */

type FigureTone = "light" | "dark";

function palette(tone: FigureTone) {
  return tone === "dark"
    ? {
        grid: "rgba(255,255,255,0.12)",
        axis: "rgba(255,255,255,0.28)",
        label: "rgba(255,255,255,0.42)",
        trace: "#ffffff",
        accent: "var(--c-maroon-bright)",
      }
    : {
        grid: "#e2e0dd",
        axis: "#c9c7c4",
        label: "#a8a6a3",
        trace: "#0b0b0c",
        accent: "var(--c-maroon)",
      };
}

/* ------------------------------------------------------------------ */
/* 1 — Pola radiasi array linier N elemen, jarak antarelemen 0,5 λ     */
/* ------------------------------------------------------------------ */

function arrayFactorDb(thetaRad: number, n: number) {
  const psi = Math.PI * Math.sin(thetaRad); // d = λ/2, beda fasa nol
  const denom = n * Math.sin(psi / 2);
  const af = Math.abs(denom) < 1e-9 ? 1 : Math.abs(Math.sin((n * psi) / 2) / denom);
  return 20 * Math.log10(Math.max(af, 1e-6));
}

export function PolarPattern({
  elements = 8,
  floorDb = 40,
  tone = "light",
  className,
}: {
  elements?: number;
  floorDb?: number;
  tone?: FigureTone;
  className?: string;
}) {
  const c = palette(tone);
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const R = 130;

  const points: string[] = [];
  for (let deg = 0; deg <= 360; deg += 1) {
    const theta = (deg * Math.PI) / 180;
    const db = Math.max(arrayFactorDb(theta, elements), -floorDb);
    const r = (R * (db + floorDb)) / floorDb;
    points.push(`${(cx + r * Math.cos(theta)).toFixed(2)},${(cy + r * Math.sin(theta)).toFixed(2)}`);
  }

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Pola radiasi array linier ${elements} elemen dengan jarak antarelemen setengah panjang gelombang`}
      className={cn("h-auto w-full", className)}
    >
      {rings.map((k) => (
        <circle
          key={k}
          cx={cx}
          cy={cy}
          r={R * k}
          fill="none"
          stroke={k === 1 ? c.axis : c.grid}
          strokeWidth="1"
        />
      ))}

      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + R * Math.cos(a)}
            y2={cy + R * Math.sin(a)}
            stroke={c.grid}
            strokeWidth="1"
          />
        );
      })}

      <polyline points={points.join(" ")} fill="none" stroke={c.trace} strokeWidth="1.6" />

      {/* Penanda arah pancar utama */}
      <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={c.accent} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="2.5" fill={c.accent} />

      {[
        { k: 0.25, t: "-30" },
        { k: 0.5, t: "-20" },
        { k: 0.75, t: "-10" },
        { k: 1, t: "0 dB" },
      ].map((ring) => (
        <text
          key={ring.t}
          x={cx + 5}
          y={cy - R * ring.k + 11}
          fill={c.label}
          fontSize="8.5"
          fontFamily="var(--ff-mono)"
          letterSpacing="0.08em"
        >
          {ring.t}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Kurva return loss S11 dua resonansi                             */
/* ------------------------------------------------------------------ */

type Resonance = { f0: number; depth: number; width: number };

export function ReturnLossPlot({
  fMin = 1,
  fMax = 8,
  resonances = [
    { f0: 2.45, depth: 27, width: 0.2 },
    { f0: 5.5, depth: 22, width: 0.42 },
  ],
  tone = "light",
  className,
}: {
  fMin?: number;
  fMax?: number;
  resonances?: Resonance[];
  tone?: FigureTone;
  className?: string;
}) {
  const c = palette(tone);
  const W = 560;
  const H = 260;
  const padL = 46;
  const padR = 18;
  const padT = 18;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const dbMin = -35;
  const dbMax = 0;

  const xOf = (f: number) => padL + ((f - fMin) / (fMax - fMin)) * plotW;
  const yOf = (db: number) => padT + ((dbMax - db) / (dbMax - dbMin)) * plotH;

  const steps = 280;
  const path: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const f = fMin + ((fMax - fMin) * i) / steps;
    let db = -0.8 - 0.35 * Math.sin(f * 2.1); // riak dasar saluran umpan
    for (const r of resonances) {
      db -= r.depth / (1 + ((f - r.f0) / r.width) ** 2);
    }
    db = Math.max(db, dbMin + 0.5);
    path.push(`${i === 0 ? "M" : "L"}${xOf(f).toFixed(2)} ${yOf(db).toFixed(2)}`);
  }

  const gridDb = [0, -10, -20, -30];
  const gridF = Array.from({ length: fMax - fMin + 1 }, (_, i) => fMin + i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Kurva return loss S11 dari ${fMin} sampai ${fMax} gigahertz dengan dua resonansi`}
      className={cn("h-auto w-full", className)}
    >
      {gridDb.map((db) => (
        <g key={db}>
          <line
            x1={padL}
            y1={yOf(db)}
            x2={W - padR}
            y2={yOf(db)}
            stroke={db === 0 ? c.axis : c.grid}
            strokeWidth="1"
          />
          <text
            x={padL - 10}
            y={yOf(db) + 3.5}
            textAnchor="end"
            fill={c.label}
            fontSize="9"
            fontFamily="var(--ff-mono)"
          >
            {db}
          </text>
        </g>
      ))}

      {gridF.map((f) => (
        <g key={f}>
          <line x1={xOf(f)} y1={padT} x2={xOf(f)} y2={H - padB} stroke={c.grid} strokeWidth="1" />
          <text
            x={xOf(f)}
            y={H - padB + 17}
            textAnchor="middle"
            fill={c.label}
            fontSize="9"
            fontFamily="var(--ff-mono)"
          >
            {f}
          </text>
        </g>
      ))}

      {/* Ambang −10 dB */}
      <line
        x1={padL}
        y1={yOf(-10)}
        x2={W - padR}
        y2={yOf(-10)}
        stroke={c.accent}
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <text
        x={W - padR - 4}
        y={yOf(-10) - 7}
        textAnchor="end"
        fill={c.accent}
        fontSize="9"
        fontFamily="var(--ff-mono)"
        letterSpacing="0.1em"
      >
        AMBANG −10 dB
      </text>

      <path d={path.join(" ")} fill="none" stroke={c.trace} strokeWidth="1.7" />

      {resonances.map((r) => (
        <circle key={r.f0} cx={xOf(r.f0)} cy={yOf(-r.depth - 0.8)} r="3" fill={c.accent} />
      ))}

      <text
        x={W - padR}
        y={H - 5}
        textAnchor="end"
        fill={c.label}
        fontSize="8.5"
        fontFamily="var(--ff-mono)"
        letterSpacing="0.14em"
      >
        FREKUENSI (GHz)
      </text>
      <text
        x={12}
        y={padT + 6}
        fill={c.label}
        fontSize="8.5"
        fontFamily="var(--ff-mono)"
        letterSpacing="0.14em"
      >
        S11 (dB)
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Denah array patch dengan jaringan umpan corporate               */
/* ------------------------------------------------------------------ */

export function ArrayLayout({
  cols = 8,
  rows = 4,
  tone = "light",
  className,
}: {
  cols?: number;
  rows?: number;
  tone?: FigureTone;
  className?: string;
}) {
  const c = palette(tone);
  const cell = 46;
  const patch = 26;
  const pad = 26;
  const W = cols * cell + pad * 2;
  const H = rows * cell + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Denah array patch ${cols} kali ${rows} elemen beserta jaringan umpan`}
      className={cn("h-auto w-full", className)}
    >
      <rect
        x="0.5"
        y="0.5"
        width={W - 1}
        height={H - 1}
        fill="none"
        stroke={c.axis}
        strokeWidth="1"
      />

      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, q) => {
          const x = pad + q * cell + (cell - patch) / 2;
          const y = pad + r * cell + (cell - patch) / 2;
          const midY = pad + r * cell + cell / 2;
          return (
            <g key={`${r}-${q}`}>
              {/* Saluran umpan horizontal */}
              <line
                x1={pad + q * cell}
                y1={midY}
                x2={pad + (q + 1) * cell}
                y2={midY}
                stroke={c.grid}
                strokeWidth="1"
              />
              <rect
                x={x}
                y={y}
                width={patch}
                height={patch}
                fill="none"
                stroke={r === 0 && q === 0 ? c.accent : c.trace}
                strokeWidth={r === 0 && q === 0 ? "1.6" : "1.1"}
              />
              {/* Titik umpan */}
              <circle cx={x + patch / 2} cy={y + patch - 5} r="1.4" fill={c.accent} />
            </g>
          );
        }),
      )}

      {/* Tulang punggung jaringan umpan */}
      <line x1={W / 2} y1={pad / 2} x2={W / 2} y2={H - pad / 2} stroke={c.accent} strokeWidth="1.2" />
      <text
        x={pad}
        y={H - 9}
        fill={c.label}
        fontSize="8.5"
        fontFamily="var(--ff-mono)"
        letterSpacing="0.14em"
      >
        {cols} × {rows} PATCH · JARAK 0,5 λ
      </text>
    </svg>
  );
}

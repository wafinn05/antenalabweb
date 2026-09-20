type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal class joiner — no runtime dependency needed for this project. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}

/** "01" for 1, "12" for 12 — used for the section index marks. */
export function pad(index: number): string {
  return String(index).padStart(2, "0");
}

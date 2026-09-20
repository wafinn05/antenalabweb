"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Jeda sebelum elemen ini muncul, dalam milidetik. */
  delay?: number;
  /**
   * Alih-alih menganimasikan dirinya sendiri, anak-anak langsungnya yang masuk
   * berurutan. Dipakai untuk kisi kartu dan daftar.
   */
  stagger?: boolean;
  className?: string;
};

/**
 * Entrance yang ditahan: naik 12–14 px, sekali saja, saat pertama terlihat.
 * Dimatikan otomatis oleh aturan prefers-reduced-motion di globals.css.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  stagger = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Peramban tanpa IntersectionObserver: tandai langsung pada DOM.
    // Atribut inilah yang dibaca CSS, jadi tidak perlu melalui state.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.shown = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Ambang nol dengan tepi bawah ditarik ke dalam: animasi mulai tepat
      // setelah elemen benar-benar masuk layar, bukan saat masih di ambang.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={cn(stagger ? "reveal-group" : "reveal", className)}
      style={
        !stagger && delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}

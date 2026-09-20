import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.faculty} ${site.parent}`,
    template: `%s — ${site.name} ${site.parent}`,
  },
  description: site.description,
  keywords: [
    "laboratorium antena",
    "antenna laboratory",
    "Telkom University",
    "smart antenna",
    "propagasi gelombang",
    "transmisi radio",
    "Fakultas Teknik Elektro",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.faculty} ${site.parent}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.faculty} ${site.parent}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: site.parent,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        {/* Cross-fade antarhalaman lewat View Transitions bawaan peramban.
            Peramban tanpa dukungan (mis. Firefox saat ini) melewatkannya
            tanpa galat, dan navigasinya tetap berjalan seperti biasa. */}
        <ViewTransition default="page">
          <main id="konten" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <SiteFooter />
      </body>
    </html>
  );
}

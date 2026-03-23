import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CtaBanner } from "@/components/layout/cta-banner";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Réparation de Canalisation Val d'Oise (95) | Remplacement & Intervention 7j/7",
    template: "%s | Réparation Canalisation 95",
  },
  description:
    "Consortium d'artisans canalisateurs du Val d'Oise (95). Remplacement de canalisation en urgence, réparation de fuite, diagnostic caméra. Intervention rapide 7j/7 dans tout le 95. Devis gratuit, garantie décennale.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Urgence Canalisation Val d'Oise",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.reparation-canalisation.fr" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CtaBanner />
      </body>
    </html>
  );
}

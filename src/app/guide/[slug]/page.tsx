import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, MapPin, Clock, ShieldCheck, Award } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";
import { getLongtailBySlug, getAllLongtailSlugs, longtails } from "@/lib/longtails";
import { cities } from "@/lib/cities";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllLongtailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLongtailBySlug(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://www.reparation-canalisation.fr/guide/${page.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getLongtailBySlug(slug);
  if (!page) notFound();

  // Related pages (same category, max 6)
  const related = longtails.filter((l) => l.slug !== page.slug && l.category === page.category).slice(0, 4);
  const otherCategory = longtails.filter((l) => l.slug !== page.slug && l.category !== page.category).slice(0, 4);

  // For "ville" guides, find matching city pages to cross-link
  const linkedCities = page.category === "ville"
    ? cities.filter((c) => page.slug.includes(c.slug) || page.h1.toLowerCase().includes(c.name.toLowerCase()))
    : [];

  return (
    <div style={{ paddingBottom: 60 }}>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.reparation-canalisation.fr" },
        { name: "Guide", url: "https://www.reparation-canalisation.fr/guide" },
        { name: page.h1, url: `https://www.reparation-canalisation.fr/guide/${page.slug}` },
      ]} />

      {/* Header */}
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Accueil</Link>
            <ChevronRight style={{ height: 14, width: 14 }} />
            <Link href="/guide" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Guide</Link>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, lineHeight: 1.15 }}>
            {page.h1}
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow">
          {/* Intro */}
          <p style={{ color: "#2D3748", fontSize: 17, fontWeight: 600, lineHeight: 1.8, marginBottom: 24, borderLeft: "4px solid #F7941D", paddingLeft: 20 }}>
            {page.intro}
          </p>

          {/* Contenu principal */}
          <div style={{ color: "#718096", fontSize: 15, lineHeight: 1.9, marginBottom: 40 }}>
            {page.content.split(". ").reduce((acc: string[][], sentence, i) => {
              const paragraphIndex = Math.floor(i / 4);
              if (!acc[paragraphIndex]) acc[paragraphIndex] = [];
              acc[paragraphIndex].push(sentence);
              return acc;
            }, []).map((sentences, i) => (
              <p key={i} style={{ marginBottom: 16 }}>{sentences.join(". ")}{sentences[sentences.length - 1].endsWith(".") ? "" : "."}</p>
            ))}
          </div>

          {/* Badges confiance */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 40 }}>
            {[
              { icon: Clock, label: "Intervention sous 1h", desc: "7j/7 dans le Val d'Oise" },
              { icon: ShieldCheck, label: "Garantie décennale", desc: "Artisans assurés RC Pro" },
              { icon: Award, label: "Devis gratuit", desc: "Sans engagement" },
              { icon: MapPin, label: "Artisans locaux", desc: "Implantés dans le 95" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, borderRadius: 10, background: "#F7FAFC", border: "1px solid #E2E8F0" }}>
                <item.icon style={{ height: 20, width: 20, color: "#F7941D", flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#2D3748" }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: "#A0AEC0" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: "#F7941D", borderRadius: 16, padding: "36px 28px", textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
              Besoin d&apos;une intervention ?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 20 }}>Nos artisans du Val d&apos;Oise interviennent sous 1 heure. Devis gratuit.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              <CallbackButton variant="secondary" style={{ fontSize: 15, padding: "12px 24px" }} />
              <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 700, padding: "10px 24px", borderRadius: 50, textDecoration: "none", fontSize: 14 }}>
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Lien vers la page ville correspondante */}
          {linkedCities.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "#2D3748", marginBottom: 12 }}>
                Nos interventions dans cette commune
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {linkedCities.map((city) => (
                  <Link key={city.slug} href={`/zone-intervention/${city.slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 10, border: "1px solid #E2E8F0", background: "#F7FAFC", textDecoration: "none" }}>
                    <MapPin style={{ height: 18, width: 18, color: "#F7941D", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "#2D3748" }}>Réparation de canalisation à {city.name}</p>
                      <p style={{ fontSize: 12, color: "#A0AEC0" }}>{city.postalCode} — Intervention sous 1h, devis gratuit</p>
                    </div>
                    <ChevronRight style={{ height: 16, width: 16, color: "#A0AEC0", marginLeft: "auto", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles liés */}
          {related.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>Articles similaires</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/guide/${r.slug}`} style={{ display: "block", padding: 16, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none" }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "#2D3748", marginBottom: 4 }}>{r.h1}</p>
                    <p style={{ fontSize: 12, color: "#A0AEC0" }}>{r.intro.slice(0, 80)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {otherCategory.length > 0 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>Voir aussi</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {otherCategory.map((r) => (
                  <Link key={r.slug} href={`/guide/${r.slug}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#F7941D", fontWeight: 500, textDecoration: "none" }}>
                    <ChevronRight style={{ height: 14, width: 14 }} /> {r.h1}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Liens vers pages principales */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #E2E8F0", display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/" style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 13, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Accueil</Link>
            <Link href="/services" style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 13, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Nos services</Link>
            <Link href="/zone-intervention" style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 13, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Zones d&apos;intervention</Link>
            <Link href="/temoignages" style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 13, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Avis clients</Link>
            <Link href="/contact" style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 13, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

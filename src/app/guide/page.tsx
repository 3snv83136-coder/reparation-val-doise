import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, MapPin, Wrench, AlertTriangle, Gauge, Euro, Siren } from "lucide-react";
import { longtails } from "@/lib/longtails";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Guide Canalisation Val d'Oise — Conseils, Prix & Techniques",
  description:
    "Guides pratiques sur la canalisation dans le Val d'Oise (95) : problèmes fréquents, techniques de réparation, matériaux, prix et conseils par ville. Rédigés par nos artisans canalisateurs.",
  alternates: { canonical: "https://urgence-canalisation-valdoise.fr/guide" },
};

const categoryConfig: Record<string, { label: string; icon: typeof BookOpen; color: string }> = {
  probleme: { label: "Problèmes fréquents", icon: AlertTriangle, color: "#E53E3E" },
  service: { label: "Nos services", icon: Wrench, color: "#3182CE" },
  materiau: { label: "Matériaux", icon: Gauge, color: "#38A169" },
  technique: { label: "Techniques", icon: BookOpen, color: "#805AD5" },
  urgence: { label: "Urgences", icon: Siren, color: "#DD6B20" },
  prix: { label: "Prix & Devis", icon: Euro, color: "#D69E2E" },
  ville: { label: "Par ville", icon: MapPin, color: "#F7941D" },
};

export default function GuidePage() {
  const categories = Object.keys(categoryConfig);
  const grouped = categories
    .map((cat) => ({
      key: cat,
      ...categoryConfig[cat],
      articles: longtails.filter((l) => l.category === cat),
    }))
    .filter((g) => g.articles.length > 0);

  return (
    <div style={{ paddingBottom: 60 }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://urgence-canalisation-valdoise.fr" },
          { name: "Guide", url: "https://urgence-canalisation-valdoise.fr/guide" },
        ]}
      />

      {/* Hero */}
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "#fff",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Guide Canalisation Val d&apos;Oise
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 17,
              maxWidth: 550,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {longtails.length} articles rédigés par nos artisans canalisateurs pour vous aider à comprendre, prévenir et
            résoudre vos problèmes de canalisation.
          </p>
        </div>
      </section>

      {/* Articles groupés par catégorie */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          {grouped.map((group) => (
            <div key={group.key} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 8,
                    background: `${group.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <group.icon style={{ height: 18, width: 18, color: group.color }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "#2D3748" }}>
                  {group.label}
                </h2>
                <span style={{ fontSize: 13, color: "#A0AEC0", marginLeft: 4 }}>
                  ({group.articles.length} article{group.articles.length > 1 ? "s" : ""})
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 12,
                }}
              >
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/guide/${article.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 16,
                      borderRadius: 12,
                      border: "1px solid #E2E8F0",
                      background: "#fff",
                      textDecoration: "none",
                      transition: "box-shadow 0.15s",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: "#2D3748", fontSize: 14, marginBottom: 4 }}>{article.h1}</p>
                      <p style={{ fontSize: 12, color: "#A0AEC0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {article.intro}
                      </p>
                    </div>
                    <ChevronRight style={{ height: 16, width: 16, color: "#A0AEC0", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Liens internes */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link
              href="/"
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "1px solid #E2E8F0",
                fontSize: 14,
                fontWeight: 600,
                color: "#2D3748",
                textDecoration: "none",
              }}
            >
              Accueil
            </Link>
            <Link
              href="/services"
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "1px solid #E2E8F0",
                fontSize: 14,
                fontWeight: 600,
                color: "#2D3748",
                textDecoration: "none",
              }}
            >
              Nos services
            </Link>
            <Link
              href="/zone-intervention"
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "1px solid #E2E8F0",
                fontSize: 14,
                fontWeight: 600,
                color: "#2D3748",
                textDecoration: "none",
              }}
            >
              Zones d&apos;intervention
            </Link>
            <Link
              href="/reservation"
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                background: "#F7941D",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

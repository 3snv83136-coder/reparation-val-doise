import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Zone d'intervention canalisation Val d'Oise (95)",
  description: "Intervention canalisation dans tout le Val d'Oise : Argenteuil, Cergy, Pontoise, Sarcelles et +40 communes du 95.",
};

export default function ZoneInterventionPage() {
  return (
    <div style={{ paddingBottom: 60 }}>
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 12 }}>Zone d&apos;intervention</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, maxWidth: 550, marginLeft: "auto", marginRight: "auto" }}>
            Nos artisans canalisateurs interviennent dans tout le Val d&apos;Oise (95). A 20 minutes de chez vous.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#2D3748", marginBottom: 32 }}>
            {cities.length} communes couvertes dans le Val d&apos;Oise
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
            {cities.map((city) => (
              <Link key={city.slug} href={`/zone-intervention/${city.slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 12, border: "1px solid #E2E8F0", background: "#fff", textDecoration: "none", transition: "box-shadow 0.15s" }}>
                <MapPin style={{ height: 20, width: 20, color: "#F7941D", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 600, color: "#2D3748", fontSize: 14, display: "block" }}>{city.name}</span>
                  <span style={{ fontSize: 12, color: "#A0AEC0" }}>{city.postalCode}</span>
                </div>
                <ChevronRight style={{ height: 16, width: 16, color: "#A0AEC0" }} />
              </Link>
            ))}
          </div>

          {/* Liens internes */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Accueil</Link>
            <Link href="/services" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Nos services</Link>
            <Link href="/reservation" style={{ padding: "10px 20px", borderRadius: 50, background: "#F7941D", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Prendre rendez-vous</Link>
            <Link href="/contact" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

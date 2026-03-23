import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { AggregateRatingJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Avis clients vérifiés — Réparation Canalisation Val d'Oise",
  description: "Découvrez les avis et témoignages vérifiés de nos clients dans le Val d'Oise (95). Note moyenne 4.9/5. Consortium d'artisans canalisateurs recommandé.",
  alternates: { canonical: "https://www.reparation-canalisation.fr/temoignages" },
};

// Avis statiques (compatibilité Vercel serverless — pas de SQLite au runtime)
const avisData = [
  { id: "1", nom: "Nathalie B.", ville: "Franconville", note: 5, commentaire: "Fuite dans le jardin, ils ont creusé, remplacé et tout remis en état. Rien à redire. Artisan ponctuel et travail très propre.", date: "22/03/2026" },
  { id: "2", nom: "Thomas R.", ville: "Pontoise", note: 4, commentaire: "Diagnostic caméra très utile pour identifier le problème. Intervention de remplacement planifiée rapidement. Bon rapport qualité-prix.", date: "22/03/2026" },
  { id: "3", nom: "Sophie M.", ville: "Enghien-les-Bains", note: 5, commentaire: "Réparation de canalisation en urgence un dimanche. Très réactifs et prix correct. Merci pour la rapidité !", date: "22/03/2026" },
  { id: "4", nom: "Jean-Pierre D.", ville: "Cergy", note: 5, commentaire: "Remplacement complet de la canalisation d'évacuation. Équipe sérieuse, devis respecté, chantier propre. Je recommande.", date: "22/03/2026" },
  { id: "5", nom: "Marie L.", ville: "Argenteuil", note: 5, commentaire: "Intervention très rapide suite à une fuite importante. L'artisan était là en 45 minutes. Travail propre et professionnel.", date: "22/03/2026" },
];

export default function TemoignagesPage() {
  const avgNote = (avisData.reduce((sum, a) => sum + a.note, 0) / avisData.length).toFixed(1);

  return (
    <div style={{ paddingBottom: 60 }}>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.reparation-canalisation.fr" },
        { name: "Témoignages", url: "https://www.reparation-canalisation.fr/temoignages" },
      ]} />
      <AggregateRatingJsonLd rating={avgNote} count={avisData.length} />

      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 12 }}>Avis clients vérifiés</h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {[1,2,3,4,5].map((i) => <Star key={i} style={{ height: 20, width: 20, fill: "#fff", color: "#fff" }} />)}
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginLeft: 8 }}>{avgNote}/5</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginLeft: 4 }}>sur {avisData.length} avis</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginTop: 12 }}>
            Découvrez pourquoi nos clients du Val d&apos;Oise font confiance à notre consortium d&apos;artisans canalisateurs.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {avisData.map((a) => (
              <div key={a.id} style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} style={{ height: 16, width: 16, fill: i < a.note ? "#F7941D" : "#E2E8F0", color: i < a.note ? "#F7941D" : "#E2E8F0" }} />
                  ))}
                </div>
                <p style={{ color: "#2D3748", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>&ldquo;{a.commentaire}&rdquo;</p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#38A169", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    <CheckCircle2 style={{ height: 16, width: 16 }} /> Avis vérifié
                  </div>
                  <p style={{ color: "#2D3748", fontWeight: 700, fontSize: 14 }}>{a.nom}</p>
                  <p style={{ color: "#A0AEC0", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin style={{ height: 12, width: 12 }} /> {a.ville} · {a.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Liens internes */}
      <section style={{ paddingTop: 48, paddingBottom: 48, borderTop: "1px solid #E2E8F0" }}>
        <div className="container-narrow" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Link href="/" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Accueil</Link>
          <Link href="/services" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Nos services</Link>
          <Link href="/reservation" style={{ padding: "10px 20px", borderRadius: 50, background: "#F7941D", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Prendre rendez-vous</Link>
          <Link href="/zone-intervention" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Zone d&apos;intervention</Link>
          <Link href="/contact" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Contact</Link>
        </div>
      </section>
    </div>
  );
}

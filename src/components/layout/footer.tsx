import Link from "next/link";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";

export function Footer() {
  return (
    <footer style={{ background: "#1A202C" }}>
      {/* Barre CTA */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "20px 0" }}>
        <div className="container-main" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: 18 }}>RÉPARATION</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#F7941D", fontSize: 18 }}>CANALISATION</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <CallbackButton variant="primary" style={{ padding: "10px 20px", fontSize: 14, boxShadow: "none" }} />
            <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, padding: "10px 20px", borderRadius: 50, fontSize: 14, textDecoration: "none" }}>
              Devis gratuit en ligne
            </Link>
          </div>
        </div>
      </div>

      {/* 4 colonnes */}
      <div className="container-main" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {/* Col 1 : A propos */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 1 }}>À propos</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              Consortium d&apos;artisans canalisateurs du Val d&apos;Oise. Intervention rapide 7j/7 pour tous vos problèmes de canalisation.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <li><Link href="/mentions-legales" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>Mentions légales</Link></li>
              <li><Link href="/contact" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>Contact</Link></li>
              <li><Link href="/admin" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "none" }}>Administration</Link></li>
            </ul>
          </div>

          {/* Col 2 : Services */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 1 }}>Services</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Remplacement canalisation", "Réparation de fuite", "Diagnostic caméra"].map((s) => (
                <li key={s}><Link href="/services" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 3 : Zones */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 1 }}>Zones d&apos;intervention</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "Argenteuil", slug: "argenteuil" },
                { name: "Cergy", slug: "cergy" },
                { name: "Pontoise", slug: "pontoise" },
                { name: "Sarcelles", slug: "sarcelles" },
                { name: "Enghien-les-Bains", slug: "enghien-les-bains" },
              ].map((v) => (
                <li key={v.slug}><Link href={`/zone-intervention/${v.slug}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>{v.name}</Link></li>
              ))}
              <li><Link href="/zone-intervention" style={{ color: "#F7941D", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>Toutes les villes →</Link></li>
            </ul>
          </div>

          {/* Col 4 : Contact */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: 1 }}>Contact</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <li style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <PhoneCall style={{ height: 14, width: 14, color: "#F7941D", flexShrink: 0 }} /> Rappel immédiat disponible
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <Mail style={{ height: 14, width: 14, color: "#F7941D", flexShrink: 0 }} /> contact@urgence-canalisation.fr
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <MapPin style={{ height: 14, width: 14, color: "#F7941D", flexShrink: 0 }} /> Val d&apos;Oise (95)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <Clock style={{ height: 14, width: 14, color: "#F7941D", flexShrink: 0 }} /> 7j/7 — 8h à 20h
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 0" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
            © {new Date().getFullYear()} Urgence Canalisation Val d&apos;Oise — Consortium d&apos;artisans canalisateurs. Tous droits réservés. Garantie décennale. Agréé assurances.
          </p>
        </div>
      </div>
    </footer>
  );
}

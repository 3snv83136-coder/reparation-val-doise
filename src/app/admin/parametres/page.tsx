import { Building2, Mail, Key } from "lucide-react";

export default function AdminParametresPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "#2D3748" }}>Paramètres</h1>
        <p style={{ color: "#718096", fontSize: 15, marginTop: 4 }}>Configuration entreprise, SMTP et clé API</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {[
          { icon: Building2, title: "Informations entreprise", desc: "Nom, adresse, SIRET, téléphone, email de l'entreprise." },
          { icon: Mail, title: "Configuration SMTP", desc: "Serveur email pour l'envoi de notifications et devis aux clients." },
          { icon: Key, title: "Clé API Claude", desc: "Clé API Anthropic pour la génération IA de rapports d'intervention." },
        ].map((item) => (
          <div key={item.title} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ height: 40, width: 40, borderRadius: 10, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <item.icon style={{ height: 20, width: 20, color: "#F7941D" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#2D3748", fontSize: 16 }}>{item.title}</h3>
            </div>
            <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
            <span style={{ display: "inline-block", background: "#FFF7ED", color: "#F7941D", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 50 }}>À configurer</span>
          </div>
        ))}
      </div>
    </div>
  );
}

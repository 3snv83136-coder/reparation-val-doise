import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales",
  description: "Mentions legales du site Urgence Canalisation Val d'Oise.",
};

export default function MentionsLegalesPage() {
  return (
    <div style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container-narrow">
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#2D3748", marginBottom: 32 }}>Mentions legales</h1>

        {[
          { title: "Editeur du site", content: "Urgence Canalisation Val d'Oise\nConsortium d'artisans canalisateurs\nVal d'Oise (95)\nTelephone : 06 06 06 06 06\nEmail : contact@urgence-canalisation.fr\nSIRET : [A completer]" },
          { title: "Hebergement", content: "[A completer avec les informations de l'hebergeur]" },
          { title: "Protection des donnees personnelles (RGPD)", content: "Les informations recueillies via les formulaires de contact et de reservation sont destinees exclusivement au traitement de votre demande. Elles ne sont transmises a aucun tiers. Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees." },
          { title: "Cookies", content: "Ce site n'utilise aucun cookie de tracking ni outil d'analyse tiers." },
          { title: "Assurance et garanties", content: "Tous les artisans du consortium sont couverts par une assurance responsabilite civile professionnelle et une garantie decennale. Les attestations sont disponibles sur demande." },
          { title: "Propriete intellectuelle", content: "L'ensemble du contenu de ce site (textes, images, logos) est protege par le droit d'auteur. Toute reproduction est interdite sans autorisation prealable." },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>{section.title}</h2>
            <p style={{ color: "#718096", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-line" }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

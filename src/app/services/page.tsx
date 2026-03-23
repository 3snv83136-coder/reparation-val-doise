import type { Metadata } from "next";
import Link from "next/link";
import { Pipette, Droplets, Search, Clock, Euro, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Services canalisation urgence Val d'Oise (95) — Remplacement, Réparation, Diagnostic",
  description: "Nos 3 expertises en canalisation dans le Val d'Oise : remplacement de canalisation (fonte, PVC, PEHD), réparation de fuite, diagnostic caméra. Artisans certifiés, garantie décennale, devis gratuit.",
  alternates: { canonical: "https://www.reparation-canalisation.fr/services" },
};

const services = [
  {
    icon: Pipette,
    title: "Remplacement de Canalisation",
    subtitle: "Fonte, PVC, PEHD — Tranchée ou chemisage sans tranchée",
    description: "Le remplacement de canalisation est notre cœur de métier. Nos artisans canalisateurs du Val d'Oise interviennent sur tous les types de réseaux : eaux usées (EU), eaux pluviales (EP) et eau potable (AEP). Nous remplaçons les canalisations vétustes en fonte, grès ou plomb par des matériaux modernes aux normes NF : PVC CR8/CR16, PEHD (polyéthylène haute densité) ou fonte ductile selon les contraintes du chantier.",
    process: "L'intervention se déroule en 5 étapes rigoureuses : 1) Diagnostic préalable avec inspection caméra pour évaluer l'état exact de la canalisation, 2) Établissement d'un devis détaillé poste par poste (terrassement, fourniture, pose, remise en état), 3) Terrassement mécanique ou manuel selon l'accessibilité, avec blindage de fouille conforme à la réglementation, 4) Pose de la nouvelle canalisation avec raccordement au réseau existant et essai d'étanchéité sous pression, 5) Remblaiement, compactage et remise en état du terrain (enrobé, béton, pelouse).",
    problems: ["Canalisation en fonte fissurée ou percée", "Tuyau en plomb à remplacer (mise en conformité)", "Affaissement de canalisation enterrée", "Racines intrusives ayant détruit le réseau", "Contre-pente empêchant l'écoulement", "Canalisation écrasée par un engin ou des travaux"],
    duree: "1 à 3 jours selon la longueur",
    prix: "80",
    garantie: "Garantie décennale — Conformité DTU 64.1 et NF EN 1401",
  },
  {
    icon: Droplets,
    title: "Réparation de Fuite",
    subtitle: "Détection par acoustique, corrélation et gaz traceur",
    description: "La réparation de fuite sur canalisation exige une localisation précise avant toute intervention. Nos techniciens utilisent des techniques non destructives de dernière génération : écoute acoustique au sol, corrélation (mesure du temps de propagation du bruit de fuite entre deux capteurs) et injection de gaz traceur (hydrogène-azote) pour les fuites invisibles. Ces méthodes permettent de localiser la fuite au centimètre près, sans casser votre sol inutilement.",
    process: "Notre processus de réparation : 1) Pré-diagnostic téléphonique pour évaluer la gravité (fuite apparente, humidité suspecte, compteur qui tourne), 2) Déplacement sur site avec le matériel de détection, 3) Localisation précise de la fuite par méthode acoustique ou gaz traceur, 4) Réparation ciblée : pose de manchon de réparation, collier de prise en charge, remplacement du tronçon endommagé ou reprise de joint défectueux, 5) Test d'étanchéité et vérification du débit.",
    problems: ["Fuite sur canalisation enterrée (jardin, sous-sol)", "Fuite visible sur tuyau apparent (cave, garage)", "Joint de raccord défectueux", "Micro-fuite invisible (compteur qui tourne)", "Fuite après compteur sur réseau AEP", "Infiltration dans regard ou boîte de branchement"],
    duree: "2 à 6 heures",
    prix: "150",
    garantie: "Garantie pièces et main d'œuvre — Attestation de réparation fournie",
  },
  {
    icon: Search,
    title: "Diagnostic par Caméra",
    subtitle: "Inspection vidéo HD avec localisation GPS des anomalies",
    description: "Le diagnostic par caméra d'inspection est l'examen médical de vos canalisations. Nos techniciens insèrent une caméra endoscopique haute définition dans le réseau pour visualiser en temps réel l'état intérieur des tuyaux. La caméra est équipée d'un émetteur de localisation qui permet de repérer précisément la position et la profondeur de chaque anomalie détectée, même sous plusieurs mètres de terrain. Le rapport vidéo complet vous est remis en fin d'intervention.",
    process: "Déroulement du diagnostic : 1) Accès au réseau par un regard, une bouche d'égout ou un point d'entrée adapté, 2) Insertion de la caméra motorisée avec mesure métrique (distance depuis le point d'entrée), 3) Inspection visuelle complète avec enregistrement vidéo HD, 4) Identification et localisation GPS de chaque anomalie (fissure, affaissement, racine, contre-pente, obstruction), 5) Remise d'un rapport détaillé avec captures d'écran annotées et recommandations techniques.",
    problems: ["État des lieux avant achat immobilier", "Recherche de cause de refoulement", "Vérification après travaux de construction", "Identification de racines intrusives", "Contrôle de conformité réseau EU/EP", "Localisation d'un bouchon récurrent"],
    duree: "1 à 2 heures",
    prix: "200",
    garantie: "Rapport vidéo HD complet — Fichier numérique transmis par email",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingBottom: 60 }}>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.reparation-canalisation.fr" },
        { name: "Services", url: "https://www.reparation-canalisation.fr/services" },
      ]} />
      <ServiceJsonLd services={services.map((s) => ({ name: s.title, description: s.description.slice(0, 200), price: s.prix }))} />

      {/* Header */}
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 12 }}>
            Nos services de canalisation
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Trois expertises complémentaires pour résoudre tous vos problèmes de canalisation dans le Val d&apos;Oise (95). Artisans certifiés, matériel professionnel, garantie décennale.
          </p>
        </div>
      </section>

      {/* Services détaillés */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {services.map((service) => (
            <article key={service.title} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "32px 36px" }}>
              {/* En-tête service */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ height: 56, width: 56, borderRadius: 14, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <service.icon style={{ height: 28, width: 28, color: "#F7941D" }} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 24, fontWeight: 800 }}>{service.title}</h2>
                  <p style={{ color: "#F7941D", fontSize: 13, fontWeight: 600, marginTop: 2 }}>{service.subtitle}</p>
                </div>
              </div>

              {/* Description E-E-A-T */}
              <p style={{ color: "#718096", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{service.description}</p>

              {/* Processus */}
              <div style={{ background: "#F7FAFC", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Déroulement de l&apos;intervention</h3>
                <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.8 }}>{service.process}</p>
              </div>

              {/* Problèmes traités */}
              <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Problèmes traités</h3>
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8, marginBottom: 20 }}>
                {service.problems.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#2D3748" }}>
                    <CheckCircle2 style={{ height: 16, width: 16, color: "#F7941D", marginTop: 2, flexShrink: 0 }} /> {p}
                  </li>
                ))}
              </ul>

              {/* Badges prix / durée / garantie */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF7ED", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#2D3748" }}>
                  <Clock style={{ height: 14, width: 14, color: "#F7941D" }} /> {service.duree}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF7ED", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#2D3748" }}>
                  <Euro style={{ height: 14, width: 14, color: "#F7941D" }} /> À partir de {service.prix} €
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F0FFF4", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#38A169" }}>
                  <ShieldCheck style={{ height: 14, width: 14 }} /> {service.garantie}
                </span>
              </div>

              {/* CTA */}
              <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F7941D", color: "#fff", fontWeight: 700, padding: "12px 28px", borderRadius: 50, fontSize: 14, textDecoration: "none" }}>
                Demander un devis gratuit →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Garanties */}
      <section style={{ background: "#FFFBF5", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow">
          <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 24, fontWeight: 800, marginBottom: 20, textAlign: "center" }}>Nos engagements qualité</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: ShieldCheck, title: "Garantie décennale", desc: "Tous nos travaux de canalisation sont couverts par une assurance décennale conforme à la loi Spinetta." },
              { icon: Award, title: "Matériaux aux normes NF", desc: "Tubes PVC CR8/CR16, PEHD PE100, raccords NF — uniquement des matériaux certifiés et tracés." },
              { icon: CheckCircle2, title: "Conformité DTU", desc: "Nos interventions respectent les Documents Techniques Unifiés (DTU 64.1, DTU 60.33) et les règles de l'art." },
            ].map((g) => (
              <div key={g.title} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 24 }}>
                <g.icon style={{ height: 24, width: 24, color: "#F7941D", marginBottom: 12 }} />
                <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{g.title}</h3>
                <p style={{ color: "#718096", fontSize: 13, lineHeight: 1.7 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>En savoir plus</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
            <Link href="/" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#2D3748" }}>← Retour à l&apos;accueil</Link>
            <Link href="/zone-intervention" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#2D3748" }}>Nos zones d&apos;intervention (49 villes)</Link>
            <Link href="/temoignages" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#2D3748" }}>Avis clients vérifiés</Link>
            <Link href="/guide/prix-remplacement-canalisation" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#F7941D" }}>Guide : prix remplacement canalisation</Link>
            <Link href="/guide/chemisage-canalisation-sans-tranchee" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#F7941D" }}>Guide : chemisage sans tranchée</Link>
            <Link href="/contact" style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "#2D3748" }}>Nous contacter</Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: "#F7941D", paddingTop: 56, paddingBottom: 56 }}>
        <div className="container-tight" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Besoin d&apos;une intervention ?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 24 }}>Nos artisans du Val d&apos;Oise sont disponibles 7j/7. Devis gratuit, intervention sous 1h.</p>
          <CallbackButton variant="secondary" style={{ fontSize: 18, padding: "14px 36px" }} />
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { FAQJsonLd } from "@/components/seo/json-ld";
import {
  Pipette, Droplets, Search, Star, MapPin,
  CheckCircle2, PhoneCall, ScanSearch, HardHat, ShieldCheck,
  Clock, Award, Users, FileText, Wrench
} from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";

const faqData = [
  { question: "Combien coûte un remplacement de canalisation dans le Val d'Oise ?", answer: "Le prix d'un remplacement de canalisation varie entre 80 et 200 €/ml selon le matériau (PVC, PEHD, fonte), la profondeur de la tranchée et les conditions d'accès. Nous établissons un devis gratuit et détaillé sur place avant toute intervention, sans engagement. Les travaux sont couverts par notre garantie décennale." },
  { question: "En combien de temps intervenez-vous en urgence ?", answer: "Nos artisans canalisateurs du Val d'Oise interviennent en moins d'une heure sur la majorité des communes du 95. Pour les urgences critiques (fuite active, refoulement), nous mobilisons immédiatement l'artisan le plus proche de votre domicile. Nous sommes disponibles 7j/7, de 8h à 20h, y compris les week-ends et jours fériés." },
  { question: "Intervenez-vous le week-end et les jours fériés ?", answer: "Oui, notre consortium d'artisans assure des interventions 7 jours sur 7, y compris les samedis, dimanches et jours fériés. Les canalisations n'attendent pas : nous non plus. Aucune majoration cachée sur les interventions du week-end." },
  { question: "Quelles communes du Val d'Oise couvrez-vous ?", answer: "Nous intervenons dans l'ensemble du département du Val d'Oise (95) : Argenteuil, Cergy, Pontoise, Sarcelles, Garges-lès-Gonesse, Franconville, Bezons, Ermont, Goussainville, Villiers-le-Bel, Taverny, Saint-Gratien, Montmorency, Eaubonne, Enghien-les-Bains et plus de 30 autres communes. Consultez notre page Zone d'intervention pour la liste complète." },
  { question: "Vos artisans sont-ils assurés et certifiés ?", answer: "Tous les artisans de notre consortium disposent d'une assurance responsabilité civile professionnelle et d'une garantie décennale. Nous sommes agréés par les principales compagnies d'assurance (AXA, Allianz, MAAF, GMF, MACIF, Matmut, Groupama, MMA). Les attestations sont disponibles sur demande." },
  { question: "Comment se déroule une intervention de remplacement ?", answer: "L'intervention se déroule en 4 étapes : 1) Diagnostic sur place avec inspection caméra si nécessaire, 2) Devis détaillé poste par poste (terrassement, fourniture, pose, remise en état), 3) Travaux de remplacement avec matériaux aux normes NF, 4) Essai d'étanchéité et remise en état du terrain. Un compte-rendu d'intervention vous est remis à la fin des travaux." },
  { question: "Le devis est-il vraiment gratuit ?", answer: "Oui, le devis est 100% gratuit et sans engagement. Notre artisan se déplace chez vous, évalue la situation, et vous remet un devis détaillé sur place. Vous n'êtes jamais obligé d'accepter. Nous croyons en la transparence totale des prix : pas de frais cachés, pas de supplément non annoncé." },
  { question: "Quelle est la différence entre réparation et remplacement ?", answer: "La réparation consiste à colmater une fuite ponctuelle (manchon, collier, joint) sans remplacer l'ensemble de la canalisation. Le remplacement est nécessaire quand la canalisation est trop vétuste, fissurée sur plusieurs points, ou en matériau obsolète (plomb, fonte corrodée). Notre diagnostic caméra permet de déterminer la solution la plus adaptée et la plus économique." },
];

export default function HomePage() {
  // Avis statiques (Prisma désactivé pour compatibilité Vercel serverless)
  const avisDisplay = [
    { id: "1", nom: "Marie L.", ville: "Argenteuil", note: 5, commentaire: "Intervention très rapide suite à une fuite importante sous l'évier. L'artisan était là en 35 minutes. Travail propre et professionnel. Prix conforme au devis, aucune surprise. Je recommande vivement ce consortium d'artisans." },
    { id: "2", nom: "Jean-Pierre D.", ville: "Cergy-Pontoise", note: 5, commentaire: "Remplacement complet de la canalisation d'évacuation en fonte vétuste par du PVC. Équipe sérieuse et organisée, devis respecté à l'euro près. Chantier propre, terrain remis en état. Garantie décennale fournie." },
    { id: "3", nom: "Sophie M.", ville: "Enghien-les-Bains", note: 5, commentaire: "Diagnostic caméra qui a permis de localiser une fissure invisible à l'œil nu. Réparation effectuée dans la foulée. Très réactifs même un dimanche matin. Prix correct et travail soigné !" },
  ];

  const avgNote = avisDisplay.length > 0 ? (avisDisplay.reduce((s, a) => s + a.note, 0) / avisDisplay.length).toFixed(1) : "5.0";

  return (
    <div style={{ paddingBottom: 60 }}>
      <FAQJsonLd faqs={faqData} />

      {/* ═══════ HERO ═══════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-canalisation.jpg')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.55)", zIndex: 1 }} />
        <div className="container-narrow" style={{ position: "relative", zIndex: 2, paddingTop: 64, paddingBottom: 64, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
            <MapPin style={{ height: 14, width: 14, color: "#fff" }} />
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Intervention Val d&apos;Oise (95)</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Remplacement de Canalisation<br />en Urgence dans le Val d&apos;Oise
          </h1>

          <div style={{ display: "inline-block", background: "#fff", borderRadius: 50, padding: "14px 32px", marginBottom: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <span style={{ color: "#F7941D", fontWeight: 800, fontSize: 18, letterSpacing: 0.5, textTransform: "uppercase" }}>Devis gratuit sans engagement</span>
          </div>

          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, lineHeight: 1.6, marginBottom: 32, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Fuite d&apos;eau ? Canalisation cassée ? Tuyau percé ?<br />
            Notre consortium d&apos;artisans canalisateurs du <strong>Val d&apos;Oise</strong> intervient rapidement. Agréé assurances. Garantie décennale.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <CallbackButton variant="secondary" style={{ fontSize: 20, padding: "16px 40px", gap: 12 }} />
            <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}>
              Prendre rendez-vous en ligne
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ POURQUOI NOUS CHOISIR ════════════════ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow">
          <div style={{ background: "#FFFBF5", borderLeft: "4px solid #F7941D", borderRadius: 12, padding: "32px 40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Pourquoi choisir notre consortium d&apos;artisans ?</h2>
            <p style={{ color: "#718096", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              Nous sommes un <strong>collectif d&apos;artisans canalisateurs implantés dans le Val d&apos;Oise</strong>, pas un call-center national. Chaque intervention est réalisée par un professionnel qualifié qui connaît les spécificités des réseaux locaux : canalisations en fonte des centres-villes historiques, réseaux PVC des lotissements récents, terrains argileux de la vallée de l&apos;Oise.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {[
                { text: "Devis gratuit sans engagement", bold: true },
                { text: "Transparence totale des prix avant travaux" },
                { text: "Artisans qualifiés RGE et certifiés" },
                { text: "Garantie décennale sur tous les travaux" },
                { text: "Disponible 7j/7, y compris week-ends et fériés" },
                { text: "Aucune majoration cachée" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle2 style={{ height: 20, width: 20, color: "#F7941D", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#2D3748", fontSize: 15, fontWeight: item.bold ? 700 : 400, textDecoration: item.bold ? "underline" : "none", textDecorationColor: "#F7941D" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ NOS 3 SERVICES ═══════════════════════ */}
      <section style={{ paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Nos Interventions <span style={{ color: "#F7941D" }}>Canalisation</span>
            </h2>
            <p style={{ color: "#718096", fontSize: 16, marginTop: 12, maxWidth: 650, marginLeft: "auto", marginRight: "auto" }}>
              Trois expertises complémentaires pour résoudre tous vos problèmes de canalisation dans le Val d&apos;Oise. Chaque intervention est réalisée par un artisan spécialisé, avec du matériel professionnel aux normes NF.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { icon: Pipette, title: "Remplacement de Canalisation", desc: "Remplacement complet ou partiel de vos canalisations défectueuses (fonte, PVC, PEHD). Travaux en tranchée ou par chemisage sans tranchée. Matériaux aux normes NF, conformité DTU 64.1. Garantie décennale sur chaque chantier.", price: "À partir de 80 €/ml" },
              { icon: Droplets, title: "Réparation de Fuite", desc: "Détection et réparation rapide de fuites sur canalisations enterrées ou apparentes. Techniques d'écoute acoustique, corrélation et gaz traceur pour localiser la fuite sans casser. Réparation par manchon, collier ou remplacement du tronçon.", price: "À partir de 150 €" },
              { icon: Search, title: "Diagnostic Caméra", desc: "Inspection vidéo HD de vos canalisations pour identifier précisément les défauts : fissures, affaissements, contre-pentes, racines intrusives. Rapport vidéo détaillé avec localisation GPS des anomalies. Indispensable avant un achat immobilier.", price: "À partir de 200 €" },
            ].map((s) => (
              <div key={s.title} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 28 }}>
                <div style={{ height: 48, width: 48, borderRadius: 12, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <s.icon style={{ height: 24, width: 24, color: "#F7941D" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#F7941D", fontWeight: 700, fontSize: 14 }}>{s.price}</span>
                  <Link href="/services" style={{ color: "#F7941D", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AGRÉÉ ASSURANCES ════════════════════ */}
      <section style={{ background: "#FFFBF5", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#F7941D", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
            <ShieldCheck style={{ height: 16, width: 16 }} /> Artisan Agréé Assurances
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Prise en charge par votre assurance habitation</h2>
          <p style={{ color: "#718096", fontSize: 15, marginBottom: 24, maxWidth: 550, marginLeft: "auto", marginRight: "auto" }}>Nous travaillons avec les principales compagnies d&apos;assurance. Nos devis sont acceptés directement par votre assureur pour une prise en charge simplifiée de vos sinistres.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 40px" }}>
            {["AXA", "Allianz", "MAAF", "GMF", "MACIF", "Matmut", "Groupama", "MMA"].map((a) => (
              <span key={a} style={{ color: "#A0AEC0", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COMMENT ÇA MARCHE ═══════════════════ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Comment ça <span style={{ color: "#F7941D" }}>marche</span> ?
            </h2>
            <p style={{ color: "#718096", fontSize: 15, marginTop: 8 }}>Un processus simple et transparent, de votre appel à la résolution du problème.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { num: "1", icon: PhoneCall, title: "Appelez-nous", desc: "Un artisan canalisateur du Val d'Oise vous répond en moins de 2 minutes. Il évalue votre urgence et mobilise l'équipe la plus proche." },
              { num: "2", icon: ScanSearch, title: "Diagnostic sur place", desc: "L'artisan arrive chez vous sous 1h. Il réalise un diagnostic précis (inspection caméra si nécessaire) et vous remet un devis gratuit détaillé." },
              { num: "3", icon: HardHat, title: "Intervention immédiate", desc: "Dès votre accord, les travaux commencent. Matériaux aux normes, techniques professionnelles, chantier propre. Garantie décennale." },
            ].map((step) => (
              <div key={step.num} style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: "fit-content", margin: "0 auto 20px" }}>
                  <div style={{ height: 64, width: 64, borderRadius: 16, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <step.icon style={{ height: 28, width: 28, color: "#F7941D" }} />
                  </div>
                  <span style={{ position: "absolute", top: -8, right: -8, height: 28, width: 28, borderRadius: "50%", background: "#F7941D", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <CallbackButton variant="primary" style={{ fontSize: 18, padding: "16px 40px", gap: 12 }} />
          </div>
        </div>
      </section>

      {/* ═══════ NOS ARTISANS (E-E-A-T) ══════════════ */}
      <section style={{ background: "#F7FAFC", paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Nos <span style={{ color: "#F7941D" }}>Artisans</span> du Val d&apos;Oise
            </h2>
            <p style={{ color: "#718096", fontSize: 15, marginTop: 8 }}>Un collectif d&apos;artisans locaux implantés dans le 95 — on est vos voisins.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              { prenom: "Marc", role: "Canalisateur senior", zone: "Argenteuil / Bezons / Colombes", exp: "18 ans d'expérience", specialite: "Spécialiste remplacement fonte → PVC" },
              { prenom: "Julien", role: "Technicien diagnostic", zone: "Cergy / Pontoise / Osny", exp: "12 ans d'expérience", specialite: "Expert inspection caméra et détection de fuite" },
              { prenom: "Stéphane", role: "Chef de chantier", zone: "Sarcelles / Garges / Villiers-le-Bel", exp: "15 ans d'expérience", specialite: "Réparation urgente et travaux de terrassement" },
            ].map((a) => (
              <div key={a.prenom} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 24, display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ height: 56, width: 56, borderRadius: "50%", background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#F7941D" }}>{a.prenom[0]}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 17, fontWeight: 700 }}>{a.prenom}</h3>
                  <p style={{ color: "#F7941D", fontSize: 13, fontWeight: 600 }}>{a.role}</p>
                  <p style={{ color: "#718096", fontSize: 12, marginTop: 4 }}>{a.specialite}</p>
                  <p style={{ color: "#A0AEC0", fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin style={{ height: 11, width: 11 }} /> {a.zone} · {a.exp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AVIS CLIENTS (DYNAMIQUES) ═══════════ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Avis <span style={{ color: "#F7941D" }}>Clients</span> Vérifiés
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[1,2,3,4,5].map((i) => <Star key={i} style={{ height: 20, width: 20, fill: "#F7941D", color: "#F7941D" }} />)}
              <span style={{ color: "#2D3748", fontWeight: 700, fontSize: 18, marginLeft: 8 }}>{avgNote}/5</span>
              <span style={{ color: "#A0AEC0", fontSize: 14, marginLeft: 4 }}>sur {avisDisplay.length} avis</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {avisDisplay.map((a) => (
              <div key={a.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 28 }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} style={{ height: 16, width: 16, fill: i < a.note ? "#F7941D" : "#E2E8F0", color: i < a.note ? "#F7941D" : "#E2E8F0" }} />)}</div>
                <p style={{ color: "#2D3748", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>&ldquo;{a.commentaire}&rdquo;</p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#38A169", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    <CheckCircle2 style={{ height: 16, width: 16 }} /> Avis vérifié
                  </div>
                  <p style={{ color: "#2D3748", fontWeight: 700, fontSize: 14 }}>{a.nom}</p>
                  <p style={{ color: "#A0AEC0", fontSize: 12 }}>{a.ville}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/temoignages" style={{ color: "#F7941D", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Voir tous les avis clients →</Link>
          </div>
        </div>
      </section>

      {/* ═══════ ZONES D'INTERVENTION ════════════════ */}
      <section style={{ background: "#F7FAFC", paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Zones d&apos;Intervention <span style={{ color: "#F7941D" }}>Val d&apos;Oise (95)</span>
            </h2>
            <p style={{ color: "#718096", fontSize: 15, marginTop: 8 }}>Nous intervenons en moins d&apos;1 heure dans ces communes et leurs alentours. Plus de 49 communes couvertes.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px 24px" }}>
            {[
              "Argenteuil", "Cergy", "Pontoise", "Sarcelles", "Garges-lès-Gonesse",
              "Franconville", "Bezons", "Ermont", "Goussainville", "Villiers-le-Bel",
              "Taverny", "Saint-Gratien", "Montmorency", "Eaubonne", "Enghien-les-Bains",
              "Cormeilles-en-Parisis", "Herblay", "Osny", "Deuil-la-Barre", "Soisy-sous-Montmorency",
              "Sannois", "Saint-Ouen-l'Aumône", "Montigny-lès-Cormeilles", "Beaumont-sur-Oise", "L'Isle-Adam",
            ].map((ville) => (
              <div key={ville} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                <span style={{ height: 8, width: 8, borderRadius: "50%", background: "#F7941D", flexShrink: 0 }} />
                <span style={{ color: "#718096", fontSize: 14 }}>{ville}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/zone-intervention" style={{ color: "#F7941D", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Voir toutes les communes couvertes →</Link>
          </div>
        </div>
      </section>

      {/* ═══════ GUIDES PRATIQUES (maillage vers /guide) ══════ */}
      <section style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow">
          <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: 22, fontWeight: 800, marginBottom: 20, textAlign: "center" }}>
            Guides <span style={{ color: "#F7941D" }}>Pratiques</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
            {[
              { href: "/guide/prix-remplacement-canalisation", label: "Prix remplacement canalisation 2026" },
              { href: "/guide/canalisation-bouchee-val-doise", label: "Canalisation bouchée : que faire ?" },
              { href: "/guide/chemisage-canalisation-sans-tranchee", label: "Chemisage sans tranchée : la solution" },
              { href: "/guide/qui-paye-remplacement-canalisation", label: "Qui paye le remplacement ?" },
              { href: "/guide/duree-vie-canalisation", label: "Durée de vie d'une canalisation" },
              { href: "/guide/canalisation-avant-achat-immobilier", label: "Vérification avant achat immobilier" },
            ].map((g) => (
              <Link key={g.href} href={g.href} style={{ display: "block", padding: 14, borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 500, color: "#F7941D", textDecoration: "none" }}>
                → {g.label}
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link href="/contact" style={{ color: "#718096", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Une question ? Contactez-nous →</Link>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ RICHE (SEO + RICH SNIPPET) ══════ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#2D3748", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800 }}>
              Questions <span style={{ color: "#F7941D" }}>Fréquentes</span>
            </h2>
            <p style={{ color: "#718096", fontSize: 15, marginTop: 8 }}>Les réponses à vos questions les plus courantes sur nos services de canalisation.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqData.map((faq, i) => (
              <details key={i} style={{ borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "16px 20px", fontSize: 15, fontWeight: 600, color: "#2D3748", listStyle: "none", background: "#fff" }}>
                  {faq.question}
                  <span style={{ color: "#A0AEC0", fontSize: 20, marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#718096", lineHeight: 1.8, background: "#fff" }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GARANTIES ═══════════════════════════ */}
      <section style={{ background: "#F7FAFC", paddingTop: 40, paddingBottom: 40, borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { icon: ShieldCheck, title: "Garantie décennale", desc: "Tous nos artisans sont assurés" },
              { icon: FileText, title: "Devis gratuit détaillé", desc: "Poste par poste, sans engagement" },
              { icon: Clock, title: "Intervention sous 1h", desc: "Départ immédiat, 7j/7" },
              { icon: Award, title: "Artisans certifiés RGE", desc: "Qualifiés et expérimentés" },
            ].map((g) => (
              <div key={g.title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <g.icon style={{ height: 20, width: 20, color: "#38A169", flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, color: "#2D3748", fontSize: 14 }}>{g.title}</p>
                  <p style={{ color: "#A0AEC0", fontSize: 12 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════════════════════════ */}
      <section style={{ background: "#F7941D", paddingTop: 56, paddingBottom: 56 }}>
        <div className="container-tight" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, marginBottom: 12 }}>
            Un problème de canalisation urgent ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, marginBottom: 32, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            Nos artisans canalisateurs du Val d&apos;Oise interviennent dans l&apos;heure. Diagnostic gratuit, devis transparent, garantie décennale.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <CallbackButton variant="secondary" style={{ fontSize: 20, padding: "16px 40px", gap: 12 }} />
            <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 50, textDecoration: "none", fontSize: 16 }}>
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

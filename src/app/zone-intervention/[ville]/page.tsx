import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, ShieldCheck, CheckCircle2, ChevronRight, Star, Pipette, Droplets, Search, Award, FileText, PhoneCall } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from "@/lib/cities";
import { longtails } from "@/lib/longtails";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface Props { params: Promise<{ ville: string }>; }

export async function generateStaticParams() { return getAllCitySlugs().map((ville) => ({ ville })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return {};
  return {
    title: `Réparation Canalisation ${city.name} (${city.postalCode}) | Intervention Urgente 7j/7`,
    description: `Artisan canalisateur à ${city.name} (${city.postalCode}). Remplacement de canalisation, réparation de fuite, diagnostic caméra. Intervention sous 1h, devis gratuit, garantie décennale. Consortium d'artisans du Val d'Oise.`,
    alternates: { canonical: `https://urgence-canalisation-valdoise.fr/zone-intervention/${city.slug}` },
  };
}

export default async function VillePage({ params }: Props) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  const nearby = getNearbyCities(city.slug, 8);
  const cityGuides = longtails.filter((l) => l.category === "ville" && l.slug.includes(city.slug));

  return (
    <div style={{ paddingBottom: 60 }}>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://urgence-canalisation-valdoise.fr" },
        { name: "Zone d'intervention", url: "https://urgence-canalisation-valdoise.fr/zone-intervention" },
        { name: city.name, url: `https://urgence-canalisation-valdoise.fr/zone-intervention/${city.slug}` },
      ]} />

      {/* ═══ HERO ═══ */}
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
            <Link href="/zone-intervention" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Zone d&apos;intervention</Link>
            <ChevronRight style={{ height: 14, width: 14 }} />
            <span style={{ color: "#fff" }}>{city.name}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, marginBottom: 12 }}>
            Réparation de Canalisation à {city.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <MapPin style={{ height: 18, width: 18 }} /> {city.postalCode} — Val d&apos;Oise (95) — Intervention sous 1h
          </p>
        </div>
      </section>

      {/* ═══ CONTENU SEO DENSE ═══ */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow">

          {/* Intro E-E-A-T */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>
            Votre artisan canalisateur de confiance à {city.name}
          </h2>
          <p style={{ color: "#718096", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            {city.description} Notre consortium d&apos;artisans canalisateurs intervient rapidement à <strong>{city.name} ({city.postalCode})</strong> pour tous vos problèmes de canalisation : remplacement complet ou partiel, réparation de fuite, diagnostic par caméra d&apos;inspection. Nous connaissons les spécificités du réseau d&apos;assainissement local et les contraintes techniques propres à votre commune.
          </p>
          <p style={{ color: "#718096", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            Nos artisans, implantés dans le Val d&apos;Oise depuis plus de 15 ans, maîtrisent les techniques de remplacement par tranchée ouverte et par chemisage sans tranchée (technique de réhabilitation in situ). Que votre canalisation soit en fonte, en grès, en PVC ou en plomb, nous disposons du matériel et de l&apos;expertise pour intervenir efficacement. Chaque intervention est couverte par notre <strong>garantie décennale</strong> et conforme aux DTU en vigueur (DTU 64.1, DTU 60.33).
          </p>

          {/* Badges confiance */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 48 }}>
            {[
              { icon: Clock, label: "Intervention sous 1h", desc: `Départ immédiat vers ${city.name}` },
              { icon: ShieldCheck, label: "Garantie décennale", desc: "Assurance RC Pro incluse" },
              { icon: PhoneCall, label: "Disponible 7j/7", desc: "8h à 20h, week-ends et fériés" },
              { icon: Award, label: "Artisans certifiés", desc: "RGE, Qualibat" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 12, background: "#F7FAFC", border: "1px solid #E2E8F0" }}>
                <item.icon style={{ height: 24, width: 24, color: "#F7941D", flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#2D3748" }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: "#A0AEC0" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 3 SERVICES DÉTAILLÉS */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#2D3748", marginBottom: 24 }}>
            Nos 3 expertises canalisation à {city.name}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
            {[
              {
                icon: Pipette, title: `Remplacement de canalisation à ${city.name}`,
                desc: `Votre canalisation est fissurée, percée ou vétuste ? Nos artisans réalisent le remplacement complet ou partiel de votre réseau d'évacuation à ${city.name}. Nous intervenons sur canalisations en fonte (immeubles anciens), PVC (pavillons), PEHD (réseaux enterrés) et plomb (mise en conformité obligatoire). Le remplacement inclut le terrassement, la pose de la nouvelle canalisation aux normes NF EN 1401, le raccordement au réseau public et la remise en état complète du terrain.`,
                price: "À partir de 80 €/ml"
              },
              {
                icon: Droplets, title: `Réparation de fuite à ${city.name}`,
                desc: `Une fuite sur votre canalisation peut causer des dégâts importants : infiltrations, affaissement de terrain, surconsommation d'eau. Nos techniciens localisent la fuite avec précision grâce à des techniques non destructives (écoute acoustique, corrélation, gaz traceur hydrogène-azote) puis effectuent la réparation ciblée : pose de manchon, collier de réparation, remplacement du tronçon ou reprise de joint. Intervention rapide à ${city.name} et communes limitrophes.`,
                price: "À partir de 150 €"
              },
              {
                icon: Search, title: `Diagnostic caméra à ${city.name}`,
                desc: `L'inspection par caméra endoscopique HD est indispensable pour évaluer l'état réel de vos canalisations à ${city.name}. Notre caméra motorisée parcourt l'intérieur du réseau et transmet des images en temps réel : fissures, affaissements, racines intrusives, contre-pentes, obstructions. Un rapport vidéo détaillé avec localisation GPS des anomalies vous est remis. Ce diagnostic est particulièrement recommandé avant un achat immobilier à ${city.name}.`,
                price: "À partir de 200 €"
              },
            ].map((service) => (
              <div key={service.title} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ height: 44, width: 44, borderRadius: 10, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <service.icon style={{ height: 22, width: 22, color: "#F7941D" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#2D3748" }}>{service.title}</h3>
                </div>
                <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>{service.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#F7941D", fontWeight: 700, fontSize: 14 }}>{service.price}</span>
                  <Link href="/services" style={{ color: "#F7941D", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Détails →</Link>
                </div>
              </div>
            ))}
          </div>

          {/* POURQUOI NOUS À [VILLE] */}
          <div style={{ background: "#FFFBF5", borderLeft: "4px solid #F7941D", borderRadius: 12, padding: "28px 32px", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>
              Pourquoi faire appel à notre consortium à {city.name} ?
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                `Artisans locaux implantés dans le Val d'Oise — nous connaissons ${city.name} et ses quartiers`,
                "Devis gratuit et transparent, poste par poste (terrassement, fourniture, pose, remise en état)",
                "Matériaux certifiés NF : tubes PVC CR8/CR16, PEHD PE100, fonte ductile",
                "Intervention conforme aux DTU 64.1 et DTU 60.33",
                "Garantie décennale et assurance RC professionnelle sur chaque chantier",
                "Agréé par AXA, Allianz, MAAF, GMF, MACIF — prise en charge assurance simplifiée",
                `Intervention en moins d'1 heure à ${city.name}, 7j/7 y compris week-ends et fériés`,
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#2D3748" }}>
                  <CheckCircle2 style={{ height: 16, width: 16, color: "#F7941D", marginTop: 3, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* PROCESSUS */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>
            Comment se déroule une intervention à {city.name} ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {[
              { num: "1", title: "Appel et diagnostic téléphonique", desc: `Vous appelez le 06 06 06 06 06. Un artisan canalisateur basé près de ${city.name} vous répond en moins de 2 minutes, évalue la situation et organise le déplacement.` },
              { num: "2", title: "Arrivée sur site et diagnostic", desc: `L'artisan arrive à ${city.name} sous 1 heure avec son matériel de diagnostic (caméra, détecteur de fuite). Il établit un diagnostic précis et vous remet un devis gratuit détaillé.` },
              { num: "3", title: "Intervention et réparation", desc: "Dès votre accord, les travaux commencent immédiatement. Matériaux aux normes NF, techniques professionnelles, chantier propre et sécurisé." },
              { num: "4", title: "Essais et garantie", desc: "Test d'étanchéité sous pression, remise en état du terrain, compte-rendu d'intervention. Garantie décennale sur tous les travaux de remplacement." },
            ].map((step) => (
              <div key={step.num} style={{ display: "flex", gap: 16, padding: 16, background: "#F7FAFC", borderRadius: 12 }}>
                <div style={{ height: 36, width: 36, borderRadius: "50%", background: "#F7941D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step.num}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#2D3748", marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: "#F7941D", borderRadius: 16, padding: "40px 32px", textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
              Besoin d&apos;un canalisateur à {city.name} ?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 24, maxWidth: 450, marginLeft: "auto", marginRight: "auto" }}>
              Nos artisans du Val d&apos;Oise interviennent sous 1 heure à {city.name}. Devis gratuit, garantie décennale.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              <CallbackButton variant="secondary" style={{ fontSize: 16, padding: "14px 28px" }} />
              <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 700, padding: "12px 28px", borderRadius: 50, textDecoration: "none", fontSize: 15 }}>
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* SPÉCIFICITÉS LOCALES — CONTENU UNIQUE PAR VILLE */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
            <div style={{ background: "#F7FAFC", borderRadius: 12, padding: 24, border: "1px solid #E2E8F0" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>
                <MapPin style={{ height: 16, width: 16, color: "#F7941D", display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                Quartiers desservis à {city.name}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {city.quartiers.map((q) => (
                  <li key={q} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#4A5568" }}>
                    <CheckCircle2 style={{ height: 14, width: 14, color: "#F7941D", flexShrink: 0 }} /> {q}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: "#A0AEC0", marginTop: 10 }}>
                {city.population.toLocaleString("fr-FR")} habitants — {city.postalCode}
              </p>
            </div>

            <div style={{ background: "#FFFBF5", borderRadius: 12, padding: 24, border: "1px solid #FEEBC8" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>
                ⚠️ Problèmes fréquents à {city.name}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {city.problemesFrequents.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#4A5568" }}>
                    <span style={{ color: "#F7941D", fontWeight: 700, flexShrink: 0 }}>•</span> {p}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 13, color: "#2D3748", fontWeight: 600, marginTop: 12, padding: "8px 12px", background: "rgba(247,148,29,0.1)", borderRadius: 8 }}>
                💡 {city.atout}
              </p>
            </div>
          </div>

          {/* GUIDES LIÉS À CETTE VILLE */}
          {cityGuides.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>
                <FileText style={{ height: 20, width: 20, color: "#F7941D", display: "inline", verticalAlign: "middle", marginRight: 8 }} />
                Guides pratiques pour {city.name}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cityGuides.map((guide) => (
                  <Link key={guide.slug} href={`/guide/${guide.slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", textDecoration: "none" }}>
                    <div style={{ height: 40, width: 40, borderRadius: 8, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FileText style={{ height: 18, width: 18, color: "#F7941D" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: "#2D3748" }}>{guide.h1}</p>
                      <p style={{ fontSize: 12, color: "#A0AEC0", marginTop: 2 }}>{guide.intro.slice(0, 100)}…</p>
                    </div>
                    <ChevronRight style={{ height: 16, width: 16, color: "#A0AEC0", marginLeft: "auto", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* VILLES PROCHES — MAILLAGE INTERNE */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>
            Nous intervenons aussi à proximité de {city.name}
          </h2>
          <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            Notre consortium couvre l&apos;ensemble du Val d&apos;Oise. Si vous êtes dans une commune voisine de {city.name}, nos artisans peuvent également intervenir rapidement chez vous.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
            {nearby.map((c) => (
              <Link key={c.slug} href={`/zone-intervention/${c.slug}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 500, color: "#2D3748", textDecoration: "none" }}>
                <MapPin style={{ height: 14, width: 14, color: "#F7941D" }} /> {c.name} ({c.postalCode})
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Link href="/zone-intervention" style={{ color: "#F7941D", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Voir toutes les communes couvertes →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

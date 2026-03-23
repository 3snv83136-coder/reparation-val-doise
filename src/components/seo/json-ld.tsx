/* ═══════════════════════════════════════════════
   JSON-LD Schema.org — Rich Snippets
   ═══════════════════════════════════════════════ */

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Urgence Canalisation Val d'Oise",
    description: "Consortium d'artisans canalisateurs du Val d'Oise (95). Remplacement de canalisation en urgence, réparation de fuite, diagnostic caméra. Intervention rapide 7j/7.",
    url: "https://www.reparation-canalisation.fr",
    telephone: "+33606060606",
    email: "contact@urgence-canalisation.fr",
    areaServed: {
      "@type": "State",
      name: "Val-d'Oise",
      sameAs: "https://fr.wikipedia.org/wiki/Val-d%27Oise",
    },
    geo: { "@type": "GeoCoordinates", latitude: 49.0354, longitude: 2.0678 },
    address: { "@type": "PostalAddress", addressLocality: "Cergy", postalCode: "95000", addressRegion: "Île-de-France", addressCountry: "FR" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "20:00" },
    ],
    priceRange: "€€",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de canalisation",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remplacement de canalisation", description: "Remplacement complet ou partiel de canalisations défectueuses" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réparation de fuite", description: "Détection et réparation de fuites sur canalisations" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diagnostic caméra", description: "Inspection vidéo des canalisations par caméra HD" } },
      ],
    },
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ServiceJsonLd({ services }: { services: { name: string; description: string; price: string }[] }) {
  const data = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    provider: { "@type": "Plumber", name: "Urgence Canalisation Val d'Oise", telephone: "+33606060606" },
    areaServed: { "@type": "State", name: "Val-d'Oise" },
    offers: { "@type": "Offer", price: s.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
  }));
  return <>{data.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}</>;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function AggregateRatingJsonLd({ rating, count }: { rating: string; count: number }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Urgence Canalisation Val d'Oise",
    aggregateRating: { "@type": "AggregateRating", ratingValue: rating, reviewCount: String(count), bestRating: "5" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

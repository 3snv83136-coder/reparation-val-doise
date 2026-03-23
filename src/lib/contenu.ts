import { prisma } from "./prisma";

const defaults: Record<string, string> = {
  "hero_titre": "Remplacement de canalisation express : intervention urgente en Val d'Oise (95)",
  "hero_sous_titre": "Consortium d'artisans locaux du 95. On connait vos rues, on connait vos reseaux. Pas une plateforme — de vrais artisans qui habitent dans le Val d'Oise.",
  "hero_cta_principal": "APPELER MAINTENANT",
  "hero_cta_secondaire": "Prendre RDV en ligne",
  "services_titre": "Services de canalisation",
  "services_description": "Intervention professionnelle et rapide pour tous vos problemes de canalisation dans le Val d'Oise.",
  "processus_titre": "Comment ca marche ?",
  "artisans_titre": "Nos artisans du 95",
  "artisans_description": "Un collectif d'artisans locaux. Nos gars habitent dans le Val d'Oise — on est vos voisins.",
  "cta_final_titre": "Un probleme de canalisation ?",
  "cta_final_sous_titre": "On arrive.",
};

export async function getContenu(cle: string): Promise<string> {
  const contenu = await prisma.contenuPage.findUnique({ where: { cle } });
  return contenu?.valeur || defaults[cle] || "";
}

export async function getAllContenu(pageSlug: string) {
  const dbContenu = await prisma.contenuPage.findMany({ where: { pageSlug } });
  const result: Record<string, string> = {};

  // Fill with defaults first
  for (const [key, val] of Object.entries(defaults)) {
    if (key.startsWith(pageSlug + "_") || pageSlug === "all") {
      result[key] = val;
    }
  }

  // Override with DB values
  for (const c of dbContenu) {
    result[c.cle] = c.valeur;
  }

  return result;
}

export async function updateContenu(cle: string, valeur: string, pageSlug: string) {
  await prisma.contenuPage.upsert({
    where: { cle },
    update: { valeur },
    create: { cle, valeur, pageSlug },
  });
}

export function getDefaults() {
  return defaults;
}

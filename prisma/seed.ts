import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin par defaut
  await prisma.admin.upsert({
    where: { email: "m@gmail.com" },
    update: { motDePasse: hashSync("MN3110", 10) },
    create: {
      email: "m@gmail.com",
      motDePasse: hashSync("MN3110", 10),
      nom: "Administrateur",
    },
  });

  // Parametres par defaut
  await prisma.parametres.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      nomEntreprise: "Urgence Canalisation Val d'Oise",
      telephone: "+33600000000",
      email: "contact@urgence-canalisation.fr",
      adresse: "Val d'Oise (95)",
    },
  });

  // Avis exemples
  const avis = [
    { nom: "Marie L.", ville: "Argenteuil", note: 5, commentaire: "Intervention tres rapide suite a une fuite importante. L'artisan etait la en 45 minutes. Travail propre et professionnel." },
    { nom: "Jean-Pierre D.", ville: "Cergy", note: 5, commentaire: "Remplacement complet de la canalisation d'evacuation. Equipe serieuse, devis respecte, chantier propre. Je recommande." },
    { nom: "Sophie M.", ville: "Enghien-les-Bains", note: 5, commentaire: "Debouchage de canalisation en urgence un dimanche. Tres reactifs et prix correct. Merci !" },
    { nom: "Thomas R.", ville: "Pontoise", note: 4, commentaire: "Diagnostic camera tres utile pour identifier le probleme. Intervention de remplacement planifiee rapidement." },
    { nom: "Nathalie B.", ville: "Franconville", note: 5, commentaire: "Fuite dans le jardin, ils ont creuse, remplace et tout remis en etat. Rien a redire." },
  ];

  for (const a of avis) {
    await prisma.avis.create({ data: a });
  }

  console.log("Seed termine !");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

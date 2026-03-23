import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Auto-increment devis number
    const params = await prisma.parametres.findUnique({ where: { id: "default" } });
    const compteur = (params?.numeroDevisCompteur || 0) + 1;
    const numero = `DEV-${new Date().getFullYear()}-${String(compteur).padStart(3, "0")}`;

    await prisma.parametres.update({
      where: { id: "default" },
      data: { numeroDevisCompteur: compteur },
    });

    const devis = await prisma.devis.create({
      data: {
        numero,
        dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
        clientNom: body.clientNom,
        clientAdresse: body.clientAdresse,
        clientTelephone: body.clientTelephone,
        clientEmail: body.clientEmail || null,
        adresseChantier: body.adresseChantier,
        objetTravaux: body.objetTravaux,
        delaiExecution: body.delaiExecution || null,
        conditionsPaiement: body.conditionsPaiement || null,
        tauxTVA: body.tauxTVA || 10,
        remiseType: body.remiseType || null,
        remiseMontant: body.remiseMontant || null,
        totalHT: body.totalHT || 0,
        totalTVA: body.totalTVA || 0,
        totalTTC: body.totalTTC || 0,
        postes: {
          create: (body.postes || []).map((poste: { type: string; intituleLibre?: string; numero: number; sousTotalHT: number; lignes: { designation: string; unite: string; quantite: number; prixUnitaireHT: number; totalHT: number }[] }) => ({
            type: poste.type,
            intituleLibre: poste.intituleLibre || null,
            numero: poste.numero,
            sousTotalHT: poste.sousTotalHT,
            lignes: {
              create: poste.lignes.map((ligne: { designation: string; unite: string; quantite: number; prixUnitaireHT: number; totalHT: number }) => ({
                designation: ligne.designation,
                unite: ligne.unite,
                quantite: ligne.quantite,
                prixUnitaireHT: ligne.prixUnitaireHT,
                totalHT: ligne.totalHT,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, devisId: devis.id, numero });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

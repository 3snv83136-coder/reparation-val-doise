import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReport } from "@/lib/ai-report";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interventionId } = body;

    if (!interventionId) {
      return NextResponse.json({ error: "ID intervention requis" }, { status: 400 });
    }

    const intervention = await prisma.intervention.findUnique({
      where: { id: interventionId },
    });

    if (!intervention) {
      return NextResponse.json({ error: "Intervention non trouvee" }, { status: 404 });
    }

    // Get API key from settings
    const params = await prisma.parametres.findUnique({ where: { id: "default" } });
    const apiKey = params?.cleApiClaude || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Cle API Claude non configuree. Allez dans Parametres." }, { status: 400 });
    }

    const rapport = await generateReport(
      {
        typeIntervention: intervention.typeIntervention,
        dateIntervention: intervention.dateIntervention.toISOString().split("T")[0],
        duree: intervention.duree || undefined,
        nomClient: intervention.nomClient,
        adresseClient: intervention.adresseClient,
        etatAvant: intervention.etatAvant || undefined,
        etatApres: intervention.etatApres || undefined,
        materiauxUtilises: intervention.materiauxUtilises || undefined,
        observations: intervention.observations || undefined,
        notesLibres: intervention.notesLibres || undefined,
      },
      apiKey
    );

    // Save report
    await prisma.intervention.update({
      where: { id: interventionId },
      data: { rapportGenere: rapport, statut: "genere" },
    });

    return NextResponse.json({ success: true, rapport });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

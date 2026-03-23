import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { interventionSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = interventionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Donnees invalides", details: result.error.flatten() }, { status: 400 });
    }

    const data = result.data;

    const intervention = await prisma.intervention.create({
      data: {
        typeIntervention: data.typeIntervention,
        dateIntervention: new Date(data.dateIntervention),
        duree: data.duree || null,
        adresseClient: data.adresseClient,
        nomClient: data.nomClient,
        telephoneClient: data.telephoneClient,
        etatAvant: data.etatAvant || null,
        etatApres: data.etatApres || null,
        materiauxUtilises: data.materiauxUtilises || null,
        observations: data.observations || null,
        notesLibres: data.notesLibres || null,
      },
    });

    return NextResponse.json({ success: true, interventionId: intervention.id });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

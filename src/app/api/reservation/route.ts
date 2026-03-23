import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    const reservation = await prisma.reservation.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        telephone: data.telephone,
        email: data.email,
        adresse: data.adresse,
        codePostal: data.codePostal,
        ville: data.ville,
        typeService: data.typeService,
        niveauUrgence: data.niveauUrgence,
        dateRdv: new Date(data.dateRdv),
        creneauHoraire: data.creneauHoraire,
        description: data.description,
      },
    });

    return NextResponse.json({ success: true, reservationId: reservation.id });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

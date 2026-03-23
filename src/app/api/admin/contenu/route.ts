import { NextRequest, NextResponse } from "next/server";
import { updateContenu, getDefaults } from "@/lib/contenu";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const all = await prisma.contenuPage.findMany({ orderBy: { cle: "asc" } });
  const defaults = getDefaults();
  return NextResponse.json({ contenu: all, defaults });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { cle, valeur, pageSlug } = body;

    if (!cle || valeur === undefined) {
      return NextResponse.json({ error: "Cle et valeur requises" }, { status: 400 });
    }

    await updateContenu(cle, valeur, pageSlug || "general");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

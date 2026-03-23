import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Donnees invalides" }, { status: 400 });
    }

    const { email, motDePasse } = result.data;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !verifyPassword(motDePasse, admin.motDePasse)) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    await createSession(admin.id);

    return NextResponse.json({ success: true, nom: admin.nom });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

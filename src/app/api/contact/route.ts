import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { website, ...data } = result.data;

    // Honeypot check
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }); // Silently ignore spam
    }

    await prisma.contactMessage.create({
      data: {
        nom: data.nom,
        email: data.email,
        telephone: data.telephone || null,
        sujet: data.sujet,
        message: data.message,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

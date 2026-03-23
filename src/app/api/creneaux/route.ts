import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTimeSlots } from "@/lib/time-slots";

export async function GET(request: NextRequest) {
  const dateStr = request.nextUrl.searchParams.get("date");
  if (!dateStr) {
    return NextResponse.json({ error: "Date requise" }, { status: 400 });
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }

  // Get existing bookings for that date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await prisma.reservation.findMany({
    where: {
      dateRdv: { gte: startOfDay, lte: endOfDay },
      statut: { not: "annule" },
    },
    select: { creneauHoraire: true },
  });

  const existingSlots = bookings.map((b) => b.creneauHoraire);
  const slots = generateTimeSlots(date, existingSlots);

  return NextResponse.json({ slots });
}

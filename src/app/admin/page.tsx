import { prisma } from "@/lib/prisma";
import { CalendarCheck, MessageSquare, Wrench, FileSpreadsheet, Clock } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [reservations, messages, interventions, devis, messagesNonLus, rdvAujourdhui] = await Promise.all([
    prisma.reservation.count(),
    prisma.contactMessage.count(),
    prisma.intervention.count(),
    prisma.devis.count(),
    prisma.contactMessage.count({ where: { lu: false } }),
    prisma.reservation.count({
      where: {
        dateRdv: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
  ]);
  return { reservations, messages, interventions, devis, messagesNonLus, rdvAujourdhui };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Réservations", value: stats.reservations, icon: CalendarCheck, bg: "#FFF7ED", color: "#F7941D", href: "/admin/reservations" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, bg: "#F0FFF4", color: "#38A169", href: "/admin/messages", badge: stats.messagesNonLus },
    { label: "Interventions", value: stats.interventions, icon: Wrench, bg: "#EFF6FF", color: "#3B82F6", href: "/admin/interventions" },
    { label: "Devis", value: stats.devis, icon: FileSpreadsheet, bg: "#FFFBEB", color: "#D97706", href: "/admin/devis" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "#2D3748" }}>Dashboard</h1>
        <p style={{ color: "#718096", fontSize: 15, marginTop: 4 }}>Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Alert banner */}
      {(stats.messagesNonLus > 0 || stats.rdvAujourdhui > 0) && (
        <div style={{ background: "#FFF7ED", border: "1px solid rgba(247,148,29,0.2)", borderRadius: 12, padding: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <Clock style={{ height: 20, width: 20, color: "#F7941D", flexShrink: 0 }} />
          <div style={{ fontSize: 14 }}>
            {stats.rdvAujourdhui > 0 && <span style={{ fontWeight: 700, color: "#2D3748" }}>{stats.rdvAujourdhui} RDV aujourd&apos;hui. </span>}
            {stats.messagesNonLus > 0 && <span style={{ color: "#718096" }}>{stats.messagesNonLus} message(s) non lu(s).</span>}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 32 }}>
        {cards.map((card) => (
          <Link key={card.label} href={card.href} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 24, textDecoration: "none", display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ height: 48, width: 48, borderRadius: 12, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon style={{ height: 24, width: 24, color: card.color }} />
              </div>
              {card.badge !== undefined && card.badge > 0 && (
                <span style={{ height: 24, minWidth: 24, borderRadius: 50, background: "#F7941D", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                  {card.badge}
                </span>
              )}
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "#2D3748" }}>{card.value}</p>
            <p style={{ color: "#718096", fontSize: 14, marginTop: 4 }}>{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#2D3748", fontSize: 18, marginBottom: 16 }}>Actions rapides</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { href: "/admin/interventions/nouveau", icon: Wrench, label: "Nouvelle intervention" },
            { href: "/admin/devis/nouveau", icon: FileSpreadsheet, label: "Nouveau devis" },
            { href: "/admin/messages", icon: MessageSquare, label: "Voir les messages" },
          ].map((action) => (
            <Link key={action.href} href={action.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, background: "#F7FAFC", fontSize: 14, fontWeight: 500, color: "#2D3748", textDecoration: "none" }}>
              <action.icon style={{ height: 16, width: 16, color: "#F7941D" }} /> {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

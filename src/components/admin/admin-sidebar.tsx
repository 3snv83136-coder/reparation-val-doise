"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, CalendarCheck, MessageSquare, Wrench,
  Star, FileSpreadsheet, FileText, BarChart3, Settings,
  LogOut, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/reservations", icon: CalendarCheck, label: "Réservations" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/interventions", icon: Wrench, label: "Interventions" },
  { href: "/admin/avis", icon: Star, label: "Avis clients" },
  { href: "/admin/devis", icon: FileSpreadsheet, label: "Devis" },
  { href: "/admin/contenu", icon: FileText, label: "Contenu pages" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/parametres", icon: Settings, label: "Paramètres" },
];

interface AdminSidebarProps { adminName: string; }

export function AdminSidebar({ adminName }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebar = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1A202C", color: "#fff" }}>
      {/* Header */}
      <div style={{ padding: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ height: 40, width: 40, background: "#F7941D", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: 16 }}>RC</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Administration</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{adminName}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all 0.15s",
                background: active ? "#F7941D" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              <item.icon style={{ height: 20, width: 20, flexShrink: 0 }} />
              <span>{item.label}</span>
              {active && <ChevronRight style={{ height: 16, width: 16, marginLeft: "auto" }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)", background: "transparent", border: "none", cursor: "pointer" }}
        >
          <LogOut style={{ height: 20, width: 20 }} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden"
        style={{ position: "fixed", top: 16, left: 16, zIndex: 50, height: 40, width: 40, background: "#1A202C", color: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        aria-label="Menu admin"
      >
        <Menu style={{ height: 20, width: 20 }} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setOpen(false)} />
          <div style={{ position: "relative", width: 256, height: "100%" }}>
            {sidebar}
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 16, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}>
              <X style={{ height: 20, width: 20 }} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block" style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 256, zIndex: 40 }}>
        {sidebar}
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export function CtaBanner() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "#fff", boxShadow: "0 -2px 12px rgba(0,0,0,0.1)", borderTop: "1px solid #E2E8F0" }} className="lg:hidden">
      <div style={{ display: "flex", gap: 8, padding: "8px 12px" }}>
        <Link href="/reservation" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#2D3748", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 0", borderRadius: 50, textDecoration: "none" }}>
          <CalendarCheck style={{ height: 16, width: 16 }} /> Devis gratuit
        </Link>
      </div>
    </div>
  );
}

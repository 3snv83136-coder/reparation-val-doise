"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ height: 42, width: 42, borderRadius: 10, background: "#F7941D", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" style={{ height: 22, width: 22, color: "#fff" }} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5z"/><path d="M12 12v10"/><path d="M12 12L4 7"/><path d="M12 12l8-5"/></svg>
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ fontWeight: 800, color: "#2D3748", fontSize: 18, display: "block" }}>RÉPARATION</span>
            <span style={{ fontWeight: 800, fontSize: 18, display: "block" }}>
              <span style={{ color: "#F7941D" }}>CANALISATION</span><span style={{ color: "#2D3748" }}>.fr</span>
            </span>
          </div>
        </Link>

        {/* CTA tel */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CallbackButton
            variant="primary"
            className="hidden lg:flex"
            style={{ padding: "8px 18px", fontSize: 13, boxShadow: "0 2px 8px rgba(247,148,29,0.25)", gap: 8 }}
          />
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ height: 44, width: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }} aria-label="Menu">
            {menuOpen ? <X style={{ height: 22, width: 22, color: "#2D3748" }} /> : <Menu style={{ height: 22, width: 22, color: "#2D3748" }} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid #E2E8F0", background: "#fff" }}>
          <div className="container-main" style={{ padding: "16px 24px" }}>
            {[
              { href: "/services", label: "Nos services" },
              { href: "/zone-intervention", label: "Zone d'intervention" },
              { href: "/temoignages", label: "Avis clients" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 16px", fontSize: 15, fontWeight: 600, color: "#2D3748", textDecoration: "none", borderRadius: 8 }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

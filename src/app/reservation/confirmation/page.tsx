import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";

export default function ConfirmationPage() {
  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container-tight" style={{ textAlign: "center" }}>
        <div style={{ height: 80, width: 80, borderRadius: "50%", background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <CheckCircle2 style={{ height: 40, width: 40, color: "#38A169" }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#2D3748", marginBottom: 16 }}>RDV confirmé !</h1>
        <p style={{ color: "#718096", fontSize: 17, marginBottom: 8 }}>Votre demande a été enregistrée avec succès.</p>
        <p style={{ color: "#2D3748", fontWeight: 700, fontSize: 18, marginBottom: 32 }}>Nous vous rappelons dans les 30 minutes.</p>

        <div style={{ background: "#FFF7ED", border: "1px solid rgba(247,148,29,0.2)", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#718096", marginBottom: 12 }}>
            <strong style={{ color: "#2D3748" }}>Besoin d&apos;un rappel supplémentaire ?</strong><br />
            Demandez à être rappelé par un expert dès maintenant :
          </p>
          <CallbackButton variant="primary" style={{ fontSize: 15, padding: "12px 28px", boxShadow: "none" }} />
        </div>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#718096", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          Retour à l&apos;accueil <ArrowRight style={{ height: 14, width: 14 }} />
        </Link>
      </div>
    </div>
  );
}

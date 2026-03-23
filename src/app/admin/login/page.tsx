"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Erreur de connexion"); return; }
      router.push("/admin");
      router.refresh();
    } catch { setError("Erreur de connexion au serveur"); }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ height: 56, width: 56, background: "#F7941D", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>RC</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#2D3748" }}>Administration</h1>
          <p style={{ color: "#718096", fontSize: 14, marginTop: 4 }}>Réparation Canalisation Val d&apos;Oise</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", borderRadius: 8, padding: 16, marginBottom: 24, fontSize: 14 }}>
              <AlertCircle style={{ height: 20, width: 20, flexShrink: 0 }} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Input label="Email" id="email" type="email" placeholder="admin@reparation-canalisation.fr" error={errors.email?.message} {...register("email")} />
            <Input label="Mot de passe" id="motDePasse" type="password" placeholder="••••••••" error={errors.motDePasse?.message} {...register("motDePasse")} />
            <button type="submit" disabled={isSubmitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#F7941D", color: "#fff", fontWeight: 700, padding: "14px 0", borderRadius: 50, fontSize: 15, border: "none", cursor: "pointer" }}>
              {isSubmitting && <Loader2 style={{ height: 18, width: 18 }} className="animate-spin" />}
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

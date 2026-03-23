"use client";

// metadata set via generateMetadata in a separate file or layout
// export const metadata = { title: "Contact", description: "..." } — not possible in "use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { Input, Textarea } from "@/components/ui/input";
import { PhoneCall, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { sujet: "devis" },
  });

  async function onSubmit(data: ContactInput) {
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Erreur");
      setSubmitted(true);
    } catch { setError("Une erreur est survenue. Veuillez reessayer ou nous appeler directement."); }
  }

  if (submitted) {
    return (
      <div style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-tight" style={{ textAlign: "center" }}>
          <CheckCircle style={{ height: 64, width: 64, color: "#38A169", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#2D3748", marginBottom: 12 }}>Message envoye !</h1>
          <p style={{ color: "#718096", fontSize: 16 }}>Nous avons bien recu votre message et vous repondrons dans les plus brefs delais.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <section style={{ background: "#F7941D", paddingTop: 48, paddingBottom: 48 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 12 }}>Contactez-nous</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17 }}>
            Une question ? Besoin d&apos;un devis ? Nos artisans du Val d&apos;Oise vous repondent rapidement.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            {/* Infos contact */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#2D3748", marginBottom: 24 }}>Nos coordonnees</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: PhoneCall, label: "Rappel immédiat", value: "Disponible 7j/7 — Réponse en 30 min" },
                  { icon: Mail, label: "Email", value: "contact@urgence-canalisation.fr" },
                  { icon: MapPin, label: "Zone", value: "Val d'Oise (95)" },
                  { icon: Clock, label: "Horaires", value: "7j/7 - 8h a 20h" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: 12, background: "#F7FAFC", border: "1px solid #E2E8F0" }}>
                    <item.icon style={{ height: 24, width: 24, color: "#F7941D", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: "#2D3748" }}>{item.label}</p>
                      <p style={{ fontSize: 13, color: "#718096" }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div style={{ gridColumn: "span 1" }}>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#2D3748", marginBottom: 24 }}>Envoyez-nous un message</h2>

                {error && <div style={{ marginBottom: 16, padding: 16, borderRadius: 12, background: "#FEF2F2", color: "#DC2626", fontSize: 14 }}>{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="hidden" aria-hidden="true"><input {...register("website")} tabIndex={-1} autoComplete="off" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    <Input label="Nom *" id="nom" placeholder="Votre nom" error={errors.nom?.message} {...register("nom")} />
                    <Input label="Email *" id="email" type="email" placeholder="votre@email.fr" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    <Input label="Telephone" id="telephone" type="tel" placeholder="06 00 00 00 00" error={errors.telephone?.message} {...register("telephone")} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label htmlFor="sujet" style={{ fontSize: 14, fontWeight: 500, color: "#2D3748" }}>Sujet *</label>
                      <select id="sujet" {...register("sujet")} style={{ height: 44, width: "100%", borderRadius: 12, border: "1px solid #E2E8F0", padding: "0 16px", fontSize: 14, background: "#fff" }}>
                        <option value="devis">Demande de devis</option>
                        <option value="question">Question</option>
                        <option value="reclamation">Reclamation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <Textarea label="Message *" id="message" placeholder="Decrivez votre demande..." error={errors.message?.message} {...register("message")} />
                  <button type="submit" disabled={isSubmitting} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#F7941D", color: "#fff", fontWeight: 700, padding: "14px 28px", borderRadius: 50, fontSize: 15, border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
                    {isSubmitting ? "Envoi..." : "Envoyer le message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section style={{ paddingTop: 32, paddingBottom: 48, borderTop: "1px solid #E2E8F0" }}>
        <div className="container-narrow" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <a href="/" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Accueil</a>
          <a href="/services" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Nos services</a>
          <a href="/reservation" style={{ padding: "10px 20px", borderRadius: 50, background: "#F7941D", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Prendre rendez-vous</a>
          <a href="/zone-intervention" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Zone d&apos;intervention</a>
          <a href="/temoignages" style={{ padding: "10px 20px", borderRadius: 50, border: "1px solid #E2E8F0", fontSize: 14, fontWeight: 600, color: "#2D3748", textDecoration: "none" }}>Avis clients</a>
        </div>
      </section>
    </div>
  );
}

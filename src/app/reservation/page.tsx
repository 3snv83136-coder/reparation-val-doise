"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/input";
import {
  PhoneCall, Pipette, Droplets, Wrench, Search,
  AlertTriangle, Clock, CalendarCheck, ChevronRight, ChevronLeft,
  User, CheckCircle2, Loader2
} from "lucide-react";
import { CallbackButton } from "@/components/ui/callback-button";
import { getNextAvailableDates } from "@/lib/time-slots";
import type { TimeSlot } from "@/lib/time-slots";

const serviceTypes = [
  { value: "remplacement_canalisation", label: "Remplacement canalisation", icon: Pipette },
  { value: "reparation_fuite", label: "Reparation de fuite", icon: Droplets },
  { value: "diagnostic", label: "Diagnostic camera", icon: Search },
];

const urgencyLevels = [
  { value: "tres_urgent", label: "Tres urgent", desc: "Fuite active, refoulement", bg: "#FEF2F2", border: "#FCA5A5", color: "#DC2626" },
  { value: "urgent", label: "Urgent", desc: "Probleme a traiter rapidement", bg: "#FFF7ED", border: "#F7941D", color: "#F7941D" },
  { value: "planifie", label: "Planifie", desc: "Intervention programmee", bg: "#EFF6FF", border: "#60A5FA", color: "#2563EB" },
];

const steps = [
  { num: 1, label: "Service", icon: Wrench },
  { num: 2, label: "Date & heure", icon: CalendarCheck },
  { num: 3, label: "Coordonnees", icon: User },
];

export default function ReservationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const availableDates = getNextAvailableDates(14);

  const [form, setForm] = useState({
    typeService: "", niveauUrgence: "urgent", description: "",
    dateRdv: "", creneauHoraire: "",
    nom: "", prenom: "", telephone: "", email: "", adresse: "", codePostal: "", ville: "",
  });

  function update(field: string, value: string) { setForm((prev) => ({ ...prev, [field]: value })); }

  useEffect(() => {
    if (!form.dateRdv) return;
    setSlotsLoading(true);
    fetch(`/api/creneaux?date=${form.dateRdv}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [form.dateRdv]);

  function canNext(): boolean {
    if (step === 1) return !!form.typeService && !!form.niveauUrgence && form.description.length >= 10;
    if (step === 2) return !!form.dateRdv && !!form.creneauHoraire;
    return true;
  }

  async function handleSubmit() {
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/reservation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Erreur"); setLoading(false); return; }
      router.push(`/reservation/confirmation?id=${json.reservationId}`);
    } catch { setError("Erreur de connexion"); setLoading(false); }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
  }

  const btnStyle = (active: boolean, activeColor = "#F7941D") => ({
    padding: "16px 20px", borderRadius: 12, border: `2px solid ${active ? activeColor : "#E2E8F0"}`,
    background: active ? `${activeColor}10` : "#fff", cursor: "pointer" as const, textAlign: "left" as const, transition: "all 0.15s",
  });

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <section style={{ background: "#F7941D", paddingTop: 40, paddingBottom: 40 }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, marginBottom: 8 }}>Prendre rendez-vous</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>Réponse en moins de 30 minutes — Devis gratuit sur place</p>
        </div>
      </section>

      {/* Stepper */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container-narrow" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                <div style={{ height: 40, width: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0,
                  background: step > s.num ? "#38A169" : step === s.num ? "#F7941D" : "#F7FAFC",
                  color: step >= s.num ? "#fff" : "#A0AEC0",
                }}>
                  {step > s.num ? <CheckCircle2 style={{ height: 20, width: 20 }} /> : s.num}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: step >= s.num ? "#2D3748" : "#A0AEC0" }}>{s.label}</span>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 2, marginLeft: 8, marginRight: 8, background: step > s.num ? "#38A169" : "#E2E8F0" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container-narrow">
          {error && (
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12, background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", borderRadius: 12, padding: 16, fontSize: 14 }}>
              <AlertTriangle style={{ height: 20, width: 20, flexShrink: 0 }} /> {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#2D3748", marginBottom: 8 }}>Type d&apos;intervention</h2>
                <p style={{ color: "#718096", fontSize: 15 }}>Selectionnez le service dont vous avez besoin</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {serviceTypes.map((s) => (
                  <button key={s.value} type="button" onClick={() => update("typeService", s.value)} style={btnStyle(form.typeService === s.value)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <s.icon style={{ height: 28, width: 28, color: form.typeService === s.value ? "#F7941D" : "#A0AEC0" }} />
                      <span style={{ fontWeight: 700, color: "#2D3748", fontSize: 14 }}>{s.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <h3 style={{ fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>Niveau d&apos;urgence</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                  {urgencyLevels.map((u) => (
                    <button key={u.value} type="button" onClick={() => update("niveauUrgence", u.value)}
                      style={{ ...btnStyle(form.niveauUrgence === u.value, u.border), background: form.niveauUrgence === u.value ? u.bg : "#fff" }}>
                      <p style={{ fontWeight: 700, fontSize: 14, color: form.niveauUrgence === u.value ? u.color : "#2D3748" }}>{u.label}</p>
                      <p style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>{u.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Textarea label="Decrivez votre probleme *" id="description" placeholder="Ex: Fuite visible dans le jardin..." value={form.description} onChange={(e) => update("description", e.target.value)}
                error={form.description.length > 0 && form.description.length < 10 ? "Minimum 10 caracteres" : undefined} />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#2D3748", marginBottom: 8 }}>Date et créneau horaire</h2>
                <p style={{ color: "#718096", fontSize: 15 }}>Choisissez le moment qui vous convient</p>
              </div>
              <div>
                <h3 style={{ fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>Date</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
                  {availableDates.map((d) => (
                    <button key={d} type="button" onClick={() => { update("dateRdv", d); update("creneauHoraire", ""); }}
                      style={{ ...btnStyle(form.dateRdv === d), textAlign: "center" as const, padding: 12, fontSize: 13 }}>
                      {formatDate(d)}
                    </button>
                  ))}
                </div>
              </div>

              {form.dateRdv && (
                <div>
                  <h3 style={{ fontWeight: 700, color: "#2D3748", marginBottom: 12 }}>Créneau horaire</h3>
                  {slotsLoading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32, color: "#A0AEC0" }}>
                      <Loader2 style={{ height: 24, width: 24, marginRight: 8 }} className="animate-spin" /> Chargement...
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
                      {slots.map((slot) => (
                        <button key={slot.value} type="button" disabled={!slot.available} onClick={() => update("creneauHoraire", slot.value)}
                          style={{ ...btnStyle(form.creneauHoraire === slot.value), textAlign: "center" as const, padding: 12, fontSize: 13,
                            opacity: slot.available ? 1 : 0.4, cursor: slot.available ? "pointer" : "not-allowed",
                            textDecoration: slot.available ? "none" : "line-through" }}>
                          <Clock style={{ height: 14, width: 14, margin: "0 auto 4px", color: "#A0AEC0" }} />
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={{ background: "#FFF7ED", border: "1px solid rgba(247,148,29,0.2)", borderRadius: 12, padding: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <PhoneCall style={{ height: 20, width: 20, color: "#F7941D", flexShrink: 0, marginTop: 2 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
                    <strong style={{ color: "#2D3748" }}>Urgence immédiate ?</strong> Obtenez un rappel expert.
                  </p>
                  <CallbackButton variant="primary" style={{ fontSize: 13, padding: "8px 16px", boxShadow: "none" }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#2D3748", marginBottom: 8 }}>Vos coordonnées</h2>
                <p style={{ color: "#718096", fontSize: 15 }}>Pour vous contacter et intervenir chez vous</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <Input label="Prenom *" id="prenom" placeholder="Votre prenom" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} />
                <Input label="Nom *" id="nom" placeholder="Votre nom" value={form.nom} onChange={(e) => update("nom", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <Input label="Telephone *" id="telephone" type="tel" placeholder="06 00 00 00 00" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} />
                <Input label="Email *" id="email" type="email" placeholder="votre@email.fr" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <Input label="Adresse d'intervention *" id="adresse" placeholder="12 rue de la Paix" value={form.adresse} onChange={(e) => update("adresse", e.target.value)} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <Input label="Code postal *" id="codePostal" placeholder="95000" value={form.codePostal} onChange={(e) => update("codePostal", e.target.value)} />
                <Input label="Ville *" id="ville" placeholder="Cergy" value={form.ville} onChange={(e) => update("ville", e.target.value)} />
              </div>

              <div style={{ background: "#F7FAFC", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0" }}>
                <h3 style={{ fontWeight: 700, color: "#2D3748", marginBottom: 12, fontSize: 15 }}>Récapitulatif</h3>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: 14 }}>
                  <span style={{ color: "#A0AEC0" }}>Service :</span>
                  <span style={{ color: "#2D3748", fontWeight: 500 }}>{serviceTypes.find((s) => s.value === form.typeService)?.label}</span>
                  <span style={{ color: "#A0AEC0" }}>Date :</span>
                  <span style={{ color: "#2D3748", fontWeight: 500 }}>{form.dateRdv ? formatDate(form.dateRdv) : "-"}</span>
                  <span style={{ color: "#A0AEC0" }}>Créneau :</span>
                  <span style={{ color: "#2D3748", fontWeight: 500 }}>{form.creneauHoraire || "-"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, paddingTop: 24, borderTop: "1px solid #E2E8F0" }}>
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#718096", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                <ChevronLeft style={{ height: 16, width: 16 }} /> Retour
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" disabled={!canNext()} onClick={() => setStep(step + 1)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: canNext() ? "#F7941D" : "#E2E8F0", color: canNext() ? "#fff" : "#A0AEC0", fontWeight: 700, padding: "14px 28px", borderRadius: 50, fontSize: 15, border: "none", cursor: canNext() ? "pointer" : "not-allowed" }}>
                Continuer <ChevronRight style={{ height: 18, width: 18 }} />
              </button>
            ) : (
              <button type="button" disabled={loading} onClick={handleSubmit}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "#F7941D", color: "#fff", fontWeight: 700, padding: "14px 28px", borderRadius: 50, fontSize: 15, border: "none", cursor: "pointer" }}>
                {loading ? <Loader2 style={{ height: 18, width: 18 }} className="animate-spin" /> : <CalendarCheck style={{ height: 18, width: 18 }} />}
                Confirmer le RDV
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Wrench, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

export default function NouvelleInterventionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [rapport, setRapport] = useState("");
  const [interventionId, setInterventionId] = useState("");

  const [form, setForm] = useState({
    typeIntervention: "remplacement_canalisation",
    dateIntervention: new Date().toISOString().split("T")[0],
    duree: "",
    nomClient: "",
    telephoneClient: "",
    adresseClient: "",
    etatAvant: "",
    etatApres: "",
    materiauxUtilises: "",
    observations: "",
    notesLibres: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); setLoading(false); return; }
      setInterventionId(json.interventionId);
      setLoading(false);
    } catch {
      setError("Erreur serveur");
      setLoading(false);
    }
  }

  async function handleGenerate() {
    if (!interventionId) {
      setError("Sauvegardez d'abord l'intervention");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/interventions/generer-rapport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interventionId }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); setGenerating(false); return; }
      setRapport(json.rapport);
      setGenerating(false);
    } catch {
      setError("Erreur generation IA");
      setGenerating(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">
          Nouvelle intervention
        </h1>
        <p className="text-text-secondary mt-1">Formulaire structure + notes libres → generation IA du rapport</p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white rounded-xl border border-mid-grey p-6 space-y-5">
          <h2 className="font-bold text-text-primary flex items-center gap-2">
            <Wrench className="h-5 w-5 text-action" /> Donnees de l&apos;intervention
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">Type *</label>
              <select value={form.typeIntervention} onChange={(e) => update("typeIntervention", e.target.value)} className="flex min-h-[44px] w-full rounded-xl border border-mid-grey bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action">
                <option value="remplacement_canalisation">Remplacement canalisation</option>
                <option value="reparation_fuite">Reparation fuite</option>
                <option value="debouchage">Debouchage</option>
                <option value="diagnostic">Diagnostic camera</option>
              </select>
            </div>
            <Input label="Date *" id="date" type="date" value={form.dateIntervention} onChange={(e) => update("dateIntervention", e.target.value)} />
          </div>

          <Input label="Duree" id="duree" placeholder="Ex: 3 heures" value={form.duree} onChange={(e) => update("duree", e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Nom client *" id="nomClient" placeholder="Dupont" value={form.nomClient} onChange={(e) => update("nomClient", e.target.value)} />
            <Input label="Telephone *" id="telephoneClient" placeholder="06 00 00 00 00" value={form.telephoneClient} onChange={(e) => update("telephoneClient", e.target.value)} />
          </div>

          <Input label="Adresse *" id="adresseClient" placeholder="12 rue de la Paix, 95000 Cergy" value={form.adresseClient} onChange={(e) => update("adresseClient", e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">Etat avant</label>
              <select value={form.etatAvant} onChange={(e) => update("etatAvant", e.target.value)} className="flex min-h-[44px] w-full rounded-xl border border-mid-grey bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action">
                <option value="">-- Selectionner --</option>
                <option value="canalisation_cassee">Canalisation cassee</option>
                <option value="fuite_active">Fuite active</option>
                <option value="bouchage_total">Bouchage total</option>
                <option value="bouchage_partiel">Bouchage partiel</option>
                <option value="corrosion_avancee">Corrosion avancee</option>
                <option value="racines_intrusives">Racines intrusives</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">Etat apres</label>
              <select value={form.etatApres} onChange={(e) => update("etatApres", e.target.value)} className="flex min-h-[44px] w-full rounded-xl border border-mid-grey bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action">
                <option value="">-- Selectionner --</option>
                <option value="repare">Repare</option>
                <option value="remplace_neuf">Remplace (neuf)</option>
                <option value="debouche">Debouche</option>
                <option value="a_surveiller">A surveiller</option>
              </select>
            </div>
          </div>

          <Textarea label="Materiaux utilises" id="materiaux" placeholder="Ex: 12ml tube PVC D100, 2 coudes 90°, 1 regard beton..." value={form.materiauxUtilises} onChange={(e) => update("materiauxUtilises", e.target.value)} />

          <Textarea label="Observations techniques" id="observations" placeholder="Observations du technicien sur le chantier..." value={form.observations} onChange={(e) => update("observations", e.target.value)} />

          <div className="border-t border-mid-grey pt-5">
            <Textarea label="Notes libres du technicien" id="notesLibres" placeholder="Notes brutes, commentaires, details supplementaires..." value={form.notesLibres} onChange={(e) => update("notesLibres", e.target.value)} className="min-h-[120px]" />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="default" loading={loading} onClick={handleSave} className="!animate-none">
              {interventionId ? <CheckCircle2 className="h-4 w-4" /> : null}
              {interventionId ? "Sauvegarde" : "Sauvegarder"}
            </Button>
            <Button variant="primary" size="default" loading={generating} onClick={handleGenerate} disabled={!interventionId} className={!interventionId ? "opacity-50 !animate-none" : ""}>
              <Sparkles className="h-4 w-4" /> Generer le rapport IA
            </Button>
          </div>
        </div>

        {/* Rapport genere */}
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <h2 className="font-bold text-text-primary flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-action" /> Rapport genere par IA
          </h2>

          {generating ? (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted">
              <div className="h-10 w-10 border-4 border-action/30 border-t-action rounded-full animate-spin mb-4" />
              <p className="font-medium">Generation du rapport en cours...</p>
              <p className="text-sm mt-1">Claude analyse les donnees de l&apos;intervention</p>
            </div>
          ) : rapport ? (
            <div className="prose prose-sm max-w-none">
              <div className="bg-green-light border border-green/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-sm text-green">
                <CheckCircle2 className="h-4 w-4" /> Rapport genere avec succes
              </div>
              <div className="whitespace-pre-wrap text-text-primary text-sm leading-relaxed">
                {rapport}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted text-center">
              <Sparkles className="h-12 w-12 mb-4 opacity-30" />
              <p className="font-medium">Aucun rapport genere</p>
              <p className="text-sm mt-1">Remplissez le formulaire, sauvegardez, puis cliquez sur &quot;Generer le rapport IA&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

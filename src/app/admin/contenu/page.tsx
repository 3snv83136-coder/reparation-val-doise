"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { FileText, Save, CheckCircle2, Loader2 } from "lucide-react";

interface ContenuItem {
  cle: string;
  valeur: string;
  pageSlug: string;
}

export default function AdminContenuPage() {
  const [contenu, setContenu] = useState<Record<string, string>>({});
  const [defaults, setDefaults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contenu")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {};
        (data.contenu as ContenuItem[]).forEach((c) => { map[c.cle] = c.valeur; });
        setContenu(map);
        setDefaults(data.defaults || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave(cle: string) {
    setSaving(cle);
    const valeur = contenu[cle] ?? defaults[cle] ?? "";
    const pageSlug = cle.split("_")[0];
    await fetch("/api/admin/contenu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cle, valeur, pageSlug }),
    });
    setSaving(null);
    setSaved(cle);
    setTimeout(() => setSaved(null), 2000);
  }

  function getValue(cle: string): string {
    return contenu[cle] ?? defaults[cle] ?? "";
  }

  function updateValue(cle: string, value: string) {
    setContenu({ ...contenu, [cle]: value });
  }

  const sections = [
    { title: "Hero (Accueil)", keys: ["hero_titre", "hero_sous_titre", "hero_cta_principal", "hero_cta_secondaire"] },
    { title: "Services", keys: ["services_titre", "services_description"] },
    { title: "Processus", keys: ["processus_titre"] },
    { title: "Artisans", keys: ["artisans_titre", "artisans_description"] },
    { title: "CTA Final", keys: ["cta_final_titre", "cta_final_sous_titre"] },
  ];

  function formatLabel(cle: string): string {
    return cle.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-action" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Contenu des pages</h1>
        <p className="text-text-secondary text-sm mt-1">Editez les textes du site sans toucher au code</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-mid-grey p-6">
            <h2 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-action" /> {section.title}
            </h2>
            <div className="space-y-5">
              {section.keys.map((cle) => (
                <div key={cle}>
                  <Textarea
                    label={formatLabel(cle)}
                    id={cle}
                    value={getValue(cle)}
                    onChange={(e) => updateValue(cle, e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      loading={saving === cle}
                      onClick={() => handleSave(cle)}
                      className="!animate-none"
                    >
                      {saved === cle ? <CheckCircle2 className="h-4 w-4 text-green" /> : <Save className="h-4 w-4" />}
                      {saved === cle ? "Sauvegarde !" : "Sauvegarder"}
                    </Button>
                    {contenu[cle] && contenu[cle] !== defaults[cle] && (
                      <button
                        onClick={() => updateValue(cle, defaults[cle] || "")}
                        className="text-xs text-text-muted hover:text-action transition-colors"
                      >
                        Reinitialiser
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postesTypes, unites, getDesignationsForPoste } from "@/lib/btp-lexique";
import { calculerTotalLigne, calculerSousTotalPoste, calculerTotaux, genId } from "@/lib/devis";
import type { DevisPoste, DevisLigne } from "@/lib/devis";
import { Plus, Trash2, FileSpreadsheet, Save, ChevronDown, ChevronUp } from "lucide-react";
import { formatEUR } from "@/lib/utils";

export default function NouveauDevisPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // En-tete devis
  const [header, setHeader] = useState({
    clientNom: "", clientAdresse: "", clientTelephone: "", clientEmail: "",
    adresseChantier: "", objetTravaux: "", delaiExecution: "", conditionsPaiement: "50% a la commande, solde a la reception",
    tauxTVA: 10, remiseType: "", remiseMontant: 0,
  });

  // Postes
  const [postes, setPostes] = useState<DevisPoste[]>([]);
  const [openPoste, setOpenPoste] = useState<string | null>(null);

  function addPoste(type: string) {
    const newPoste: DevisPoste = { id: genId(), type, lignes: [] };
    setPostes([...postes, newPoste]);
    setOpenPoste(newPoste.id);
  }

  function removePoste(id: string) {
    setPostes(postes.filter((p) => p.id !== id));
  }

  function addLigne(posteId: string) {
    setPostes(postes.map((p) =>
      p.id === posteId
        ? { ...p, lignes: [...p.lignes, { id: genId(), designation: "", unite: "ml", quantite: 1, prixUnitaireHT: 0 }] }
        : p
    ));
  }

  function updateLigne(posteId: string, ligneId: string, field: keyof DevisLigne, value: string | number) {
    setPostes(postes.map((p) =>
      p.id === posteId
        ? { ...p, lignes: p.lignes.map((l) => l.id === ligneId ? { ...l, [field]: value } : l) }
        : p
    ));
  }

  function removeLigne(posteId: string, ligneId: string) {
    setPostes(postes.map((p) =>
      p.id === posteId ? { ...p, lignes: p.lignes.filter((l) => l.id !== ligneId) } : p
    ));
  }

  function updatePosteLibre(posteId: string, value: string) {
    setPostes(postes.map((p) => p.id === posteId ? { ...p, intituleLibre: value } : p));
  }

  const totaux = calculerTotaux(postes, header.tauxTVA, header.remiseType, header.remiseMontant);

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...header,
        totalHT: totaux.totalHTApresRemise,
        totalTVA: totaux.totalTVA,
        totalTTC: totaux.totalTTC,
        postes: postes.map((p, i) => ({
          type: p.type,
          intituleLibre: p.intituleLibre,
          numero: i + 1,
          sousTotalHT: calculerSousTotalPoste(p),
          lignes: p.lignes.map((l) => ({
            designation: l.designation,
            unite: l.unite,
            quantite: l.quantite,
            prixUnitaireHT: l.prixUnitaireHT,
            totalHT: calculerTotalLigne(l),
          })),
        })),
      };

      const res = await fetch("/api/admin/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); setSaving(false); return; }
      router.push("/admin/devis");
      router.refresh();
    } catch {
      setError("Erreur serveur");
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Nouveau devis</h1>
          <p className="text-text-secondary text-sm mt-1">Formulaire poste par poste BTP</p>
        </div>
        <Button variant="primary" size="default" loading={saving} onClick={handleSave} className={postes.length === 0 ? "opacity-50 !animate-none" : ""}>
          <Save className="h-4 w-4" /> Enregistrer
        </Button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{error}</div>}

      {/* ═══ EN-TETE ═══ */}
      <div className="bg-white rounded-xl border border-mid-grey p-6 mb-6">
        <h2 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-action" /> Informations du devis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Nom client *" value={header.clientNom} onChange={(e) => setHeader({ ...header, clientNom: e.target.value })} />
          <Input label="Telephone *" value={header.clientTelephone} onChange={(e) => setHeader({ ...header, clientTelephone: e.target.value })} />
          <Input label="Adresse client" value={header.clientAdresse} onChange={(e) => setHeader({ ...header, clientAdresse: e.target.value })} />
          <Input label="Email" value={header.clientEmail} onChange={(e) => setHeader({ ...header, clientEmail: e.target.value })} />
          <Input label="Adresse chantier *" value={header.adresseChantier} onChange={(e) => setHeader({ ...header, adresseChantier: e.target.value })} />
          <Input label="Objet des travaux *" value={header.objetTravaux} onChange={(e) => setHeader({ ...header, objetTravaux: e.target.value })} />
          <Input label="Delai d'execution" value={header.delaiExecution} onChange={(e) => setHeader({ ...header, delaiExecution: e.target.value })} placeholder="Ex: 3 jours ouvrables" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">TVA</label>
            <select value={header.tauxTVA} onChange={(e) => setHeader({ ...header, tauxTVA: Number(e.target.value) })} className="flex min-h-[44px] w-full rounded-xl border border-mid-grey bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-action">
              <option value={10}>10% (renovation)</option>
              <option value={20}>20% (neuf)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══ POSTES ═══ */}
      <div className="space-y-4 mb-6">
        {postes.map((poste, posteIndex) => {
          const posteType = postesTypes.find((p) => p.value === poste.type);
          const isOpen = openPoste === poste.id;
          const designations = getDesignationsForPoste(poste.type);
          const sousTotal = calculerSousTotalPoste(poste);

          return (
            <div key={poste.id} className="bg-white rounded-xl border border-mid-grey overflow-hidden">
              {/* Poste header */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-light-grey transition-colors"
                onClick={() => setOpenPoste(isOpen ? null : poste.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-lg bg-action/10 text-action font-black text-sm flex items-center justify-center">
                    {posteIndex + 1}
                  </span>
                  <div>
                    <span className="font-bold text-text-primary">
                      {poste.type === "libre" ? (poste.intituleLibre || "Poste libre") : posteType?.label}
                    </span>
                    <span className="text-text-muted text-xs ml-2">({poste.lignes.length} ligne(s))</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-[var(--font-display)] font-black text-text-primary">{formatEUR(sousTotal)}</span>
                  <button onClick={(e) => { e.stopPropagation(); removePoste(poste.id); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-text-muted" /> : <ChevronDown className="h-4 w-4 text-text-muted" />}
                </div>
              </div>

              {/* Poste content */}
              {isOpen && (
                <div className="border-t border-mid-grey px-5 py-4 space-y-4">
                  {poste.type === "libre" && (
                    <Input label="Intitule du poste" value={poste.intituleLibre || ""} onChange={(e) => updatePosteLibre(poste.id, e.target.value)} placeholder="Ex: Travaux supplementaires" />
                  )}

                  {/* Lignes */}
                  {poste.lignes.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-light-grey text-text-secondary text-xs">
                            <th className="text-left px-3 py-2 font-semibold w-[35%]">Designation</th>
                            <th className="text-left px-3 py-2 font-semibold w-[15%]">Unite</th>
                            <th className="text-right px-3 py-2 font-semibold w-[12%]">Qte</th>
                            <th className="text-right px-3 py-2 font-semibold w-[15%]">PU HT</th>
                            <th className="text-right px-3 py-2 font-semibold w-[15%]">Total HT</th>
                            <th className="w-[8%]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {poste.lignes.map((ligne) => (
                            <tr key={ligne.id} className="border-t border-mid-grey">
                              <td className="px-3 py-2">
                                {designations.length > 0 ? (
                                  <select value={ligne.designation} onChange={(e) => updateLigne(poste.id, ligne.id, "designation", e.target.value)} className="w-full border border-mid-grey rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-action">
                                    <option value="">-- Choisir --</option>
                                    {designations.map((d) => <option key={d} value={d}>{d}</option>)}
                                    <option value="__custom">Saisie libre...</option>
                                  </select>
                                ) : (
                                  <input value={ligne.designation} onChange={(e) => updateLigne(poste.id, ligne.id, "designation", e.target.value)} className="w-full border border-mid-grey rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-action" placeholder="Designation" />
                                )}
                                {ligne.designation === "__custom" && (
                                  <input onChange={(e) => updateLigne(poste.id, ligne.id, "designation", e.target.value)} className="w-full border border-mid-grey rounded-lg px-2 py-1.5 text-sm mt-1 focus:ring-2 focus:ring-action" placeholder="Saisir la designation" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <select value={ligne.unite} onChange={(e) => updateLigne(poste.id, ligne.id, "unite", e.target.value)} className="w-full border border-mid-grey rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-action">
                                  {unites.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                              </td>
                              <td className="px-3 py-2">
                                <input type="number" min="0" step="0.01" value={ligne.quantite} onChange={(e) => updateLigne(poste.id, ligne.id, "quantite", Number(e.target.value))} className="w-full text-right border border-mid-grey rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-action" />
                              </td>
                              <td className="px-3 py-2">
                                <input type="number" min="0" step="0.01" value={ligne.prixUnitaireHT} onChange={(e) => updateLigne(poste.id, ligne.id, "prixUnitaireHT", Number(e.target.value))} className="w-full text-right border border-mid-grey rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-action" />
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-text-primary">
                                {formatEUR(calculerTotalLigne(ligne))}
                              </td>
                              <td className="px-3 py-2">
                                <button onClick={() => removeLigne(poste.id, ligne.id)} className="p-1 text-red-400 hover:text-red-600 rounded transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <Button variant="ghost" size="sm" onClick={() => addLigne(poste.id)}>
                    <Plus className="h-4 w-4" /> Ajouter une ligne
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ajouter un poste */}
      <div className="bg-white rounded-xl border border-dashed border-action/40 p-5 mb-8">
        <p className="text-sm font-bold text-text-primary mb-3">+ Ajouter un poste</p>
        <div className="flex flex-wrap gap-2">
          {postesTypes.map((p) => (
            <button
              key={p.value}
              onClick={() => addPoste(p.value)}
              className="px-4 py-2 text-sm font-medium bg-light-grey hover:bg-action-light hover:text-action border border-mid-grey rounded-lg transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ TOTAUX ═══ */}
      {postes.length > 0 && (
        <div className="bg-white rounded-xl border border-mid-grey p-6">
          <h2 className="font-bold text-text-primary mb-4">Recapitulatif</h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Remise</label>
              <select value={header.remiseType} onChange={(e) => setHeader({ ...header, remiseType: e.target.value })} className="border border-mid-grey rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-action">
                <option value="">Pas de remise</option>
                <option value="pourcentage">En %</option>
                <option value="montant">En euros</option>
              </select>
            </div>
            {header.remiseType && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">{header.remiseType === "pourcentage" ? "%" : "EUR"}</label>
                <input type="number" min="0" step="0.01" value={header.remiseMontant} onChange={(e) => setHeader({ ...header, remiseMontant: Number(e.target.value) })} className="w-24 text-right border border-mid-grey rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-action" />
              </div>
            )}
          </div>

          <div className="border-t border-mid-grey pt-4 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total HT</span>
              <span className="font-medium text-text-primary">{formatEUR(totaux.totalHT)}</span>
            </div>
            {totaux.remise > 0 && (
              <div className="flex justify-between text-sm text-green">
                <span>Remise</span>
                <span>-{formatEUR(totaux.remise)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">TVA ({header.tauxTVA}%)</span>
              <span className="font-medium text-text-primary">{formatEUR(totaux.totalTVA)}</span>
            </div>
            <div className="flex justify-between text-lg font-black border-t border-mid-grey pt-2 mt-2">
              <span className="text-text-primary">Total TTC</span>
              <span className="text-action">{formatEUR(totaux.totalTTC)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

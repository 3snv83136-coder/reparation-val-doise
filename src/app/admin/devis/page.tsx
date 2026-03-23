import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { formatDateShort, formatEUR } from "@/lib/utils";
import { FileSpreadsheet, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDevisPage() {
  const devisList = await prisma.devis.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Devis</h1>
          <p className="text-text-secondary text-sm mt-1">{devisList.length} devis</p>
        </div>
        <Link href="/admin/devis/nouveau">
          <Button variant="primary" size="default">
            <Plus className="h-4 w-4" /> Nouveau devis
          </Button>
        </Link>
      </div>

      {devisList.length === 0 ? (
        <div className="bg-white rounded-xl border border-mid-grey p-12 text-center">
          <FileSpreadsheet className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-4">Aucun devis cree.</p>
          <Link href="/admin/devis/nouveau">
            <Button variant="primary">Creer un devis</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-mid-grey overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-light-grey border-b border-mid-grey">
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Numero</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Client</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Objet</th>
                  <th className="text-right px-4 py-3 font-semibold text-text-primary">Total TTC</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Statut</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Date</th>
                </tr>
              </thead>
              <tbody>
                {devisList.map((d) => (
                  <tr key={d.id} className="border-b border-mid-grey last:border-0 hover:bg-light-grey/50">
                    <td className="px-4 py-3 font-mono text-text-primary font-semibold">{d.numero}</td>
                    <td className="px-4 py-3 text-text-primary">{d.clientNom}</td>
                    <td className="px-4 py-3 text-text-secondary">{d.objetTravaux}</td>
                    <td className="px-4 py-3 text-right font-semibold text-text-primary">{formatEUR(d.totalTTC)}</td>
                    <td className="px-4 py-3"><Badge statut={d.statut} /></td>
                    <td className="px-4 py-3 text-text-muted text-xs">{formatDateShort(d.dateDevis)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

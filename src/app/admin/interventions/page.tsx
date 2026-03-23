import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/utils";
import { Wrench, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminInterventionsPage() {
  const interventions = await prisma.intervention.findMany({
    orderBy: { createdAt: "desc" },
    include: { reservation: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Interventions</h1>
          <p className="text-text-secondary text-sm mt-1">{interventions.length} intervention(s)</p>
        </div>
        <Link href="/admin/interventions/nouveau">
          <Button variant="primary" size="default">
            <Plus className="h-4 w-4" /> Nouvelle
          </Button>
        </Link>
      </div>

      {interventions.length === 0 ? (
        <div className="bg-white rounded-xl border border-mid-grey p-12 text-center">
          <Wrench className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-4">Aucune intervention enregistree.</p>
          <Link href="/admin/interventions/nouveau">
            <Button variant="primary">Creer une intervention</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-mid-grey overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-light-grey border-b border-mid-grey">
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Client</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Statut</th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((i) => (
                  <tr key={i.id} className="border-b border-mid-grey last:border-0 hover:bg-light-grey/50">
                    <td className="px-4 py-3 font-semibold text-text-primary">{i.nomClient}</td>
                    <td className="px-4 py-3 text-text-secondary">{i.typeIntervention.replace(/_/g, " ")}</td>
                    <td className="px-4 py-3 text-text-primary">{formatDateShort(i.dateIntervention)}</td>
                    <td className="px-4 py-3"><Badge statut={i.statut} /></td>
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

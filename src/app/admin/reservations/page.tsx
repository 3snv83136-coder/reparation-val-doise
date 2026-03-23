import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { formatDateShort, formatPhone } from "@/lib/utils";
import { CalendarCheck } from "lucide-react";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Reservations</h1>
          <p className="text-text-secondary text-sm mt-1">{reservations.length} reservation(s)</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-xl border border-mid-grey p-12 text-center">
          <CalendarCheck className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Aucune reservation pour le moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-mid-grey overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-light-grey border-b border-mid-grey">
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Client</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Date RDV</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Creneau</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Ville</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Statut</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">Recu le</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b border-mid-grey last:border-0 hover:bg-light-grey/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-text-primary">{r.prenom} {r.nom}</p>
                      <p className="text-text-muted text-xs">{formatPhone(r.telephone)}</p>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{r.typeService.replace(/_/g, " ")}</td>
                    <td className="px-4 py-3 text-text-primary font-medium">{formatDateShort(r.dateRdv)}</td>
                    <td className="px-4 py-3 text-text-secondary">{r.creneauHoraire}</td>
                    <td className="px-4 py-3 text-text-secondary">{r.ville}</td>
                    <td className="px-4 py-3"><Badge statut={r.statut} /></td>
                    <td className="px-4 py-3 text-text-muted text-xs">{formatDateShort(r.createdAt)}</td>
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

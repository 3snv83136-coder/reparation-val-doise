import { prisma } from "@/lib/prisma";
import { formatDateShort } from "@/lib/utils";
import { Star, MapPin } from "lucide-react";

export default async function AdminAvisPage() {
  const avis = await prisma.avis.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Avis clients</h1>
        <p className="text-text-secondary text-sm mt-1">{avis.length} avis</p>
      </div>

      {avis.length === 0 ? (
        <div className="bg-white rounded-xl border border-mid-grey p-12 text-center">
          <Star className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Aucun avis pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {avis.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-mid-grey p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < a.note ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${a.affiche ? "bg-green-light text-green" : "bg-light-grey text-text-muted"}`}>
                    {a.affiche ? "Visible" : "Masque"}
                  </span>
                </div>
              </div>
              <p className="text-text-primary text-sm leading-relaxed mb-4">&ldquo;{a.commentaire}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-text-primary">{a.nom}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.ville}</span>
                </div>
                <span>{formatDateShort(a.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

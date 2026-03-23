import { prisma } from "@/lib/prisma";
import { formatDateShort } from "@/lib/utils";
import { MessageSquare, Mail } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-black text-text-primary">Messages</h1>
          <p className="text-text-secondary text-sm mt-1">
            {messages.length} message(s) &mdash; {nonLus} non lu(s)
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-mid-grey p-12 text-center">
          <MessageSquare className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`bg-white rounded-xl border p-5 transition-colors ${
                m.lu ? "border-mid-grey" : "border-action/30 bg-action-light/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    m.lu ? "bg-light-grey" : "bg-action/10"
                  }`}>
                    <Mail className={`h-5 w-5 ${m.lu ? "text-text-muted" : "text-action"}`} />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary text-sm">{m.nom}</p>
                    <p className="text-text-muted text-xs">{m.email} {m.telephone && `• ${m.telephone}`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-text-muted text-xs">{formatDateShort(m.createdAt)}</p>
                  {!m.lu && (
                    <span className="inline-block mt-1 text-xs font-bold text-action">Nouveau</span>
                  )}
                </div>
              </div>
              <p className="text-xs font-semibold text-action uppercase tracking-wide mb-1">
                {m.sujet === "devis" ? "Demande de devis" : m.sujet === "question" ? "Question" : m.sujet === "reclamation" ? "Reclamation" : "Autre"}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

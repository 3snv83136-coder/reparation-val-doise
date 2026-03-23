import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "d MMMM yyyy", { locale: fr });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd/MM/yyyy", { locale: fr });
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("33")) {
    const national = "0" + cleaned.slice(2);
    return national.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  }
  return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
}

export function formatEUR(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function statutLabel(statut: string): string {
  const labels: Record<string, string> = {
    en_attente: "En attente",
    confirme: "Confirmé",
    en_cours: "En cours",
    termine: "Terminé",
    annule: "Annulé",
    brouillon: "Brouillon",
    envoye: "Envoyé",
    accepte: "Accepté",
    refuse: "Refusé",
    genere: "Généré",
    valide: "Validé",
    planifie: "Planifié",
  };
  return labels[statut] || statut;
}

export function statutColor(statut: string): string {
  const colors: Record<string, string> = {
    en_attente: "bg-yellow-100 text-yellow-800",
    confirme: "bg-blue-100 text-blue-800",
    en_cours: "bg-indigo-100 text-indigo-800",
    termine: "bg-green-100 text-green-800",
    annule: "bg-red-100 text-red-800",
    brouillon: "bg-gray-100 text-gray-800",
    envoye: "bg-blue-100 text-blue-800",
    accepte: "bg-green-100 text-green-800",
    refuse: "bg-red-100 text-red-800",
    genere: "bg-purple-100 text-purple-800",
    valide: "bg-green-100 text-green-800",
  };
  return colors[statut] || "bg-gray-100 text-gray-800";
}

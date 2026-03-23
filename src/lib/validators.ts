import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  sujet: z.enum(["devis", "question", "reclamation", "autre"]),
  message: z.string().min(10, "Le message doit contenir au moins 10 caracteres"),
  website: z.string().max(0).optional(), // honeypot
});

export const reservationSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prenom est requis"),
  telephone: z.string().regex(
    /^(?:(?:\+33|0)\s?[1-9])(?:[\s.-]?\d{2}){4}$/,
    "Numero de telephone invalide"
  ),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(5, "L'adresse est requise"),
  codePostal: z.string().regex(/^95\d{3}$/, "Code postal du Val d'Oise requis (95xxx)"),
  ville: z.string().min(2, "La ville est requise"),
  typeService: z.enum([
    "remplacement_canalisation",
    "reparation_fuite",
    "debouchage",
    "diagnostic",
  ]),
  niveauUrgence: z.enum(["tres_urgent", "urgent", "planifie"]),
  dateRdv: z.string().min(1, "La date est requise"),
  creneauHoraire: z.string().min(1, "Le creneau est requis"),
  description: z.string().min(10, "Decrivez votre probleme (min 10 caracteres)"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  motDePasse: z.string().min(6, "Mot de passe requis (min 6 caracteres)"),
});

export const interventionSchema = z.object({
  typeIntervention: z.string().min(1, "Type requis"),
  dateIntervention: z.string().min(1, "Date requise"),
  duree: z.string().optional(),
  adresseClient: z.string().min(5, "Adresse requise"),
  nomClient: z.string().min(2, "Nom requis"),
  telephoneClient: z.string().min(10, "Telephone requis"),
  etatAvant: z.string().optional(),
  etatApres: z.string().optional(),
  materiauxUtilises: z.string().optional(),
  observations: z.string().optional(),
  notesLibres: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type InterventionInput = z.infer<typeof interventionSchema>;

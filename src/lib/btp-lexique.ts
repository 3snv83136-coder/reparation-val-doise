export interface PosteType {
  value: string;
  label: string;
  designations: string[];
}

export const postesTypes: PosteType[] = [
  {
    value: "terrassement",
    label: "Terrassement",
    designations: [
      "Fouille en tranchee",
      "Deblaiement mecanique",
      "Deblaiement manuel",
      "Remblaiement en tranchee",
      "Evacuation des terres",
      "Blindage de fouille",
      "Compactage du fond de fouille",
      "Lit de pose sable",
      "Grillage avertisseur",
    ],
  },
  {
    value: "fourniture",
    label: "Fourniture",
    designations: [
      "Tube PVC D100",
      "Tube PVC D125",
      "Tube PVC D160",
      "Tube PVC D200",
      "Tube fonte D100",
      "Tube fonte D150",
      "Tube PEHD D63",
      "Tube PEHD D90",
      "Raccord PVC coude 45°",
      "Raccord PVC coude 90°",
      "Raccord PVC te",
      "Raccord PVC reduction",
      "Manchon PVC",
      "Collier de reparation",
      "Joint d'etancheite",
      "Regard beton 30x30",
      "Regard beton 40x40",
      "Tampon fonte",
      "Siphon de sol",
    ],
  },
  {
    value: "raccordement",
    label: "Raccordement",
    designations: [
      "Raccordement EU (eaux usees)",
      "Raccordement EP (eaux pluviales)",
      "Branchement reseau public",
      "Pose de regard de visite",
      "Raccord sur collecteur existant",
      "Essai d'etancheite a l'eau",
      "Essai d'etancheite a l'air",
      "Passage de camera apres travaux",
    ],
  },
  {
    value: "pose_main_oeuvre",
    label: "Pose et main d'oeuvre",
    designations: [
      "Pose canalisation PVC",
      "Pose canalisation fonte",
      "Pose canalisation PEHD",
      "Pose regard beton",
      "Pose regard PVC",
      "Pose bouche d'egout",
      "Decoupe et ajustement",
      "Soudure bout a bout PEHD",
      "Collage PVC",
      "Manchonnage",
      "Main d'oeuvre supplementaire",
    ],
  },
  {
    value: "demolition_depose",
    label: "Demolition / Depose",
    designations: [
      "Depose canalisation existante",
      "Demolition beton",
      "Demolition enrobe",
      "Sciage enrobe",
      "Decoupe enrobe a la scie",
      "Depose regard existant",
      "Depose tampon fonte",
      "Evacuation gravats",
    ],
  },
  {
    value: "remise_en_etat",
    label: "Remise en etat",
    designations: [
      "Refection enrobe a chaud",
      "Refection enrobe a froid",
      "Refection beton",
      "Refection pelouse / gazon",
      "Refection dallage",
      "Refection pave",
      "Nettoyage chantier",
      "Remise en etat des abords",
    ],
  },
  {
    value: "libre",
    label: "Poste libre",
    designations: [],
  },
];

export const unites = [
  { value: "ml", label: "ml (metre lineaire)" },
  { value: "m2", label: "m² (metre carre)" },
  { value: "m3", label: "m³ (metre cube)" },
  { value: "U", label: "U (unite)" },
  { value: "forfait", label: "Forfait" },
  { value: "heure", label: "Heure" },
  { value: "jour", label: "Jour" },
];

export function getDesignationsForPoste(posteType: string): string[] {
  return postesTypes.find((p) => p.value === posteType)?.designations || [];
}

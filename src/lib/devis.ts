export interface DevisLigne {
  id: string;
  designation: string;
  unite: string;
  quantite: number;
  prixUnitaireHT: number;
}

export interface DevisPoste {
  id: string;
  type: string;
  intituleLibre?: string;
  lignes: DevisLigne[];
}

export function calculerTotalLigne(ligne: DevisLigne): number {
  return Math.round(ligne.quantite * ligne.prixUnitaireHT * 100) / 100;
}

export function calculerSousTotalPoste(poste: DevisPoste): number {
  return Math.round(
    poste.lignes.reduce((sum, l) => sum + calculerTotalLigne(l), 0) * 100
  ) / 100;
}

export function calculerTotaux(
  postes: DevisPoste[],
  tauxTVA: number,
  remiseType?: string,
  remiseMontant?: number
) {
  let totalHT = postes.reduce((sum, p) => sum + calculerSousTotalPoste(p), 0);

  // Remise
  let remise = 0;
  if (remiseType && remiseMontant && remiseMontant > 0) {
    if (remiseType === "pourcentage") {
      remise = Math.round(totalHT * (remiseMontant / 100) * 100) / 100;
    } else {
      remise = remiseMontant;
    }
  }

  const totalHTApresRemise = Math.round((totalHT - remise) * 100) / 100;
  const totalTVA = Math.round(totalHTApresRemise * (tauxTVA / 100) * 100) / 100;
  const totalTTC = Math.round((totalHTApresRemise + totalTVA) * 100) / 100;

  return { totalHT, remise, totalHTApresRemise, totalTVA, totalTTC };
}

export async function genererNumeroDevis(): Promise<string> {
  const year = new Date().getFullYear();
  // Le compteur sera incremente cote serveur
  return `DEV-${year}-`;
}

let idCounter = 0;
export function genId(): string {
  return `tmp_${Date.now()}_${++idCounter}`;
}

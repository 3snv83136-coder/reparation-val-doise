import Anthropic from "@anthropic-ai/sdk";

interface InterventionData {
  typeIntervention: string;
  dateIntervention: string;
  duree?: string;
  nomClient: string;
  adresseClient: string;
  etatAvant?: string;
  etatApres?: string;
  materiauxUtilises?: string;
  observations?: string;
  notesLibres?: string;
}

export async function generateReport(data: InterventionData, apiKey: string): Promise<string> {
  const client = new Anthropic({ apiKey });

  const prompt = `Donnees de l'intervention :
- Type : ${data.typeIntervention}
- Date : ${data.dateIntervention}
- Duree : ${data.duree || "Non precisee"}
- Client : ${data.nomClient}
- Adresse : ${data.adresseClient}
- Etat avant : ${data.etatAvant || "Non precise"}
- Etat apres : ${data.etatApres || "Non precise"}
- Materiaux utilises : ${data.materiauxUtilises || "Non precises"}
- Observations techniques : ${data.observations || "Aucune"}
- Notes du technicien : ${data.notesLibres || "Aucune"}

Genere un compte-rendu d'intervention professionnel et structure avec les sections suivantes :
1. RESUME DE L'INTERVENTION
2. DESCRIPTION DES TRAVAUX REALISES
3. MATERIAUX ET FOURNITURES UTILISES
4. OBSERVATIONS ET RECOMMANDATIONS
5. CONCLUSION

Le ton doit etre professionnel, technique mais accessible. Utilise le vocabulaire BTP canalisation.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    system: "Tu es un redacteur technique specialise BTP canalisation. Tu rediges des comptes-rendus d'intervention professionnels pour un consortium d'artisans canalisateurs du Val d'Oise. Tes rapports sont clairs, structures et utilisent le vocabulaire technique du metier. Redige en francais.",
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock?.text || "Erreur : rapport non genere.";
}

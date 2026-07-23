import TrilhaDeEnsino from "../db/models/TrilhaDeEnsino.js";
import { GoogleGenAI } from "@google/genai";

export async function gerarTrilhaDeEnsino(assunto, nivelAprofundamento) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

  let qtdTopicos = 3;

  if (!assunto || !nivelAprofundamento) {
    throw new Error("Assunto e nível de aprofundamento são obrigatórios.");
  }

  if (nivelAprofundamento === "Intermediário") {
    qtdTopicos = 5;
  } else if (nivelAprofundamento === "Profissional") {
    qtdTopicos = 9;
  }

  const prompt = `
      Você é um gerador de trilhas de ensino. 
      Crie uma trilha sobre: ${assunto}.
      Nível de aprofundamento: ${nivelAprofundamento}.
      Regra: Gere exatamente ${qtdTopicos} tópicos.
      
      Retorne APENAS um objeto JSON no formato:
      {
        "titulo": "string",
        "descricao": "string",
        "competencias": ["string"],
        "habilidades": ["string"],
        "topicos": [{ "nome": "string", "aulas": ["string"] }]
      }
    `;

  const gerarTrilha = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  console.log(gerarTrilha.text);

  const novaTrilha = await TrilhaDeEnsino.create({
    titulo: JSON.parse(gerarTrilha.text).titulo,
    descricao: JSON.parse(gerarTrilha.text).descricao,
    competencias: JSON.parse(gerarTrilha.text).competencias,
    habilidades: JSON.parse(gerarTrilha.text).habilidades,
    topicos: JSON.parse(gerarTrilha.text).topicos,
  });
  return novaTrilha;
}

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import TrilhaDeEnsino from "../db/models/TrilhaDeEnsino.js";

export const gerarTrilhaDeEnsino = async (req, res) => {
  dotenv.config();
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const { assunto, nivelAprofundamento } = req.body;

    let qtdTopicos = 3;

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

    res.status(200).json(novaTrilha);
  } catch (err) {
    res.status(400).json({
      erro: "Erro ao criar trilha",
      detalhes: err.message,
    });
  }
};

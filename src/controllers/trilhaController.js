import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

export const gerarTrilhaDeEnsino = async (req, res) => {
  dotenv.config();
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const { assunto, nivelAprofundamento } = req.body;

    let qtdTopicos = 3;
    if (nivelAprofundamento === "Intermediario") qtdTopicos = 6;
    if (nivelAprofundamento === "Profissional") qtdTopicos = 9;

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

    const novaTrilha = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    console.log(novaTrilha.text);

    res.status(200).json(trilha);
  } catch (err) {
    res.status(400).json({
      erro: "Erro ao criar trilha",
      detalhes: err.message,
    });
  }
};

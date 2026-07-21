import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import TrilhaDeEnsino from "../db/models/TrilhaDeEnsino.js";
import AvaliacaoDiagnostica from "../db/models/AvaliacaoDiagnostica.js";

export const gerarAvaliacaoDiagnostica = async (req, res) => {
  dotenv.config(); // Carrega variáveis do .env
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const { id, tipo, dificuldade } = req.body;

    const trilha = await TrilhaDeEnsino.findOne({
      where: { id: req.body.id },
    });

    console.log("Trilha: ", trilha);

    const system =
      "Você é um avaliador pedagógico. Gere avaliações em JSON estrito, sem texto fora do JSON. " +
      "Cada questão deve ter: id (número sequencial), enunciado (text), opcoes (array com 4 alternativas), " +
      'correta (0-3), topico (string), habilidade (string), dificuldade ("iniciante"|"intermediario"|"avancado"). ' +
      'O JSON raiz deve ter o formato: { "questoes": [...] }.';

    const user =
      `Gere uma avaliação ${tipo === "diagnostica" ? "DIAGNÓSTICA" : "DE PROGRESSO"} ` +
      `com 2 questões objetivas, dificuldade predominante "${dificuldade}", ` +
      `para a trilha "${trilha.titulo}".\n` +
      `Descrição da trilha: ${trilha.descricao || "sem descrição"}\n` +
      `Competências: ${JSON.stringify(trilha.competencias || [])}\n` +
      `Tópicos: ${JSON.stringify(trilha.topicos || [])}\n` +
      `Habilidades: ${JSON.stringify(trilha.habilidades || [])}\n` +
      `Distribua as questões entre os tópicos/habilidades. Apenas JSON na resposta.`;

    console.log(user);

    const gerarAvaliacao = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: system + user,
    });

    console.log(gerarAvaliacao.text);

    const novaAvaliacao = await AvaliacaoDiagnostica.create({
      questoes: JSON.parse(gerarAvaliacao.text).questoes,
    });

    res.status(200).json({
      mensagem: "Avaliação criada com sucesso",
      avaliacao: novaAvaliacao,
    });
  } catch (err) {
    // Em caso de erro, retorna erro 400
    res.status(400).json({
      erro: "Erro ao criar avaliação",
      detalhes: err.message,
    });
  }
};

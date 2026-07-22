import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import TrilhaDeEnsino from "../db/models/TrilhaDeEnsino.js";
import AvaliacaoDiagnostica from "../db/models/AvaliacaoDiagnostica.js";
import AvaliacaoDeProgresso from "../db/models/AvaliacaoDeProgresso.js";

export const carregarTodasAvaliacoesDiagnosticas = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoDiagnostica.findAll();
    res.status(200).json({ avaliacoes });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao carregar avaliações", detalhes: err.message });
  }
};

export const carregarUmaAvaliacaoDiagnostica = async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await AvaliacaoDiagnostica.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ erro: "Avaliação não encontrada" });
    }
    res.status(200).json({ avaliacao });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao carregar avaliação", detalhes: err.message });
  }
};

export const carregarTodasAvaliacoesDeProgresso = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoDeProgresso.findAll();
    res.status(200).json({ avaliacoes });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao carregar avaliações", detalhes: err.message });
  }
};

export const carregarUmaAvaliacaoDeProgresso = async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await AvaliacaoDeProgresso.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ erro: "Avaliação não encontrada" });
    }
    res.status(200).json({ avaliacao });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao carregar avaliação", detalhes: err.message });
  }
};

export const gerarAvaliacaoDiagnostica = async (req, res) => {
  dotenv.config();
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const { id } = req.params;
    const { dificuldade } = req.body;

    console.log(id);

    const trilha = await TrilhaDeEnsino.findByPk(id);

    if (!trilha) {
      return res.status(404).json({
        erro: "Trilha não encontrada",
      });
    }

    console.log("Trilha: ", trilha);

    const system =
      "Você é um avaliador pedagógico. Gere avaliações em JSON estrito, sem texto fora do JSON. " +
      "Cada questão deve ter: id (número sequencial), enunciado (text), opcoes (array com 4 alternativas), " +
      'correta (0-3), topico (string), habilidade (string), dificuldade ("iniciante"|"intermediario"|"avancado"). ' +
      'O JSON raiz deve ter o formato: { "questoes": [...] }.';

    const user =
      `Gere uma avaliação do tipo diagnóstica ` +
      `com 10 questões objetivas, dificuldade predominante "${dificuldade}", ` +
      `para a trilha "${trilha.titulo}".\n` +
      `Descrição da trilha: ${trilha.descricao || "sem descrição"}\n` +
      `Competências: ${JSON.stringify(trilha.competencias || [])}\n` +
      `Tópicos: ${JSON.stringify(trilha.topicos || [])}\n` +
      `Habilidades: ${JSON.stringify(trilha.habilidades || [])}\n` +
      `Distribua as questões entre os tópicos/habilidades. Apenas JSON na resposta.`;

    console.log(user);

    const avaliacaoDiagnosticaGeradaPorIa = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: system + user,
    });

    console.log(avaliacaoDiagnosticaGeradaPorIa.text);

    const novaAvaliacao = await AvaliacaoDiagnostica.create({
      questoes: JSON.parse(avaliacaoDiagnosticaGeradaPorIa.text).questoes,
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

export const gerarAvaliacaoDeProgresso = async (req, res) => {
  dotenv.config();
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const { id } = req.params;
    const { dificuldade } = req.body;

    console.log(id);

    const trilha = await TrilhaDeEnsino.findByPk(id);

    if (!trilha) {
      return res.status(404).json({
        erro: "Trilha não encontrada",
      });
    }

    console.log("Trilha: ", trilha);

    const system =
      "Você é um avaliador pedagógico. Gere avaliações em JSON estrito, sem texto fora do JSON. " +
      "Cada questão deve ter: id (número sequencial), enunciado (text), opcoes (array com 4 alternativas), " +
      'correta (0-3), topico (string), habilidade (string), dificuldade ("iniciante"|"intermediario"|"avancado"). ' +
      'O JSON raiz deve ter o formato: { "questoes": [...] }.';

    const user =
      `Gere uma avaliação do tipo de progresso ` +
      `com 5 questões objetivas, dificuldade predominante "${dificuldade}", ` +
      `para a trilha "${trilha.titulo}".\n` +
      `Descrição da trilha: ${trilha.descricao || "sem descrição"}\n` +
      `Competências: ${JSON.stringify(trilha.competencias || [])}\n` +
      `Tópicos: ${JSON.stringify(trilha.topicos || [])}\n` +
      `Habilidades: ${JSON.stringify(trilha.habilidades || [])}\n` +
      `Distribua as questões entre os tópicos/habilidades. Apenas JSON na resposta.`;

    console.log(user);

    const avaliacaoDeProgressoGeradaPorIa = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: system + user,
    });

    console.log(avaliacaoDeProgressoGeradaPorIa.text);

    const novaAvaliacao = await AvaliacaoDeProgresso.create({
      questoes: JSON.parse(avaliacaoDeProgressoGeradaPorIa.text).questoes,
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

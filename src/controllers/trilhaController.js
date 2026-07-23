import dotenv from "dotenv";
import { gerarTrilhaDeEnsino } from "../services/trilhaService.js";

export const gerarTrilhaDeEnsinoHandler = async (req, res) => {
  dotenv.config();
  const { assunto, nivelAprofundamento } = req.body;
  try {
    const novaTrilha = await gerarTrilhaDeEnsino(assunto, nivelAprofundamento);
    res.status(200).json(novaTrilha);
  } catch (err) {
    res.status(400).json({
      erro: "Erro ao criar trilha",
      detalhes: err.message,
    });
  }
};

import { Router } from "express";
import {
  carregarTodasAvaliacoesDiagnosticas,
  carregarUmaAvaliacaoDiagnostica,
  carregarTodasAvaliacoesDeProgresso,
  carregarUmaAvaliacaoDeProgresso,
  gerarAvaliacaoDiagnostica,
  gerarAvaliacaoDeProgresso,
} from "../controllers/avaliacaoController.js";

const router = Router();

/**
 * @swagger
 * /diagnostic:
 *   get:
 *     summary: Retorna uma lista de avaliações diagnósticas
 *     responses:
 *       200:
 *         description: Lista de avaliações diagnósticas obtida com sucesso.
 */
router.get("/diagnostic", carregarTodasAvaliacoesDiagnosticas);
/**
 * @swagger
 * /diagnostic:
 *   get:
 *     summary: Retorna uma avaliação diagnóstica
 *     responses:
 *       200:
 *         description: Avaliação diagnóstica obtida com sucesso.
 */
router.get("/:id/diagnostic", carregarUmaAvaliacaoDiagnostica);
/**
 * @swagger
 * /diagnostic:
 *   get:
 *     summary: Retorna uma lista de avaliações de progresso
 *     responses:
 *       200:
 *         description: Lista de avaliações de progresso obtida com sucesso.
 */
router.get("/progress", carregarTodasAvaliacoesDeProgresso);
/**
 * @swagger
 * /diagnostic:
 *   get:
 *     summary: Retorna uma avaliação de progresso
 *     responses:
 *       200:
 *         description: Avaliação de progresso obtida com sucesso.
 */
router.get("/:id/progress", carregarUmaAvaliacaoDeProgresso);
/**
 * @swagger
 * /diagnostic:
 *   post:
 *     summary: Gera uma avaliação diagnóstica e salva no banco de dados
 *     responses:
 *       200:
 *         description: Avaliação diagnóstica salva com sucesso.
 */
router.post("/:id/diagnostic/submit", gerarAvaliacaoDiagnostica);
/**
 * @swagger
 * /diagnostic:
 *   post:
 *     summary: Gera uma avaliação de progresso e salva no banco de dados
 *     responses:
 *       200:
 *         description: Avaliação de progresso salva com sucesso.
 */
router.post("/:id/progress/submit", gerarAvaliacaoDeProgresso);
export default router;

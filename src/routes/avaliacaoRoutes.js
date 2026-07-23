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
 *     description: Retorna uma lista de todas as avaliações diagnósticas disponíveis.
 *     tags:
 *       - Avaliações Diagnósticas
 *     responses:
 *       200:
 *         description: Lista de avaliações diagnósticas obtida com sucesso.
 */
router.get("/diagnostic", carregarTodasAvaliacoesDiagnosticas);

/**
 * @swagger
 * /{id}/diagnostic:
 *   get:
 *     summary: Retorna uma avaliação diagnóstica
 *     description: Retorna uma avaliação diagnóstica específica com base no ID fornecido.
 *     tags:
 *       - Avaliações Diagnósticas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação diagnóstica
 *     responses:
 *       200:
 *         description: Avaliação diagnóstica obtida com sucesso.
 */
router.get("/:id/diagnostic", carregarUmaAvaliacaoDiagnostica);

/**
 * @swagger
 * /progress:
 *   get:
 *     summary: Retorna uma lista de avaliações de progresso
 *     description: Retorna uma lista de todas as avaliações de progresso disponíveis.
 *     tags:
 *       - Avaliações de Progresso
 *     responses:
 *       200:
 *         description: Lista de avaliações de progresso obtida com sucesso.
 */
router.get("/progress", carregarTodasAvaliacoesDeProgresso);

/**
 * @swagger
 * /{id}/progress:
 *   get:
 *     summary: Retorna uma avaliação de progresso
 *     description: Retorna uma avaliação de progresso específica com base no ID fornecido.
 *     tags:
 *       - Avaliações de Progresso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação de progresso
 *     responses:
 *       200:
 *         description: Avaliação de progresso obtida com sucesso.
 */
router.get("/:id/progress", carregarUmaAvaliacaoDeProgresso);

/**
 * @swagger
 * /{id}/diagnostic/submit:
 *   post:
 *     summary: Gera uma avaliação diagnóstica e salva no banco de dados
 *     description: Gera uma avaliação diagnóstica com base no ID fornecido e salva no banco de dados.
 *     tags:
 *       - Avaliações Diagnósticas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID para gerar a avaliação diagnóstica
 *     responses:
 *       201:
 *         description: Avaliação diagnóstica salva com sucesso.
 */
router.post("/:id/diagnostic/submit", gerarAvaliacaoDiagnostica);

/**
 * @swagger
 * /{id}/progress/submit:
 *   post:
 *     summary: Gera uma avaliação de progresso e salva no banco de dados
 *     description: Gera uma avaliação de progresso com base no ID fornecido e salva no banco de dados.
 *     tags:
 *       - Avaliações de Progresso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID para gerar a avaliação de progresso
 *     responses:
 *       201:
 *         description: Avaliação de progresso salva com sucesso.
 */
router.post("/:id/progress/submit", gerarAvaliacaoDeProgresso);

export default router;

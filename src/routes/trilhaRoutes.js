import { Router } from "express";
import { gerarTrilhaDeEnsinoHandler } from "../controllers/trilhaController.js";
const router = Router();
/**
 * @swagger
 * /:
 *   post:
 *     summary: Gera uma trilha de estudos e salva no banco de dados
 *     description: Gera uma trilha de estudos com base nos dados fornecidos e salva no banco de dados.
 *     tags:
 *       - Trilhas de Ensino
 *     responses:
 *       200:
 *         description: Trilha de estudos salva com sucesso.
 */
router.post("", gerarTrilhaDeEnsinoHandler);

export default router;

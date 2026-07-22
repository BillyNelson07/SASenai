import { Router } from "express";
import { gerarTrilhaDeEnsino } from "../controllers/trilhaController.js";

const router = Router();
/**
 * @swagger
 * /:
 *   post:
 *     summary: Gera uma trilha de estudos e salva no banco de dados
 *     responses:
 *       200:
 *         description: Trilha de estudos salva com sucesso.
 */
router.post("", gerarTrilhaDeEnsino);

export default router;

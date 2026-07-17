import { Router } from "express";
import { gerarAvaliacao } from "../controllers/avaliacaoDiagnosticaController.js";

const router = Router();

router.post("/api", gerarAvaliacao);

export default router;

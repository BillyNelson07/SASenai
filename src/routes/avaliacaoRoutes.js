import { Router } from "express";
import { gerarAvaliacaoDiagnostica } from "../controllers/avaliacaoDiagnosticaController.js";

const router = Router();

router.post("/diagnostic", gerarAvaliacaoDiagnostica);
export default router;

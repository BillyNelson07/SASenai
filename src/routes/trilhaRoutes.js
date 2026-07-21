import { Router } from "express";
import { gerarTrilhaDeEnsino } from "../controllers/trilhaController.js";

const router = Router();

router.post("/trilha", gerarTrilhaDeEnsino);

export default router;

import { Router } from "express";
import { gerarTrilhaDeEnsino } from "../controllers/trilhaController.js";

const router = Router();

router.post("/api", gerarTrilhaDeEnsino);

export default router;

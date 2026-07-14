import { Router } from "express";
import {
  criarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";
import { usuarioValidator } from "../middlewares/usuarioValidator.js";
import { usuarioSchema } from "../schemas/usuarioSchema.js";

const router = Router();

router.post("/registro", usuarioValidator(usuarioSchema), criarUsuario);
router.post("/login", loginUsuario);

export default router;

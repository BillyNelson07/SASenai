import { Router } from "express";
import {
  criarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";
import { usuarioValidator } from "../middlewares/usuarioValidator.js";
import { usuarioSchema } from "../schemas/usuarioSchema.js";

const router = Router();

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados fornecidos.
 *     tags:
 *       - Usuários
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Maria Santos"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria.santos@email.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "SenhaForte123!"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */
router.post("/registro", usuarioValidator(usuarioSchema), criarUsuario);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Realiza o login de um usuário com base nos dados fornecidos.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Usuário logado com sucesso.
 */
router.post("/login", loginUsuario);

export default router;

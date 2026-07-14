import { cadastrarUsuario, login } from "../services/usuarioService.js";

export async function criarUsuario(req, res) {
  const dados = req.body;
  try {
    const novoUsuario = await cadastrarUsuario(dados);

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      data: novoUsuario,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function loginUsuario(req, res) {
  const dados = req.body;
  try {
    const tokenJWT = await login(dados);
    return res.status(200).json({
      message: "Usuário logado com sucesso!",
      dados: tokenJWT,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

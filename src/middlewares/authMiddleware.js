import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Verifica se o cabeçalho existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  // Extrai o token removendo o prefixo "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    //log para retirar o id do usuario e colocar no body do create() para criar o boleto, no sistema real vai ser retirado dos cookies

    req.usuario_id = dados; // disponibiliza os dados do token no req

    next(); // token válido — passa para o handler da rota
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

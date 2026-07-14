import bcrypt from "bcryptjs";
import Usuario from "../db/models/Usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export async function cadastrarUsuario({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw new Error("Dados incompletos!");
  }

  const emailExistente = await Usuario.findOne({ where: { email } });

  if (emailExistente) {
    throw new Error("Email ja existe.");
  }

  const saltRounds = Number(process.env.SALT_ROUNDS);
  const senhaTransformadaEmHash = await bcrypt.hash(senha, saltRounds);
  const usuarioCadastrado = await Usuario.create({
    nome,
    email,
    senha_hash: senhaTransformadaEmHash,
  });

  const usuarioSemSenha = usuarioCadastrado.get({ plain: true });
  delete usuarioSemSenha.senha_hash;

  return usuarioSemSenha;
}

export async function login({ email, senha }) {
  if (!email || !senha) {
    throw new Error("Dados incompletos!");
  }

  const usuarioValido = await Usuario.findOne({ where: { email } });

  if (!usuarioValido) {
    throw new Error("Dados incorretos!");
  }

  const comparacaoDeSenhas = await bcrypt.compare(
    senha,
    usuarioValido.senha_hash,
  );

  if (!comparacaoDeSenhas) {
    throw new Error("Dados incorretos!");
  }

  const payloadPraGerarTokenJWT = {
    id: usuarioValido.id,
    email: usuarioValido.email,
    nome: usuarioValido.nome,
  };
  const segredoJWT = process.env.JWT_SECRET;
  const opcoesJWT = { expiresIn: process.env.JWT_EXPIRES_IN };

  const tokenJWT = jwt.sign(payloadPraGerarTokenJWT, segredoJWT, opcoesJWT);

  return tokenJWT;
}

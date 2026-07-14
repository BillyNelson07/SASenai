import Boleto from "../db/models/Boleto.js";

export async function criarBoleto({
  //"usuario_id" vem do controller , passa pelo middleware para verificar autenticidade do
  // token e entao é extraido o id do token para ser usado como parametro
  usuario_id,
  fornecedor_nome,
  descricao,
  valor,
  data_vencimento,
  data_pagamento,
}) {
  if (
    !usuario_id ||
    !fornecedor_nome ||
    !descricao ||
    !valor ||
    !data_vencimento ||
    !data_pagamento
  ) {
    throw new Error("É necessário todos os dados do boleto!");
  }

  const novoBoleto = await Boleto.create({
    usuario_id,
    fornecedor_nome,
    descricao,
    valor,
    data_vencimento,
    data_pagamento,
  });

  return novoBoleto;
}

export async function carregarTodosOsBoletos({ usuario_id }) {
  //"usuario_id" vem do controller , passa pelo middleware para verificar autenteicidade do
  // token e entao é extraido o id do token para ser usado como parametro (idUsuario)
  const todosOsBoletos = await Boleto.findAll({
    where: { usuario_id },
  });
  return todosOsBoletos;
}

export async function carregarBoletoPorId({ id, usuario_id }) {
  if (!id || !usuario_id) {
    throw new Error("Dados incompletos!");
  }
  const boletoEmQuestao = await Boleto.findOne({ where: { id, usuario_id } });

  if (!boletoEmQuestao) {
    throw new Error(
      "O boleto em questão não existe ou não pertence ao usuário!",
    );
  }

  return boletoEmQuestao;
}

export async function deletarBoleto({ id, usuario_id }) {
  if (!id || !usuario_id) {
    throw new Error("Dados incompletos!");
  }
  const boletoEmQuestao = await Boleto.findOne({ where: { id, usuario_id } });

  if (!boletoEmQuestao) {
    throw new Error(
      "O boleto em questão não existe ou não pertence ao usuário!",
    );
  }

  await boletoEmQuestao.destroy();
  return "Boleto apagado!";
}

export async function mudarStatusDoBoleto({ id, status, usuario_id }) {
  if (!id || !status || !usuario_id) {
    throw new Error("Dados incompletos!");
  }

  const boletoEmQuestao = await Boleto.findOne({
    where: { id, usuario_id },
  });

  if (!boletoEmQuestao) {
    throw new Error(
      "O boleto em questão não existe ou não pertence ao usuário!",
    );
  }
  //boletos cancelados não podem ser marcados com 'pago'
  if (boletoEmQuestao.status === "cancelado" && status === "pago") {
    throw new Error("Boletos cancelados não podem ser marcados como pago!");
  }
  //boletos pagos nao podem ser alterados
  if (boletoEmQuestao.status === "pago") {
    throw new Error("Boletos pagos não podem ser editados");
  }

  await boletoEmQuestao.update({ status });
  return "Boleto atualizado";
}

import { z } from "zod";

export const boletoSchema = z.object({
  usuario_id: z.uuidv4(),
  fornecedor_nome: z.string(),
  descricao: z.string(),
  valor: z.float32(),
  data_vencimento: z.date(),
  data_pagamento: z.date(),
});

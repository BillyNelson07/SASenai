import "dotenv/config";
import express from "express";
import sequelize from "./src/db/db.js";
import usuariosRouter from "./src/routes/usuariosRoutes.js";
import trilhaRouter from "./src/routes/trilhaRoutes.js";
import avaliacaoRouter from "./src/routes/avaliacaoRoutes.js";
import TrilhaDeEnsino from "./src/db/models/TrilhaDeEnsino.js";
import Usuario from "./src/db/models/Usuario.js";
import AvaliacaoDiagnostica from "./src/db/models/AvaliacaoDiagnostica.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ mensagem: "API de controle de boletos funcionando!" });
});

app.use("/plans", trilhaRouter);
app.use("/plans", avaliacaoRouter);
//avaliacaoDeProgresso
app.use("/usuarios", usuariosRouter);

async function iniciar() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Banco de dados conectado!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao conectar no banco:", erro);
    process.exit(1);
  }
}
iniciar();

//app.listen(PORT, () => {
//console.log(`Servidor rodando na porta ${PORT}`);
//});

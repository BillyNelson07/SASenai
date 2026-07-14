import "dotenv/config";
import express from "express";
import sequelize from "./src/db/db.js";
import boletosRouter from "./src/routes/boletosRoutes.js";
import usuariosRouter from "./src/routes/usuariosRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ mensagem: "API de controle de boletos funcionando!" });
});

app.use("/boletos", boletosRouter);
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

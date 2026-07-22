import "dotenv/config";
import express from "express";
import sequelize from "./src/db/db.js";
import usuariosRouter from "./src/routes/usuariosRoutes.js";
import trilhaRouter from "./src/routes/trilhaRoutes.js";
import avaliacaoRouter from "./src/routes/avaliacaoRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import TrilhaDeEnsino from "./src/db/models/TrilhaDeEnsino.js";
import Usuario from "./src/db/models/Usuario.js";
import AvaliacaoDiagnostica from "./src/db/models/AvaliacaoDiagnostica.js";
import AvaliacaoDeProgresso from "./src/db/models/AvaliacaoDeProgresso.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MentorAI",
      version: "1.0.0",
      description: "Documentação da minha API usando Swagger",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.get("/health", (req, res) => {
  res.json({ mensagem: "API de controle de boletos funcionando!" });
});

app.use("/plans", avaliacaoRouter);
app.use("/plans", trilhaRouter);
app.use("/usuarios", usuariosRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

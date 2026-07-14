import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const AvaliacaoDiagnostica = sequelize.define(
  "AvaliacaoDiagnostica",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    enunciado: {
      type: DataTypes.TEXT, // Recomendado para textos longos de provas
      allowNull: false,
    },
    opcoes: {
      type: DataTypes.JSON, // Use DataTypes.ARRAY(DataTypes.STRING) se o seu banco for exclusivamente PostgreSQL
      allowNull: false,
      validate: {
        isQuatroAlternativas(value) {
          if (!Array.isArray(value) || value.length !== 4) {
            throw new Error(
              "A propriedade opções deve ser um array contendo exatamente 4 alternativas.",
            );
          }
        },
      },
    },
    correta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 3, // Garante que a resposta correta aponte para um índice válido do array (0 a 3)
      },
    },
    topico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    habilidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificuldade: {
      type: DataTypes.ENUM("iniciante", "intermediario", "avancado"),
      allowNull: false,
    },
  },
  {
    // Opções do modelo
    tableName: "avaliacoes_diagnosticas",
    timestamps: true, // Gera automaticamente createdAt e updatedAt
  },
);

module.exports = AvaliacaoDiagnostica;

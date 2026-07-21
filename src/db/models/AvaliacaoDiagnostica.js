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
    questoes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    // Opções do modelo
    tableName: "avaliacoes_diagnosticas",
    timestamps: true, // Gera automaticamente createdAt e updatedAt
  },
);

export default AvaliacaoDiagnostica;

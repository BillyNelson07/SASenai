import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const AvaliacaoDeProgresso = sequelize.define(
  "AvaliacaoDeProgresso",
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
    tableName: "avaliacoes_de_progresso",
    timestamps: true, // Gera automaticamente createdAt e updatedAt
  },
);

export default AvaliacaoDeProgresso;

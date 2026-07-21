import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const TrilhaDeEnsino = sequelize.define(
  "TrilhaDeEnsino",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT, // Usamos TEXT pois descrições costumam ser longas
      allowNull: true,
    },
    competencias: {
      // Armazena o array de strings ["string1", "string2"]
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    habilidades: {
      // Armazena o array de strings ["string1", "string2"]
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    topicos: {
      // Armazena o array de objetos [{ nome: "string", aulas: ["string"] }]
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    // Configurações do model
    tableName: "trilhas_de_ensino",
    timestamps: true,
  },
);

export default TrilhaDeEnsino;

import database from "../index";
import { DataTypes } from "sequelize";
import Genero from "./genero.model";

const Livro = database.define(
  "livros",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "desconhecido",
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genero,
        key: "id",
      },
    },
    estante: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    prateleira: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    qtd_disponivel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    // Other model options go here
  }
);
Livro.belongsTo(Genero, { foreignKey: "id_genero" });

export default Livro;

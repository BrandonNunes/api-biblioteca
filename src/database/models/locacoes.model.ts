import database from "../index";
import { DataTypes } from "sequelize";
import Aluno from "./aluno.model";
import Livro from "./livro.model";

const Locacao = database.define(
  "locacoes",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "SET NULL",
      references: {
        model: "alunos",
        key: "id",
      },
    },
    id_livro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "livros",
        key: "id",
      },
    },
    data_aluguel: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_devolucao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
Locacao.belongsTo(Aluno, { foreignKey: "id_aluno" });
Locacao.belongsTo(Livro, { foreignKey: "id_livro" });

export default Locacao;

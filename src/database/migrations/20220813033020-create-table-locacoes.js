"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locacoes", {
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
        references: {
          model: "alunos",
          key: "id",
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
      },
      id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "livros",
          key: "id",
          onDelete: "NO ACTION",
          onUpdate: "CASCADE",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locacoes");
  },
};

"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("livros", {
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
        allowNull: false,
        defaultValue: "desconhecido",
      },
      id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "generos",
          key: "id",
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("livros");
  },
};

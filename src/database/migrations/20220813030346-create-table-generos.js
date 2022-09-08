"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("generos", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // titulo: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // autor: {
      //   type: DataTypes.STRING(50),
      //   allowNull: true,
      //   defaultValue: "desconhecido",
      // },
      // genero: {},
      // estante: {},
      // prateleira: {},
      // qtd_disponivel: {},
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
    await queryInterface.dropTable("generos");
  },
};

const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');

const Family = sequelize.define(
  'family',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

module.exports = Family;

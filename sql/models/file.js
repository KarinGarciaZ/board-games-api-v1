const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');

const File = sequelize.define(
  'file',
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
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

module.exports = File;
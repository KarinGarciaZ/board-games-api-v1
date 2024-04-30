const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');

const Brand = sequelize.define(
  'brand',
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
    website: DataTypes.TEXT,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

module.exports = Brand;

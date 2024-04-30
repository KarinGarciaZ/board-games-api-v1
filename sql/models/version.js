const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const Game = require('./game');

const Version = sequelize.define(
  'version',
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

Game.hasMany(Version);
Version.belongsTo(Game);

module.exports = Version;

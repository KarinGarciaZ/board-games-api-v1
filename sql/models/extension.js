const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const Game = require('./game');
const Version = require('./version');

const Extension = sequelize.define(
  'extension',
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
    description: DataTypes.TEXT,
    extra_time: DataTypes.INTEGER,
    extra_players: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    rating_voters: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    extra_rules: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

Game.hasMany(Extension);
Extension.belongsTo(Game);
Version.hasMany(Extension);
Extension.belongsTo(Version);

module.exports = Extension;

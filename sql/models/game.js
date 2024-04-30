const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize-connection');
const Family = require('./family');
const Brand = require('./brand');

const Game = sequelize.define(
  'game',
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
    age_recommended: DataTypes.INTEGER,
    play_time: DataTypes.INTEGER,
    min_players: DataTypes.INTEGER,
    max_players: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    rating_voters: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

Family.hasMany(Game);
Game.belongsTo(Family);
Brand.hasMany(Game);
Game.belongsTo(Brand);

module.exports = Game;

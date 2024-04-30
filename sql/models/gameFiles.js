const { sequelize } = require('../sequelize-connection');
const Game = require('./game');
const File = require('./file');

const GameFiles = sequelize.define('gameFiles', {});

Game.belongsToMany(File, { through: GameFiles });
File.belongsToMany(Game, { through: GameFiles });

module.exports = GameFiles;
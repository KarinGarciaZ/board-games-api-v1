const Brand = require('./brand');
const Family = require('./family');
const Game = require('./game');
const Version = require('./version');
const Extension = require('./extension');
const File = require('./file');
const ExtensionFiles = require('./extensionFiles');
const VersionFiles = require('./versionFiles');
const GameFiles = require('./gameFiles');

Family.hasMany(Game);
Game.belongsTo(Family);
Brand.hasMany(Game);
Game.belongsTo(Brand);

Game.hasMany(Version);
Version.belongsTo(Game);

Game.hasMany(Extension);
Extension.belongsTo(Game);
Version.hasMany(Extension);
Extension.belongsTo(Version);

Extension.belongsToMany(File, { through: ExtensionFiles });
File.belongsToMany(Extension, { through: ExtensionFiles });
Version.belongsToMany(File, { through: VersionFiles });
File.belongsToMany(Version, { through: VersionFiles });
Game.belongsToMany(File, { through: GameFiles });
File.belongsToMany(Game, { through: GameFiles });

module.exports = {
  Brand,
  Family,
  Game,
  Extension,
  Version,
  File,
  ExtensionFiles,
  VersionFiles,
  GameFiles
};
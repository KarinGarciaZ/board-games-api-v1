const { sequelize } = require('../sequelize-connection');
const Version = require('./version');
const File = require('./file');

const VersionFiles = sequelize.define('versionFiles', {});

Version.belongsToMany(File, { through: VersionFiles });
File.belongsToMany(Version, { through: VersionFiles });

module.exports = VersionFiles;
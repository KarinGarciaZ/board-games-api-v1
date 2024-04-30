const { sequelize } = require('../sequelize-connection');
const Extension = require('./extension');
const File = require('./file');

const ExtensionFiles = sequelize.define('extensionFiles', {});

Extension.belongsToMany(File, { through: ExtensionFiles });
File.belongsToMany(Extension, { through: ExtensionFiles });

module.exports = ExtensionFiles;
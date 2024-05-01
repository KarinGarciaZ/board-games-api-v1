const { sequelize } = require('../sql/sequelize-connection');
const Family = require('../sql/models/family');
const Brand = require('../sql/models/brand');
const Game = require('../sql/models/game');
const Extension = require('../sql/models/extension');
const Version = require('../sql/models/version');
const File = require('../sql/models/file');
const ExtensionFiles = require('../sql/models/extensionFiles');
const VersionFiles = require('../sql/models/versionFiles');
const GameFiles = require('../sql/models/gameFiles');
const { brandsMock } = require('./brands.mock');
const { extensionsMock } = require('./extensions.mock');
const { familiesMock } = require('./families.mock');
const { gamesMock } = require('./games.mock');
const { versionsMock } = require('./versions.mock');
const { filesMock } = require('./files.mock');
const { extensionFilesMock } = require('./extensionFiles.mock');
const { versionFilesMock } = require('./versionFiles.mock');
const { gameFilesMock } = require('./gameFiles.mock');

const seedDatabase = async () => {
  const t = await sequelize.transaction();
  try {
      // Insert seed data into the tables
      await Family.bulkCreate(familiesMock, { transaction: t });
      await Brand.bulkCreate(brandsMock, { transaction: t });
      await Game.bulkCreate(gamesMock, {transaction: t});
      await Extension.bulkCreate(extensionsMock, {transaction: t});
      await Version.bulkCreate(versionsMock, {transaction: t});
      await File.bulkCreate(filesMock, {transaction: t});
      await ExtensionFiles.bulkCreate(extensionFilesMock, {transaction: t});
      await VersionFiles.bulkCreate(versionFilesMock, {transaction: t});
      await GameFiles.bulkCreate(gameFilesMock, {transaction: t});

      await t.commit();

      console.log('Seed data inserted successfully!');
  } catch (error) {
      await t.rollback();
      console.error('Error seeding database:', error);
  }
}

// Call the function to seed the database
seedDatabase();
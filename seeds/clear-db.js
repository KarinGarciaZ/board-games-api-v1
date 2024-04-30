const { sequelize } = require('../sql/sequelize-connection');
const Family = require('../sql/models/family');
const Brand = require('../sql/models/brand');
const Game = require('../sql/models/game');
const Version = require('../sql/models/version');
const Extension = require('../sql/models/extension');
const File = require('../sql/models/file');
const GameFiles = require('../sql/models/gameFiles');
const VersionFiles = require('../sql/models/versionFiles');
const ExtensionFiles = require('../sql/models/extensionFiles');

const seedDatabase = async () => {
  const t = await sequelize.transaction();
  try {
    await Family.destroy({ truncate: { cascade: true }, transaction: t });
    await Brand.destroy({ truncate: { cascade: true }, transaction: t });
    await Game.destroy({ truncate: { cascade: true }, transaction: t });
    await Version.destroy({ truncate: { cascade: true }, transaction: t });
    await Extension.destroy({ truncate: { cascade: true }, transaction: t });
    await File.destroy({ truncate: { cascade: true }, transaction: t });
    await GameFiles.destroy({ truncate: true, transaction: t });
    await VersionFiles.destroy({ truncate: true, transaction: t });
    await ExtensionFiles.destroy({ truncate: true, transaction: t });

    await t.commit();
    console.log('Data deleted successfully!');
  } catch (error) {
    await t.rollback();
    console.error('Error deleting tables into database:', error);
  }
}

// Call the function to seed the database
seedDatabase();
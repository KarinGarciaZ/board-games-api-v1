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
  try {
    await Family.sync({ force: true });
    await Brand.sync({ force: true });
    await Game.sync({ force: true });
    await Version.sync({ force: true });
    await Extension.sync({ force: true });
    await File.sync({ force: true });
    await GameFiles.sync({ force: true });
    await VersionFiles.sync({ force: true });
    await ExtensionFiles.sync({ force: true });

    console.log('Data deleted successfully!');
  } catch (error) {
    console.error('Error deleting tables into database:', error);
  }
}

// Call the function to seed the database
seedDatabase();
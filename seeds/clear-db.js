const { connection } = require('../sql/connection-sql');

const seedDatabase = async () => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    await newConnection.query('TRUNCATE TABLE families');
    await newConnection.query('TRUNCATE TABLE brands');
    await newConnection.query('TRUNCATE TABLE games');
    await newConnection.query('TRUNCATE TABLE versions');
    await newConnection.query('TRUNCATE TABLE extensions');
    await newConnection.query('TRUNCATE TABLE files');
    await newConnection.query('TRUNCATE TABLE gameFiles');
    await newConnection.query('TRUNCATE TABLE versionFiles');
    await newConnection.query('TRUNCATE TABLE extensionFiles');
    await newConnection.query('SET FOREIGN_KEY_CHECKS = 1');

    await newConnection.commit();

    console.log('Data deleted successfully!');
  } catch (error) {
      await newConnection.rollback();
      console.error('Error deleting tables into database:', error);
  }
}

// Call the function to seed the database
seedDatabase();

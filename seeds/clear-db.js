const { connection } = require('../sql/connection-sql');

const seedDatabase = async () => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query('TRUNCATE TABLE families');
    await newConnection.query('TRUNCATE TABLE brands');
    await newConnection.query('TRUNCATE TABLE games');
    await newConnection.query('TRUNCATE TABLE versions');
    await newConnection.query('TRUNCATE TABLE extensions');

    await newConnection.commit();

    console.log('Data deleted successfully!');
  } catch (error) {
      await newConnection.rollback();
      console.error('Error deleting tables into database:', error);
  }
  // Close the database connection
  await newConnection.end();
}

// Call the function to seed the database
seedDatabase();
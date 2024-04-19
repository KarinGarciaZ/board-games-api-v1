const { connection } = require('../sql/connection-sql');
const { brandsMock } = require('./brands.mock');
const { familiesMock } = require('./families.mock');
const { gamesMock } = require('./games.mock');

const seedDatabase = async () => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
      // Insert seed data into the families table
      for (const family of familiesMock) {
          await newConnection.query(
            'INSERT INTO families SET ?',
            [family]
          );
      }

      for (const brand of brandsMock) {
        await newConnection.query(
          'INSERT INTO brands SET ?', [brand]
        );
      }

      for (const game of gamesMock) {
        await newConnection.query(
          'INSERT INTO games SET ?', [game]
        );
      }
      await newConnection.commit();

      console.log('Seed data inserted successfully!');
  } catch (error) {
      await newConnection.rollback();
      console.error('Error seeding database:', error);
  }
  // Close the database connection
  await newConnection.end();
}

// Call the function to seed the database
seedDatabase();
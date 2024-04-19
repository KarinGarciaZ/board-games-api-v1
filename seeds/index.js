const { connection } = require('../sql/connection-sql');
const { brandsMock } = require('./brands.mock');
const { familiesMock } = require('./families.mock');
const { gamesMock } = require('./games.mock');

const seedDatabase = async () => {
  try {

      // Insert seed data into the families table
      for (const family of familiesMock) {
          await connection.query(
            'INSERT INTO families (name, deleted) values (?, ?)',
            [family.name, family.deleted]
          );
      }

      // Close the database connection
      await connection.end();

      console.log('Seed data inserted successfully!');
  } catch (error) {
      console.error('Error seeding database:', error);
  }
}

// Call the function to seed the database
seedDatabase();
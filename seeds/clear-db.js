const { sequelize } = require('../sql/sequelize-connection');
const Family = require('../sql/models/family');

const seedDatabase = async () => {
  const t = await sequelize.transaction();
  try {
    await Family.destroy({ truncate: { cascade: true }, transaction: t });
    // await newConnection.query('TRUNCATE TABLE brands');
    // await newConnection.query('TRUNCATE TABLE games');
    // await newConnection.query('TRUNCATE TABLE versions');
    // await newConnection.query('TRUNCATE TABLE extensions');

    await t.commit();

    console.log('Data deleted successfully!');
  } catch (error) {
    await t.rollback();
    console.error('Error deleting tables into database:', error);
  }
}

// Call the function to seed the database
seedDatabase();
const { Sequelize } = require('sequelize');
const env = require('dotenv');
env.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    sequelize.close()
  }
})();

(async () => {
  try {
    await new Promise(resolve => {
      setTimeout(async () => {
        await sequelize.sync(/*{force: true}*/);
        resolve('');
      }, 1000);
    });
  } catch (error) {
    sequelize.close()
  }
})();

sequelize.sync();

module.exports = { sequelize };
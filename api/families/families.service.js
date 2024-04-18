const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const resp = await connection.query(`SELECT * FROM families`);
    return resp;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFamilies
}
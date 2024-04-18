const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const resp = await connection.query(`SELECT * FROM families`);
    return resp;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (id) => {
  try {
    const [ row ]= await connection.query(`SELECT * FROM families WHERE id = ?`, [id]);
    return row;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFamilies,
  getFamily
}
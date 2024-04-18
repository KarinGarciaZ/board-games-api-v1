const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const [row] = await connection.query(`SELECT * FROM families`);
    return row;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (id) => {
  try {
    const [row] = await connection.query(`SELECT * FROM families WHERE id = ?`, [id]);
    return row;
  } catch (error) {
    throw error;
  }
};

const addFamily = async (body) => {
  try {
    const [row] = await connection.query(`INSERT INTO families SET ?`, [body]);
    console.log(row)
    return row;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getFamilies,
  getFamily,
  addFamily
}
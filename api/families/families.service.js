const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families`);
    return rows;
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
    return row;
  } catch (error) {
    throw error;
  }
}

const updateFamily = async (id, body) => {
  try {
    await connection.query(`UPDATE families SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily
}
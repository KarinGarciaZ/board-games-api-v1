const { connection } = require('../../sql/connection-sql');

const getFamilies = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families WHERE deleted = false`);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families WHERE id = ? AND deleted = false`, [id]);
    if (rows.length) {
      return rows[0];
    }
    return {};
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

const updateFamily = async (id, body) => {
  try {
    await connection.query(`UPDATE families SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteFamily = async (id) => {
  try {
    await connection.query(`UPDATE families SET deleted = true WHERE id = ?`, [id]);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily,
  deleteFamily
}
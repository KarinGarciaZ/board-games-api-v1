const { connection } = require('../../sql/connection-sql');

const getExtensionsByGameId = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getExtension = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM extensions WHERE id = ? AND deleted = false`, [id]);
    if(rows.length) {
      return rows[0];
    }
    return {};
  } catch (error) {
    throw error;
  }
};

const addExtension = async (body) => {
  try {
    await connection.query(`INSERT INTO extensions SET ?`, [body]);
    return;
  } catch (error) {
    throw error
  }
};

const updateExtension = async (id, body) => {
  try {
    await connection.query(`UPDATE extensions SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error){
    throw error
  }
};

const deleteExtension = async (id) => {
  try {
    await connection.query(`UPDATE extensions SET deleted = true WHERE id = ?`, [id]);
    return;
  } catch (error) {
    throw (error)
  }
}

module.exports = {
  getExtensionsByGameId,
  getExtension,
  addExtension,
  updateExtension,
  deleteExtension,
}
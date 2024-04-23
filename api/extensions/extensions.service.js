const { connection } = require('../../sql/connection-sql');

const getExtensionsByGameId = async (id) => {
  try {
    const [rows] = await connection.query(`SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getExtensionsByGameId
}
const { connection } = require('../../sql/connection-sql');

const getGames = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM games WHERE deleted = false`);
    return rows;
  } catch (error) {
    throw error;
  }
}

const getGame = async (id) => {
  try {
    const [rows] = await connection.query(
      `SELECT * FROM games WHERE id = ? AND deleted = false`, [id]
    );
    if (rows.length) {
      return rows[0];
    }
    return {};
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGames,
  getGame
};

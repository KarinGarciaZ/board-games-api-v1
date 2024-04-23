const { connection } = require('../../sql/connection-sql');

const getVersionsByGameId = async (gameId) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM versions where game_id = ? AND deleted = false', [gameId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVersionsByGameId
};

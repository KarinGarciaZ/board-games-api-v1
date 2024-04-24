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

const createVersion = async (version) => {
  try {
    await connection.query('INSERT INTO versions SET ?', [version]);
    return;
  } catch (error) {
    throw error;
  }
};

const updateVersion = async (id , version) => {
  try {
    await connection.query('UPDATE versions SET ? WHERE id = ?', [version, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteVersion = async (id) => {
  try {
    await connection.query('UPDATE versions SET deleted = true WHERE id = ?', [id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteVersionByGameId = async (gameId, conn) => {
  try {
    await conn.query(`UPDATE versions SET deleted = true WHERE game_id = ?`, [gameId]);
    return;
  } catch (error){
    throw error;
  }
};


module.exports = {
  getVersionsByGameId,
  createVersion,
  updateVersion,
  deleteVersion,
  deleteVersionByGameId
};

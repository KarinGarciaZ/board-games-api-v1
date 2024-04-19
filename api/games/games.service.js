const { connection } = require('../../sql/connection-sql');

const getGames = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM games WHERE deleted = false`);
    return rows;
  } catch (error) {
    throw error;
  }
};

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
};

const addGame = async (body) => {
  try {
    await connection.query(`INSERT INTO games SET ?`, [body]);
    return;
  } catch (error) {
    throw error;
  }
};

const updateGame = async (id, body) => {
  try {
    await connection.query(`UPDATE games SET ? WHERE id = ?`, [body, id]);
    return;
  } catch (error) {
    throw error;
  }
};

const deleteGame = async (id) => {
  try {
    await connection.query(`UPDATE games SET deleted = true WHERE id = ?`, [id]);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGames,
  getGame,
  addGame,
  updateGame,
  deleteGame
};

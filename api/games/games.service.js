const { connection } = require('../../sql/connection-sql');

const getGames = async () => {
  try {
    const [gamesRows] = await connection.query(`SELECT * FROM games WHERE deleted = false`);
    const games = gamesRows.map(async game => {
      const [brands] = await connection.query(`SELECT * FROM brands WHERE id = ?`, [game.brand_id]);
      return {
        ...game,
        brand: {...brands[0]}
      }
    });
    const gamesToReturn = await Promise.all(games);
    return gamesToReturn;
  } catch (error) {
    throw error;
  }
};

const getGame = async (id) => {
  try {
    const [gamesRows] = await connection.query(
      `SELECT * FROM games WHERE id = ? AND deleted = false`, [id]
    );
    const [familiesRows] = await connection.query(
      `SELECT * FROM families WHERE id = ?`, [gamesRows[0].family_id]
    );
    const [brandsRows] = await connection.query(
      `SELECT * FROM brands WHERE id = ?`, [gamesRows[0].brand_id]
    );
    const [versionsRows] = await connection.query(
      `SELECT * FROM versions WHERE game_id = ? AND deleted = false`, [id]
    );
    const [extensionsRows] = await connection.query(
      `SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]
    );
    //files
    if (gamesRows.length) {
      return {
        ...gamesRows[0],
        family: {...familiesRows[0]},
        brand: {...brandsRows[0]},
        versions: versionsRows,
        extensions: extensionsRows
      };
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
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query(`UPDATE games SET deleted = true WHERE id = ?`, [id]);
    await newConnection.query(`UPDATE versions SET deleted = true WHERE game_id = ?`, [id]);
    await newConnection.query(`UPDATE extensions SET deleted = true WHERE game_id = ?`, [id]);
    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
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

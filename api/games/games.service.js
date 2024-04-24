const { connection } = require('../../sql/connection-sql');
const { deleteExtensionByGameId } = require('../extensions/extensions.utils');
const { deleteVersionByGameId } = require('../versions/versions.utils');
const { getBrandById } = require('../brands/brands.utils');
const { getFamilybyId } = require('../families/families.utils');

const getGames = async () => {
  try {
    const [gamesRows] = await connection.query(`SELECT * FROM games WHERE deleted = false`);
    const games = gamesRows.map(async game => {
      const brand = await getBrandById(game.brand_id);
      return {
        ...game,
        brand
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
    if (gamesRows.length) {
      const family = await getFamilybyId(gamesRows[0].family_id);
      const brand = await getBrandById(gamesRows[0].brand_id);
      const [versionsRows] = await connection.query(
        `SELECT * FROM versions WHERE game_id = ? AND deleted = false`, [id]
      );
      const [extensionsRows] = await connection.query(
        `SELECT * FROM extensions WHERE game_id = ? AND deleted = false`, [id]
      );
      //files

      return {
        ...gamesRows[0],
        family,
        brand,
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
    await deleteVersionByGameId(id, newConnection);
    await deleteExtensionByGameId(id, newConnection);
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
  deleteGame,
};

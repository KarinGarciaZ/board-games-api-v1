const { connection } = require('../../sql/connection-sql');
const { getGamesByFamilyId } = require('../games/games.utils');
const { deleteExtensionByGameId } = require('../extensions/extensions.utils');
const { deleteVersionByGameId } = require('../versions/versions.utils');
const { getFamilybyId } = require('../families/families.utils');

const getFamilies = async () => {
  try {
    const [rows] = await connection.query(`SELECT * FROM families WHERE deleted = false`);
    const newFamilies = rows.map(async (row) => {
        const familyId = row.id;
        const games = await getGamesByFamilyId(familyId);
        return {
          ...row,
          games
        }
    });
    const families = await Promise.all(newFamilies);
    return families;
  } catch (error) {
    throw error;
  }
};

const getFamily = async (familyId) => {
  try {
    const family = await getFamilybyId(familyId);
    const games = await getGamesByFamilyId(familyId);
    if (family) {
      return {
        ...family,
        games
      };
    }
    return {};
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

const deleteFamily = async (id) => {
  const newConnection = await connection.getConnection();
  try {
    await newConnection.beginTransaction();
    await newConnection.query(`UPDATE families SET deleted = true WHERE id = ?`, [id]);
    const games = await getGamesByFamilyId(id);
    for (const game of games) {
      await deleteVersionByGameId(game.id, newConnection);
      await deleteExtensionByGameId(game.id, newConnection);
    };
    await newConnection.query(`UPDATE games SET deleted = true WHERE family_id = ?`, [id]);
    await newConnection.commit();
    return;
  } catch (error) {
    await newConnection.rollback();
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
const { connection } = require('../../sql/connection-sql');
const { getGamesByFamilyId } = require('../games/games.utils');

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
    const [rows] = await connection.query(`SELECT * FROM families WHERE id = ? AND deleted = false`, [familyId]);
    const games = await getGamesByFamilyId(familyId);
    if (rows.length) {
      return {
        ...rows[0],
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
      await newConnection.query(`UPDATE versions SET deleted = true WHERE game_id = ?`, [game.id]);
      await newConnection.query(`UPDATE extensions SET deleted = true WHERE game_id = ?`, [game.id]);
    };
    await newConnection.query(`UPDATE games SET deleted = true WHERE family_id = ?`, [id]);
    await newConnection.commit();
  } catch (error) {
    await newConnection.rollback();
    throw error;
  }
  return;
};

module.exports = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily,
  deleteFamily
}